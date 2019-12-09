import axios from 'axios';
const key = require('../config/google-key');
import { url_default, url_metro_onibus, url_onibus, url_trem, url_trem_metro, url_trem_onibus, url_metro } from '../config/url-base';
import { config } from 'bluebird';
import * as unidecode from 'unidecode';
import * as utf8 from 'utf8'


export class CalculateRouterRepository {

    tracingRouter = async (geolocate) => {
    
        let url = url_default(geolocate.origem, geolocate.destino, key.key)
        if (geolocate.caminhada == 'true'){
            url +`&transit_routing_preference=less_walking`;
        }
        let vtnc = utf8.encode(url)
        let url_final;

        if (geolocate.data_chegada == 'null') {
            let departure_time = Date.parse(geolocate.data_partida) / 1000
            let teste1 = `&departure_time=${departure_time}`
            url_final = vtnc.concat(teste1)

        } else {

            const arrival_time = Date.parse(geolocate.data_chegada) / 1000
            let teste2 = `&arrival_time=${arrival_time}`
            url_final = vtnc.concat(teste2)

        }

        return await axios.get(url_final)

    }

    tracingRouterTrain = async (geolocate) => {

        let url_train = url_trem(geolocate.origem, geolocate.destino, key.key)
        if (geolocate.caminhada == 'true'){
            url_train +`&transit_routing_preference=less_walking`;
        }
        let url_final;
        let url_parameters = utf8.encode(url_train)

        if (geolocate.data_chegada == 'null') {
            const departure_time = Date.parse(geolocate.data_partida) / 1000
            let url_departure_time = `&departure_time=${departure_time}`
            url_final = url_parameters.concat(url_departure_time)
        } else {
            const arrival_time = Date.parse(geolocate.data_chegada) / 1000
            let url_arrival_time = `&arrival_time=${arrival_time}`
            url_final = url_parameters.concat(url_arrival_time)
            // url = `https://maps.googleapis.com/maps/api/directions/json?origin=${geolocate.origem}&destination=${geolocate.destino}&mode=transit&alternatives=true&arrival_time=${arrival_time}&transit_mode=train|bus&language=pt-BR&key=${key.key}`
        }

        return await axios.get(url_final)

    }

    tracingRouterSubway = async (geolocate) => {

        let url_subway = url_metro(geolocate.origem, geolocate.destino, key.key)
        if (geolocate.caminhada == 'true'){
            url_subway +`&transit_routing_preference=less_walking`;
        }
        let url_final;
        let url_parameters = utf8.encode(url_subway)

        if (geolocate.data_chegada == 'null') {
            const departure_time = Date.parse(geolocate.data_partida) / 1000
            let url_departure_time = `&departure_time=${departure_time}`
            url_final = url_parameters.concat(url_departure_time)

        } else {
            const arrival_time = Date.parse(geolocate.data_chegada) / 1000
            let url_arrival_time = `&arrival_time=${arrival_time}`
            url_final = url_parameters.concat(url_arrival_time)
        }

        return await axios.get(url_final)

    }

    tracingRouterBus = async (geolocate) => {

        let url_bus = url_onibus(geolocate.origem, geolocate.destino, key.key)
        if (geolocate.caminhada == 'true'){
            url_bus +`&transit_routing_preference=less_walking`;
        }
        let url_final;
        let url_parameters = utf8.encode(url_bus)

        if (geolocate.data_chegada == 'null') {
            const departure_time = Date.parse(geolocate.data_partida) / 1000
            let url_departure_time = `&departure_time=${departure_time}`
            url_final = url_parameters.concat(url_departure_time)

        } else {
            const arrival_time = Date.parse(geolocate.data_chegada) / 1000
            let url_arrival_time = `&arrival_time=${arrival_time}`
            url_final = url_parameters.concat(url_arrival_time)
        }

        return await axios.get(url_final)
    }

    trancingRouterBusAndSubway = async (geolocate) => {

        let url_bus_subway = url_metro_onibus(geolocate.origem, geolocate.destino, key.key)
        if (geolocate.caminhada == 'true'){
            url_bus_subway +`&transit_routing_preference=less_walking`;
        }
        let url_final;
        let url_parameters = utf8.encode(url_bus_subway)

        if (geolocate.data_chegada == 'null') {
            const departure_time = Date.parse(geolocate.data_partida) / 1000
            let url_departure_time = `&departure_time=${departure_time}`
            url_final = url_parameters.concat(url_departure_time)

        } else {
            const arrival_time = Date.parse(geolocate.data_chegada) / 1000
            let url_arrival_time = `&arrival_time=${arrival_time}`
            url_final = url_parameters.concat(url_arrival_time)
        }

        return await axios.get(url_final)
    }

    trancingRouterBusAndTrain = async (geolocate) => {

        let url_bus_train = url_trem_onibus(geolocate.origem, geolocate.destino, key.key)
        if (geolocate.caminhada == 'true'){
            url_bus_train +`&transit_routing_preference=less_walking`;
        }
        let url_final;
        let url_parameters = utf8.encode(url_bus_train)

        if (geolocate.data_chegada == 'null') {
            const departure_time = Date.parse(geolocate.data_partida) / 1000
            let url_departure_time = `&departure_time=${departure_time}`
            url_final = url_parameters.concat(url_departure_time)

        } else {
            const arrival_time = Date.parse(geolocate.data_chegada) / 1000
            let url_arrival_time = `&arrival_time=${arrival_time}`
            url_final = url_parameters.concat(url_arrival_time)
        }

        return await axios.get(url_final)
    }

}