export class StorageUnitDto{
    constructor(
        public storageUnitId: number,
        public unitName: string,
        public isOccupied: boolean,
    ){}
}