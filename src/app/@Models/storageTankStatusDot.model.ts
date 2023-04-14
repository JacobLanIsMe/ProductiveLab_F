import { StorageTankDto } from "./storageTankDto.model";

export class StorageTankStatusDto{
    constructor(
        public tankInfo: StorageTankDto,
        public tankId: number,
        public canistId: number,
        public canistName: string,
        public emptyAmount: number,
        public occupiedAmount: number,
        public totalAmount: number
    ){}
}