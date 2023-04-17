import { StorageTankDto } from "./storageTankDto.model";
import { StorageUnitDto } from "./storageUnitDto.model";

export class BaseStorage{
    constructor(
        public tankInfo:StorageTankDto,
        public tankId:number,
        public canistId:number,
        public canistName:string,
        public stripBoxId:number,
        public stripBoxName:string,
        public topColorName:string,
        public unitInfo:StorageUnitDto
    ){}
}