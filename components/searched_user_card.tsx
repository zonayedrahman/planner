'use client';

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { assignUserToTask } from "@/lib/database/actions/task.actions";
import { useParams } from "next/navigation";

type SearchedUserCardProps = {
    user: any,
    setSearched: (value: boolean) => void,
    setSearchQuery: (value: string) => void
}

const SearchedUserCard = ({ user, setSearched, setSearchQuery }: SearchedUserCardProps) => {

    const params = useParams();

    const assignUser = async () => {


        const response = await assignUserToTask(params['id'].toString(), user._id);
        setSearched(false);
        setSearchQuery('');

    }


    return (
        <Card className="h-36">
            <CardHeader className="pb-0">
                <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-end">
                {/* <Button variant="outline">Cancel</Button> */}
                <Button onClick={assignUser}>Assign</Button>
            </CardFooter>
        </Card>
    )
}

export default SearchedUserCard
