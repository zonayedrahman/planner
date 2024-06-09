'use server';

import User from "@/lib/database/models/user.model";


import { CreateUserParams } from "@/types";
import { connectToDatabase } from "..";

export async function createUser(user: CreateUserParams) {
    try {
        await connectToDatabase();

        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        return error;
    }
}