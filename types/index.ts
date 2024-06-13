export type CreateUserParams = {
    clerkId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    photo: string;
};

export type CreateTaskParams = {
    title: string;
    description: string;
    dueDate: Date;
    status: boolean;
    creator: string;
};