import { BaseStorage } from "./baseStorage.model";
import { GetObservationNoteNameDto } from "./getObservationNoteNameDto.model";

export class GetOvumFreezeSummaryDto{
    constructor(
        public courseOfTreatmentSqlId:number,
        public courseOfTreatmentId:string,
        public ovumFromCourseOfTreatmentSqlId:number,
        public ovumFromCourseOfTreatmentId:string,
        public ovumNumber:number,
        public ovumPickupTime:Date,
        public freezeTime:Date,
        public freezeObservationNoteInfo:GetObservationNoteNameDto,
        public freezeStorageInfo:BaseStorage,
        public medium:string,
        public isChecked:boolean
    ){}
}