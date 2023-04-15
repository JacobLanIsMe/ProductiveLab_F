export class SpermFreezeDto{
    constructor(
        public spermFreezeId: string,
        public vialNumber: number,
        public storageUnitName: string,
        public storageStripBoxId: number,
        public storageCanistName: string,
        public storageTankName: string,
        public storageUnitId: number,
        public isChecked: boolean
    ){}
}