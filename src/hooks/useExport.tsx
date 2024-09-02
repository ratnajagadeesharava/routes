import { useCallback } from "react";
import Route from "../components/common/models/Route";

const useExport = (routes:Route[])=>{

    return useCallback(()=>{
        const blob = new Blob([JSON.stringify(routes)], { type: 'text/plain;charset=utf-8' });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = "routes.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

    },[routes])

}

export default useExport;