declare module Models {
    export class TLRRouter {
        Title: string;
        State: string;
    }
    export interface ImageCard {
        ImageUrl: string;
        Title: string;
        Description: string;
        State: string;
        [name: string]: string;
    }
}