import * as mongoose from 'mongoose';

const bus_information = new mongoose.Schema({
    prefixo: String,
    acessibilidade: Boolean,
    ar_condicionado: Boolean,
    usb: Boolean,
    validador: Boolean,
    wifi: Boolean 

});


export default mongoose.model("onibus_veiculos", bus_information);