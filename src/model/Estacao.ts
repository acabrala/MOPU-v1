import * as mongoose from 'mongoose';

const estacoes = new mongoose.Schema({
    nome: String,
    linha: String,
    status: Boolean,
    localizacao: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }

});

estacoes.index({ localizacao: '2dshere' });

export default mongoose.model("estacoes", estacoes);