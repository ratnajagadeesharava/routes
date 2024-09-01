import './App.css';
import Header from './components/Layout/Header';
import { Outlet } from 'react-router-dom';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Provider } from 'react-redux';
import routeStore from './store/store';
function App() {
  
  return (
    <Provider store={routeStore}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
        <div className="App bg-slate-800 h-screen m-0">
          {/* <Header /> */}
          <Outlet />
        </div>
      </APIProvider>
    </Provider>
  );
}
export default App;
