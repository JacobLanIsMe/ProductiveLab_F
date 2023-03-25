import { StorageUnitDto } from "./storageUnitDto.model";

export class StorageUnitStatusDto{
    constructor(
        public caneIdOrBoxId: number,
        public caneNameOrBoxName: string,
        public caneBoxEmptyUnit: number,
        public storageUnitInfo: StorageUnitDto[],
        public unitInfoArray: StorageUnitDto[][]
    ){}
}