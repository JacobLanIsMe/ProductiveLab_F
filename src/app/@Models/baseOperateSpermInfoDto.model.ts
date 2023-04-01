import { BaseCustomerInfoDto } from "./baseCustomerInfoDto.model";
import { SpermScoreDto } from "./spermScoreDto.model";

export class BaseOperateSpermInfoDto{
    constructor(
        public husband: BaseCustomerInfoDto,
        public isFresh: boolean,
        public spermRetrievalMethod: string,
        public spermOwner: BaseCustomerInfoDto,
        public spermFromCourseOfTreatmentId: string,
        public existingSpermScores: SpermScoreDto[] 
    ){}
}