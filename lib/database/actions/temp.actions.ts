'use server';

import { connectToDatabase } from "..";
import TempModel from "../models/temp.models";


type CreateTempParams = {
    name: string;
}

export async function createTemp(temp: CreateTempParams) {
    try {
        await connectToDatabase();

        console.log("Creating temp==============================================");

        const newTemp = await TempModel.create(temp);
        return JSON.parse(JSON.stringify(newTemp));
    } catch (error) {
        return error;
    }
}