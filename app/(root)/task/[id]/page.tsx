import TaskBoard from '@/components/task_board'
import { fetchTask } from '@/lib/database/actions/task.actions'
import { UserButton } from '@clerk/nextjs'



type idPageProps = {
    params: {
        id: string
    },
    searchParams?: string
}

const page = async ({ params }: idPageProps) => {

    const task = await fetchTask(params.id);




    return (
        <div className="h-full flex justify-center items-center">
            <div className=" h-4/5 w-2/5 rounded-lg border border-black border-opacity-20 shadow-lg">
                <div className='h-24 mb-6 flex items-center justify-between px-8 pt-2'>
                    <div className='text-2xl font-bold'>
                        {task['title']}
                    </div>
                    <UserButton />
                </div>
                <TaskBoard task={task} />

            </div>
        </div>
    )
}

export default page
