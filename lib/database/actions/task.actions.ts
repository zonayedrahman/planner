"use server";


import { CreateTaskParams } from "@/types";

import { connectToDatabase } from "..";
import User from "../models/user.model";
import Task from "../models/task.model";
import TempModel from "../models/temp.model";
import { de } from "date-fns/locale";
import { revalidatePath } from "next/cache";



export async function createTask(task: CreateTaskParams) {
    try {
        await connectToDatabase();

        // console.log('TASK: ', task);

        const creator = await User.findOne({ clerkId: task.creator })
        // console.log('CREATOR: ', creator);


        const newTask = await Task.create({
            ...task,
            description: task.description || 'New Task',
            creator: creator?._id
        });

        console.log('NEW TASK: ', newTask);
        return JSON.parse(JSON.stringify(newTask));

    } catch (error) {
        return error;
    }
}


export async function fetchTasks(user_id: string) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ clerkId: user_id });

        // const tasks = await Task.find({ creator: user?._id });
        // user is either the task creator or assignee
        const tasks = await Task.find({ $or: [{ creator: user?._id }, { assignees: user?._id }] });

        return JSON.parse(JSON.stringify(tasks));

    } catch (error) {
        return error;
    }
}

export async function fetchTasksById(user_id: string) {
    try {
        await connectToDatabase();

        // console.log('USER ID: ', user_id)
        const user = await User.findOne({ _id: user_id });

        // console.log('USER: ', user);

        const tasks = await Task.find({ $or: [{ creator: user?._id }, { assignees: user?._id }] });

        return JSON.parse(JSON.stringify(tasks));

    }

    catch (error) {
        return error;
    }
}



export async function fetchTask(task_id: string) {
    try {
        await connectToDatabase();

        const task = await Task.findOne({ _id: task_id });

        return JSON.parse(JSON.stringify(task));

    }
    catch (error) {
        return error;
    }
}


export async function updateTaskStatus(task_id: string) {
    try {
        await connectToDatabase();

        const task = await Task.findOne({ _id: task_id });

        task.status = !task.status;

        await task.save();

        return JSON.parse(JSON.stringify(task));

    }
    catch (error) {
        return error;
    }
}

export async function deleteTask(task_id: string) {
    try {
        await connectToDatabase();

        const task = await Task.deleteOne({ _id: task_id });

        // console.log('TASK FOUND: ', task)
        // await task.remove();

        return true;

    }
    catch (error) {
        return error;
    }

}

export async function updateTaskDate(task_id: string, date: Date) {
    try {
        await connectToDatabase();

        const task = await Task.findOne({ _id: task_id });

        task.dueDate = date;

        await task.save();

        return JSON.parse(JSON.stringify(task));

    }

    catch (error) {
        return error;
    }
}

export const assignUserToTask = async (task_id: string, user_id: string) => {
    try {
        await connectToDatabase();

        // console.log('TASK ID: ', task_id);
        // console.log('USER ID: ', user_id);

        const task = await Task.findOne({ _id: task_id });

        const user = await User.findOne({ _id: user_id });

        // console.log('TASK: ', task);
        // console.log('USER: ', user);

        if (task) {
            task.assignees.push(user?._id);
            await task.save();

        }

        return JSON.parse(JSON.stringify(task));

    }

    catch (error) {
        return error;
    }
}