declare module DaikuanModels {
    export interface Car {
        Brand: string;
        Type: string;
        Price: number;
    }
    export interface StringKeyValue<T> {
        [key: string]: T;
    }
}