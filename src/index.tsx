import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateRoute from './pages/CreateRoute';
import MapView from './pages/MapView';
import RouteMapView from './pages/RouteMapView';
import GoogleAutoComplete from './components/common/ui/GoogleAutoComplete';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RouteMapView />
      }, {
        path: "create",
        element: <CreateRoute />
      },
      {
        path: "edit/:id",
        element: <CreateRoute />
      }
    ]
  },

])
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
