export interface Goal {
    _id?: string;
    title: string;
    description: string;
    category: string;
    dueDate: string;
    status: string;
    recurrence: string;
    streak: number;
    completionDates?: [];
    userId?: string;
}