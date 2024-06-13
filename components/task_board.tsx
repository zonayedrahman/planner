'use client';

import Task from "@/lib/database/models/task.model";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createTemp } from "@/lib/database/actions/temp.actions"
import { Textarea } from "./ui/textarea"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "./ui/calendar"
import { createTask } from "@/lib/database/actions/task.actions"
import { useRouter } from "next/navigation"
import SearchAssignee from "./search_assignee";
import { useState } from "react";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string(),
    due_date: z.date(),
    due_time: z.string(),
    status: z.boolean(),
})

type AddTaskProps = {
    user_id: string
    SetAddNewTask: (value: boolean) => void
}

const TaskBoard = ({ task }: { task: typeof Task }) => {



    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            due_date: new Date(),
            due_time: "12:00",
            status: false,
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {

        // const newTask = await createTask({
        //     title: values.title,
        //     description: values.description,
        //     dueDate: values.due_date,
        //     status: values.status,
        //     creator: user_id,
        // })

        // SetAddNewTask(false)
        console.log('VALUES: ', values)
        // form.reset()

        // location.reload();

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* <div className="flex justify-between w-full pt-12 "> */}
                <div className="w-full px-6 flex flex-col gap-12">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Add Task</FormLabel>
                                <FormControl>
                                    <Input placeholder="Task Title" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                This is 
                            </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Task Description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="flex justify-between">
                        <FormField
                            control={form.control}
                            name="due_date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Due date
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="w-full flex ">
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Input type="checkbox" {...field} value={field.value ? 1 : 0} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}

                        />
                    </div>

                    {/* search assignees */}
                    <div>


                        <SearchAssignee task={task} />
                    </div>



                    <Button type="submit" className="w-full ">Submit</Button>







                </div>


            </form>
        </Form>
    )
}


export default TaskBoard