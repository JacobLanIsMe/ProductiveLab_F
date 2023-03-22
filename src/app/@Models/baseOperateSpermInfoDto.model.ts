import { SpermFreezeDto } from './spermFreezeDto.model';
import { BaseCustomerInfoDto } from "./baseCustomerInfoDto.models";

export class BaseOperateSpermInfoDto{
    constructor(
        public husband: BaseCustomerInfoDto,
        public isFresh: boolean,
        public spermRetrievalMethod: string,
        public spermOwner: BaseCustomerInfoDto,
        public spermFreezes: SpermFreezeDto[],
        public spermFromCourseOfTreatmentId: string
    ){}
}