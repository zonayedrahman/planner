'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { deleteTask, updateTaskStatus } from "@/lib/database/actions/task.actions"
import { BoxSelect, Check, DoorClosed, DoorOpen, X } from "lucide-react"
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation"
import ShowTaskDate from "./show_task_date";
import Link from "next/link";
import { useState } from "react";



type DisplayTaskCardProps = {
    user_id: string | undefined,
    task: {
        _id: string,
        title: string,
        description: string,
        dueDate: Date,
        status: boolean,
        assignees: string[],
    }
}

const DisplayTaskCard = ({ user_id, task }: DisplayTaskCardProps) => {

    const [clickDisabled, setClickDisabled] = useState(false);


    const onStatusClick = async (task_id: string) => {
        const response = await updateTaskStatus(task_id);

        if (response) {
            location.reload();
        }
    }

    const removeTaskClick = (task_id: string) => async () => {
        const response = await deleteTask(task_id);

        if (response) {
            location.reload();
        }
    }

    console.log('TASK: ', task, 'USER: ', user_id)

    if (task.assignees.includes(user_id!)) {

        task.description = 'You are assigned to this task';
    }

    return (
        <Link href={`/task/${task._id}`} >
            <Card className="relative group h-28 flex cursor-pointer">
                <button className="absolute top-1 right-1 group" onClick={removeTaskClick(task._id)} >
                    <DoorOpen className="group-hover:hidden opacity-80 text-green-700" size={20} strokeWidth={1} />
                    <DoorClosed className="group-hover:opacity-100 opacity-0 text-red-500" size={20} strokeWidth={1} />
                </button>

                <div className="h-full w-4/5 flex flex-col justify-center ">
                    <CardHeader>
                        <CardTitle>
                            <div className="group-hover:underline">
                                {task.title}
                            </div>
                        </CardTitle>
                        <CardDescription>
                            {task.description}
                        </CardDescription>
                    </CardHeader>
                </div>
                <div className="h-full w-1/5 flex flex-col justify-center items-center pt-8 pr-6">
                    <CardContent className="flex flex-col gap-1">
                        <div>
                            <CardDescription className="flex gap-1 justify-end pr-1">
                                <span>Completed:</span>
                                <button className="flex justify-center items-center" onClick={() => onStatusClick(task._id)}>
                                    <BoxSelect className="relative opacity-30" />
                                    {!task.status &&
                                        <X className="absolute text-red-500" strokeWidth={3} />
                                    }
                                    {task.status &&
                                        <Check className="absolute text-green-500" strokeWidth={3} />

                                    }
                                </button>


                            </CardDescription>
                        </div>
                        <ShowTaskDate task_id={task._id} task_date={task.dueDate} />


                    </CardContent>
                </div >

            </Card >
        </Link>
    )
}

export default DisplayTaskCard
