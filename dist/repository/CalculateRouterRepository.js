"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const key = require('../config/google-key');
const url_base_1 = require("../config/url-base");
const utf8 = require("utf8");
class CalculateRouterRepository {
    constructor() {
        this.tracingRouter = (geolocate) => __awaiter(this, void 0, void 0, function* () {
            let url = url_base_1.url_default(geolocate.origem, geolocate.destino, key.key);
            if (geolocate.caminhada == 'true') {
                url + `&transit_routing_preference=less_walking`;
            }
            let vtnc = utf8.encode(url);
            let url_final;
            if (geolocate.data_chegada == 'null') {
                let departure_time = Date.parse(geolocate.data_partida) / 1000;
                let teste1 = `&departure_time=${departure_time}`;
                url_final = vtnc.concat(teste1);
            }
            else {
                const arrival_time = Date.parse(geolocate.data_chegada) / 1000;
                let teste2 = `&arrival_time=${arrival_time}`;
                url_final = vtnc.concat(teste2);
            }
            return yield axios_1.default.get(url_final);
        });
        this.tracingRouterTrain = (geolocate) => __awaiter(this, void 0, void 0, function* () {
            let url_train = url_base_1.url_trem(geolocate.origem, geolocate.destino, key.key);
            if (geolocate.caminhada == 'true') {
                url_train + `&transit_routing_preference=less_walking`;
            }
            let url_final;
            let url_parameters = utf8.encode(url_train);
            if (geolocate.data_chegada == 'null') {
                const departure_time = Date.parse(geolocate.data_partida) / 1000;
                let url_departure_time = `&departure_time=${departure_time}`;
                url_final = url_parameters.concat(url_departure_time);
            }
            else {
                const arrival_time = Date.parse(geolocate.data_chegada) / 1000;
                let url_arrival_time = `&arrival_time=${arrival_time}`;
                url_final = url_parameters.concat(url_arrival_time);
                // url = `https://maps.googleapis.com/maps/api/directions/json?origin=${geolocate.origem}&destination=${geolocate.destino}&mode=transit&alternatives=true&arrival_time=${arrival_time}&transit_mode=train|bus&language=pt-BR&key=${key.key}`
            }
            return yield axios_1.default.get(url_final);
        });
        this.tracingRouterSubway = (geolocate) => __awaiter(this, void 0, void 0, function* () {
            let url_subway = url_base_1.url_metro(geolocate.origem, geolocate.destino, key.key);
            if (geolocate.caminhada == 'true') {
                url_subway + `&transit_routing_preference=less_walking`;
            }
            let url_final;
            let url_parameters = utf8.encode(url_subway);
            if (geolocate.data_chegada == 'null') {
                const departure_time = Date.parse(geolocate.data_partida) / 1000;
                let url_departure_time = `&departure_time=${departure_time}`;
                url_final = url_parameters.concat(url_departure_time);
            }
            else {
                const arrival_time = Date.parse(geolocate.data_chegada) / 1000;
                let url_arrival_time = `&arrival_time=${arrival_time}`;
                url_final = url_parameters.concat(url_arrival_time);
            }
            return yield axios_1.default.get(url_final);
        });
        this.tracingRouterBus = (geolocate) => __awaiter(this, void 0, void 0, function* () {
            let url_bus = url_base_1.url_onibus(geolocate.origem, geolocate.destino, key.key);
            if (geolocate.caminhada == 'true') {
                url_bus + `&transit_routing_preference=less_walking`;
            }
            let url_final;
            let url_parameters = utf8.encode(url_bus);
            if (geolocate.data_chegada == 'null') {
                const departure_time = Date.parse(geolocate.data_partida) / 1000;
                let url_departure_time = `&departure_time=${departure_time}`;
                url_final = url_parameters.concat(url_departure_time);
            }
            else {
                const arrival_time = Date.parse(geolocate.data_chegada) / 1000;
                let url_arrival_time = `&arrival_time=${arrival_time}`;
                url_final = url_parameters.concat(url_arrival_time);
            }
            return yield axios_1.default.get(url_final);
        });
        this.trancingRouterBusAndSubway = (geolocate) => __awaiter(this, void 0, void 0, function* () {
            let url_bus_subway = url_base_1.url_metro_onibus(geolocate.origem, geolocate.destino, key.key);
            if (geolocate.caminhada == 'true') {
                url_bus_subway + `&transit_routing_preference=less_walking`;
            }
            let url_final;
            let url_parameters = utf8.encode(url_bus_subway);
            if (geolocate.data_chegada == 'null') {
                const departure_time = Date.parse(geolocate.data_partida) / 1000;
                let url_departure_time = `&departure_time=${departure_time}`;
                url_final = url_parameters.concat(url_departure_time);
            }
            else {
                const arrival_time = Date.parse(geolocate.data_chegada) / 1000;
                let url_arrival_time = `&arrival_time=${arrival_time}`;
                url_final = url_parameters.concat(url_arrival_time);
            }
            return yield axios_1.default.get(url_final);
        });
        this.trancingRouterBusAndTrain = (geolocate) => __awaiter(this, void 0, void 0, function* () {
            let url_bus_train = url_base_1.url_trem_onibus(geolocate.origem, geolocate.destino, key.key);
            if (geolocate.caminhada == 'true') {
                url_bus_train + `&transit_routing_preference=less_walking`;
            }
            let url_final;
            let url_parameters = utf8.encode(url_bus_train);
            if (geolocate.data_chegada == 'null') {
                const departure_time = Date.parse(geolocate.data_partida) / 1000;
                let url_departure_time = `&departure_time=${departure_time}`;
                url_final = url_parameters.concat(url_departure_time);
            }
            else {
                const arrival_time = Date.parse(geolocate.data_chegada) / 1000;
                let url_arrival_time = `&arrival_time=${arrival_time}`;
                url_final = url_parameters.concat(url_arrival_time);
            }
            return yield axios_1.default.get(url_final);
        });
    }
}
exports.CalculateRouterRepository = CalculateRouterRepository;
