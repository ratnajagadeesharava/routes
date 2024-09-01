import React, { useRef, useState } from 'react';
import { useStore } from 'react-redux';
import { bulkUploadRoutes } from '../../../store/slices/RouteSlice';

const Modal = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) => {
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<any>(null);
  const [fileContent, setFileContent] = useState<any>(null);
  const store = useStore();
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  function validateRouteJson (json:any):boolean{
    if(json.length >0){
      json.forEach((element:any) => {
        
          if(element?.stops?.length >=2){
            return true;
          }else{
            return false;
          }
      });
    }
    return false;
  }
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          if (event != null && event.target != null && typeof event.target.result === 'string') {
            const json = JSON.parse(event.target.result);
            if(validateRouteJson(json)){
              throw 'JSON file is valid';
            }
            setFileContent(json);
            store.dispatch(bulkUploadRoutes(json));
            console.log("file Content",fileContent);
          }
        } catch (e) {
          alert('Error parsing JSON file');
          setFileName('');
        }
      };
      reader.readAsText(file);
      console.log(file);
    } else {
      alert('Please select a JSON file.');
      setFileName('');
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current != null)
      fileInputRef.current.click();
  };

  return (
    <React.Fragment>


      {isOpen && (
        <div className="flex items-center justify-center h-screen modal-overlay">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-slate-800 p-6 rounded-lg shadow-xl w-96 z-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">upload Routes File</h2>

              </div>
              {/* upload file */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
              />
              <button
                onClick={triggerFileInput}
                className="flex items-center justify-center w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload JSON
              </button>
              {fileName && <p className="mt-2 text-sm text-gray-600">Selected file: {fileName}</p>}
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>

  );
};

export default Modal;