import { BaseResponseDto } from './baseResponseDto.model';
import { Incubator } from './incubator.model';
export class IncubatorDto extends BaseResponseDto{
    constructor(
        public data: Incubator[]
    ){
        super(true, "");
    }
}