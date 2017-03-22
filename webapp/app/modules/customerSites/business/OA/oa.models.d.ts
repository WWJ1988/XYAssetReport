declare module OAModels {
    export interface User {
        userName: string;
        password: string;
    }
    export interface BreadcrumbItem {
        title: string;
        state: string;
        isSelected?: boolean;
    }
}