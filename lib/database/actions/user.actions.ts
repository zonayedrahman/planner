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

export async function getUserById(userId: string) {
    try {
        await connectToDatabase();

        const user = await User.findById(userId);
        return JSON.parse(JSON.stringify(user));
    }
    catch (error) {
        return error;
    }
}

export async function getUserByClerkId(clerkId: string) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ clerkId: clerkId });
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        return error;
    }
}

export async function getUserBySearchQuery(searchQuery: string) {
    try {
        await connectToDatabase();

        const users = await User.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { username: { $regex: searchQuery, $options: 'i' } },
                { email: { $regex: searchQuery, $options: 'i' } }
            ]
        });

        return JSON.parse(JSON.stringify(users));
    }
    catch (error) {
        return error;
    }
}