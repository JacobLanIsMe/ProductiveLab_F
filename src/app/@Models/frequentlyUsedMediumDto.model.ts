import { CommonDto } from "./commonDto.model"

export class FrequentlyUsedMediumDto extends CommonDto {
    constructor(
        public mediumTypeId: number
    ){
        super(0,"");
    }
}