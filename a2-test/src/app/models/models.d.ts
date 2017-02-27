declare module blogModels {
    export interface IBlog {
        id: number;
        title: string;
        content: string;
        summary: string;
        author: string;
        date: Date;
        type: number;
    }
}