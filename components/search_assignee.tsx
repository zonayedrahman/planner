'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getUserBySearchQuery } from "@/lib/database/actions/user.actions"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState } from "react"
import SearchedUserCard from "./searched_user_card"
import { useUser } from "@clerk/nextjs"
import { useParams } from "next/navigation"


type SearchAssigneeProps = {
    // setSearchAssigneeQuery: (value: string) => void
    task: any
}

const SearchAssignee = ({ task }: SearchAssigneeProps) => {

    const { user } = useUser();

    const [searchQuery, setSearchQuery] = useState('')
    const [searched, setSearched] = useState(false)

    const [searchedUsers, setSearchedUsers] = useState([]) as any[]


    const onSearchSubmit = () => {
        // console.log('SEARCH ASSIGNER QUERY: ', searchQuery)
        const findUsers = async () => {
            const response = await getUserBySearchQuery(searchQuery)

            // filter current user and assignees from the search results
            let searchedResults = response.filter((curr_user: any) => curr_user.clerkId !== user!.id)

            // console.log('TASK ASSIGNEES: ', task.assignees)
            // console.log('SEARCHED RESULTS: ', searchedResults)
            searchedResults = searchedResults.filter((curr_user: any) => {

                return !task.assignees.includes(curr_user._id)
            })

            // console.log('SEARCHED RESULTS AFTER FILTER: ', searchedResults)


            setSearchedUsers(searchedResults)


        }

        findUsers()
        setSearched(true)

    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Collaborator</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]" >

                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4 px-20">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="Name or Username or Email"
                            defaultValue=""
                            className="col-span-3"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                </div>
                {/* show searched people here */}
                {searched && (
                    <div className="flex flex-col px-6 pb-12">
                        <div className="text-lg font-bold border-b pr-6 pb-2">
                            Searched
                        </div>

                        <div className="flex flex-col gap-4 mt-2">
                            {searchedUsers.map((user: any) => {
                                return (
                                    <SearchedUserCard key={user._id} user={user} setSearched={setSearched} setSearchQuery={setSearchQuery} />
                                )
                            })}
                        </div>
                    </div>
                )
                }


                <Button type="submit" onClick={onSearchSubmit}  >Search</Button>

                {/* <DialogClose asChild>
                    <Button type="submit" onClick={onSearchSubmit}  >Search</Button>
                </DialogClose> */}
            </DialogContent>
        </Dialog>
    )
}

export default SearchAssignee
