import * as mongoose from 'mongoose';

const trips = new mongoose.Schema({
    route_id: String,
    service_id: String,
    trip_id: String,
    trip_headsign: String,
    direction_id: Number,
    shape_id: Number 

});


export default mongoose.model("trips", trips);