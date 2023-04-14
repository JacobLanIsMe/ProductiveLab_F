export class StorageLocation{
    constructor(
        public tankName: string,
        public tankTypeId: number,
        public canistName: string,
        public stripIdOrBoxId: number,
        public unitId: number,
        public unitName: string,
    ){}
}