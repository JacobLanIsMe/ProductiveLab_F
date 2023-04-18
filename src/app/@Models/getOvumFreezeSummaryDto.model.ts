import { BaseStorage } from "./baseStorage.model";
import { GetObservationNoteNameDto } from "./getObservationNoteNameDto";

export class GetOvumFreezeSummaryDto{
    constructor(
        public courseOfTreatmentId:string,
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