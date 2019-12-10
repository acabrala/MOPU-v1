import * as mongoose from 'mongoose';


const InteractionSchema = new mongoose.Schema({
    id_usuario: {
        type: String,
        required: true
    },
    id_incidente: {
        type: String,
        required: true
    },
    data_interação: {
        type: String,
        required: true 
    },
    is_true: {
        type: Boolean,
        required: true
    },
    is_false: {
        type: Boolean,
        required: true
    }
})

const Interaction = mongoose.model("logs_interacao", InteractionSchema);

export default Interaction;