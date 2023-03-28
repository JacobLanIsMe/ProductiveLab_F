export class StorageLocation{
    constructor(
        public tankName: string,
        public shelfName: string,
        public caneNameOrBoxName: string,
        public unitId: number,
        public unitName: string,
    ){}
}