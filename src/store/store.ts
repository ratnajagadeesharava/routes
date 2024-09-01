// 

import { configureStore } from "@reduxjs/toolkit";
import routeReducer from "./slices/RouteSlice";
const routeStore = configureStore(
    {
        reducer:{
            routes:routeReducer
        }
    }
)

export type RootState = ReturnType<typeof routeStore.getState>

export  default routeStore;