'use server';

import { Schema, model, models } from "mongoose";


const tempSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const TempModel = models.TempModel || model('TempModel', tempSchema);

export default TempModel;