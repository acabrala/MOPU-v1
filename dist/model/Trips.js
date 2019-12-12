"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const trips = new mongoose.Schema({
    route_id: String,
    service_id: String,
    trip_id: String,
    trip_headsign: String,
    direction_id: Number,
    shape_id: Number
});
exports.default = mongoose.model("trips", trips);
