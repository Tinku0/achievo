export interface Goal {
    _id?: string;
    title: string;
    description: string;
    category: string;
    dueDate: string;
    status: string;
    userId?: string;
}