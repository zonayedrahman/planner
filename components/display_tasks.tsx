import DisplayTaskCard from "./display_task_card"

type task = {
    _id: string,
    title: string,
    description: string,
    dueDate: Date,
    status: boolean,
    assignees: string[],
}

type DisplayTasksProps = {
    user_id: string | undefined,
    tasks: task[]
}

const DisplayTasks = ({ user_id, tasks }: DisplayTasksProps) => {
    return (
        <div className="my-8 flex flex-col gap-4">
            {
                tasks.map((task, index) => {
                    return (
                        <DisplayTaskCard user_id={user_id} key={index} task={task} />
                    )
                })
            }
        </div>
    )
}

export default DisplayTasks
