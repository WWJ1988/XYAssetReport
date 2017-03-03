declare module WwjModels {
    export class NavItem {
        title: string;
        state: string;
    }
    export class LRNav {
        leftItems: NavItem[];
        rightItems: NavItem[];
    }
}