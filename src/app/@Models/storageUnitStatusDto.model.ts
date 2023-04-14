import { StorageUnitDto } from "./storageUnitDto.model";

export class StorageUnitStatusDto{
    constructor(
        public stripIdOrBoxId: number,
        public stripNameOrBoxName: string,
        public stripBoxEmptyUnit: number,
        public storageUnitInfo: StorageUnitDto[],
        public unitInfoArray: StorageUnitDto[][]
    ){}
}