import { Medium } from './medium.model';
import { BaseResponseDto } from './baseResponseDto.model';
export class MediumDto extends BaseResponseDto{
    constructor(
        public data: Medium[]
    ){
        super(true, "");
    }
}