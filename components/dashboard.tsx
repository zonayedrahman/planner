'use client';

import { UserButton } from "@clerk/nextjs";
import AddTask from "./addtask";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import DisplayTasks from "./display_tasks";
import { fetchTasks, fetchTasksById } from "@/lib/database/actions/task.actions";

type DashboardProps = {
    current_user_id: string | undefined
}

const Dashboard = ({ current_user_id }: DashboardProps) => {

    // console.log('CURRENT USER ID: ', current_user_id);

    const [AddNewTask, SetAddNewTask] = useState(false)

    const [tasksToDisplay, SetTasksToDisplay] = useState([])

    useEffect(() => {
        console.log('CURRENT USER ID: ', current_user_id);
        const fetchCurrentUserTasks = async () => {
            const response = await fetchTasksById(current_user_id!);
            // console.log('RESPONSE: ', response);
            SetTasksToDisplay(response);
        };

        fetchCurrentUserTasks();
    }, [])



    return (
        <div className="py-10 px-8 flex flex-col">
            <div className="flex justify-between">
                <h1 className="font-bold text-2xl border-b-2 border-black border-opacity-40 pr-6">Planner</h1>
                <div className="pr-6">
                    <UserButton />
                </div>

            </div>

            <DisplayTasks user_id={current_user_id} tasks={tasksToDisplay} />

            <div>
                <div className="flex justify-end pr-12 pt-6">
                    {!AddNewTask && <Button onClick={() => SetAddNewTask(true)}>Add Task</Button>}
                </div>
                {AddNewTask && <AddTask user_id={current_user_id} SetAddNewTask={SetAddNewTask} />}

                {/* <AddTask user_id={current_user_id} /> */}
            </div>
        </div>
    )
}

export default Dashboard
