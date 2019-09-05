import * as mongoose from 'mongoose';

const LinhasSchema = new mongoose.Schema({
    nome: String,
    status_disponivel: Boolean
})

export default mongoose.model("linhas", LinhasSchema);;