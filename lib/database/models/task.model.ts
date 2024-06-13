'use server';

import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    dueDate: { type: Date, required: true },
    status: { type: Boolean, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignees: [{ type: Schema.Types.ObjectId, ref: "User" }, { required: false }, { default: [] }]
});


const Task = models.Task || model('Task', TaskSchema);

export default Task;