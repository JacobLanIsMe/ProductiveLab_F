import { StorageTankDto } from "./storageTankDto.model";

export class StorageTankStatusDto{
    constructor(
        public tankInfo: StorageTankDto,
        public tankId: number,
        public shelfId: number,
        public shelfName: string,
        public emptyAmount: number,
        public occupiedAmount: number,
        public totalAmount: number
    ){}
}