"use client"
type ShowTaskDateProps = {
    task_id: string,
    task_date: Date
}




import { CalendarIcon } from "lucide-react"


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { SetStateAction, useEffect, useState } from "react"
import { updateTaskDate } from "@/lib/database/actions/task.actions"
import { useRouter } from "next/navigation"




export default function ShowTaskDate({ task_id, task_date }: ShowTaskDateProps) {

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(task_date)


    const router = useRouter();

    useEffect(() => {

        const updateTaskDateTrigger = async () => {
            const response = await updateTaskDate(task_id, selectedDate || task_date);

        }

        if (selectedDate) {
            updateTaskDateTrigger();
            // location.reload();
        }

        // console.log('SELECTED DATE: ', selectedDate)
    }, [selectedDate])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className={cn("flex items-center gap-1")}>

                    <span>{task_date.toString().split('T')[0]}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}

                    disabled={
                        (date) => {
                            return date < new Date()
                        }
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

