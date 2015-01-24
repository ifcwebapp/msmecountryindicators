interface TaffyInterface {
    (any): any; 
    insert(any): void;
}

interface TaffyStatic {
    (a: any): TaffyInterface;
}

declare var TAFFY: TaffyInterface;

