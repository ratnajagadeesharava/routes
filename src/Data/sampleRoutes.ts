import Route from "../components/common/models/Route";

export const sampleRoutes: Route[] = [
    {
        name: "Amp To Hyderabad",
        direction: "UP",
        RouteId: 1,
        status: "Active",
        stops: [

            {
                stopId: 1,
                stopName: "Amalapuram",
                latitude:" 16.5775",
                longitude:" 82.1031"
            },
            {
                stopId: 3,
                stopName: "Eluru",
                latitude:" 16.678059984033368",
                longitude:" 81.02370874262965"
            },
            {
                stopId: 2,
                stopName: "Vijaywada",
                latitude:" 16.508586",
                longitude:" 80.614596"
            },

            {
                stopId: 4,
                stopName: "Kodhada",
                latitude:" 16.960780661479365",
                longitude:" 80.0153526399152"
            },
            // 17.143811681082013, 79.61554468254006
            {
                stopId: 5,
                stopName: "Suryapeta",
                latitude:" 17.143811681082013",
                longitude:" 79.61554468254006"
            },
            {
                stopId: 6,
                stopName: "Hyderabad",
                latitude:" 17.399153",
                longitude:" 78.476399"
            }
        ]
    },
    {
        name: "Amp To Hyderabad Via Guntur",
        direction: "UP",
        RouteId: 2,
        status: "Active",
        stops: [

            {
                stopId: 1,
                stopName: "Amalapuram",
                latitude:" 16.5775",
                longitude:" 82.1031"
            },
            //16.30259541502376, 80.44203511674587
            {
                stopId: 2,
                stopName: "Guntur",
                latitude:"16.30259541502376",
                longitude:" 80.44203511674587"
            },
            {
                stopId: 6,
                stopName: "Hyderabad",
                latitude:"17.399153",
                longitude:" 78.476399"
            }
        ]
    },

]