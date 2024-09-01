export  interface Stop{
    stopId:number;
    stopName:string;
    latitude:string;
    longitude:string;
}
export default interface Route{
    name:string;
    direction:"UP"|"DOWN";
    RouteId:number;
    status:"Active"|"Inactive";
    stops:Array<Stop>;
}

