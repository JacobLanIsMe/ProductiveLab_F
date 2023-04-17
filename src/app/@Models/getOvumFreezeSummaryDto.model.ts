import { BaseStorage } from "./baseStorage.model";
import { FreezeObservationNote } from "./freezeObservationNote.model";

export class GetOvumFreezeSummaryDto{
    constructor(
        public courseOfTreatmentId:string,
        public ovumFromCourseOfTreatmentId:string,
        public ovumNumber:number,
        public ovumPickupTime:Date,
        public freezeTime:Date,
        public freezeObservationNoteInfo:FreezeObservationNote,
        public freezeStorageInfo:BaseStorage,
        public medium:string
    ){}
}