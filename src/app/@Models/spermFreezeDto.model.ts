export class SpermFreezeDto{
    constructor(
        public spermFreezeId: string,
        public vialNumber: number,
        public storageUnitName: string,
        public storageCaneBoxName: string,
        public storageShelfName: string,
        public storageTankName: string,
        public storageUnitId: number,
        public isChecked: boolean
    ){}
}