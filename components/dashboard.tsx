'use client';

import { UserButton } from "@clerk/nextjs";

const Dashboard = () => {
    return (
        <div className="py-10 px-8">
            <div className="flex justify-between">
                <h1 className="font-bold text-2xl border-b-2 border-black border-opacity-40 pr-6">Planner</h1>
                <div className="pr-6">
                    <UserButton />
                </div>

            </div>
        </div>
    )
}

export default Dashboard
