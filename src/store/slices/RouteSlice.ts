import { createSlice } from "@reduxjs/toolkit";
import { sampleRoutes } from "../../Data/sampleRoutes";
import Route from "../../components/common/models/Route";
export interface RouteState{
    routes: Route[]
}
const getInitialState = (): RouteState => {
    const storedRoutes = localStorage.getItem('routes');
    if (storedRoutes) {
        return { routes: JSON.parse(storedRoutes) };
    }
    return { routes: sampleRoutes };
};
const initialState: RouteState =getInitialState();
const routeSlice = createSlice(
    {
        name: "routes",
        initialState,
        reducers: {
            addToRoutes: function (state, action) {
                let id  = state.routes[state.routes.length - 1].RouteId + 1;
                state.routes.push({...action.payload,RouteId:id});
                localStorage.setItem('routes', JSON.stringify(state.routes));
            },
            getRoute:function(state,action){
                state.routes = state.routes.map(route => {
                    if (route.RouteId === action.payload.RouteId) {
                        return action.payload
                    }
                    return route;
                })
            },
            bulkUploadRoutes: function (state, action) {
                let id = 0;
                 state.routes.forEach(element => {
                    id = Math.max(id, element.RouteId);
                });
                id++;
                action.payload.forEach((route:Route)=>{
                    route.RouteId = id;
                    id++;
                })
                state.routes = state.routes.concat(action.payload);
                localStorage.setItem('routes', JSON.stringify(state.routes));
            },
            removeFromRoutes: function (state, action) {
                state.routes = state.routes.filter(route => route.RouteId !== action.payload.RouteId)
                localStorage.setItem('routes', JSON.stringify(state.routes));

            },
            updateRoute: function (state, action) {
                state.routes = state.routes.map(route => {
                    if (route.RouteId === action.payload.RouteId) {
                        return action.payload
                    }
                    return route
                })
                localStorage.setItem('routes', JSON.stringify(state.routes));
            },
            clearRoutes: function (state, action) {
                state.routes.length = 0;
                localStorage.removeItem('routes');
            }
        }
    }
);
const {addToRoutes, removeFromRoutes, updateRoute, clearRoutes,bulkUploadRoutes} = routeSlice.actions;
export {addToRoutes, removeFromRoutes, updateRoute, clearRoutes,bulkUploadRoutes}
export default routeSlice.reducer;