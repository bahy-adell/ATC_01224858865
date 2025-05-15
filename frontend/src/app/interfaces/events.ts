export interface Event {
    readonly _id?: number;
    name: string;
    description: string;
    image: string;
    price: number;
    venue: string;
    date: any;
    category: string;
}
