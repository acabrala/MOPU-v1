import * as mongoose from "mongoose";
import { App } from "../App";


export  class Database {

    private MONGODB_URI: string = "mongodb://localhost:27017/mobilidade?replicaSet=rs0";

    constructor(){
        this.connectMongo();
    }

    async connectMongo() {

        await mongoose.connect(this.MONGODB_URI, {
            useCreateIndex: true,
            useNewUrlParser: true
        });

        console.log("MongoDB connected.");
    }

}