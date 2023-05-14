import { BaseStorage } from "./baseStorage.model";
import { GetObservationNoteNameDto } from "./getObservationNoteNameDto.model";

export class TreatmentSummaryDto{
    constructor(
        public ovumDetailId: string,
        public courseOfTreatmentSqlId: string,
        public ovumFromCourseOfTreatmentSqlId: string,
        public ovumDetailStatus: string,
        public dateOfEmbryo: number,
        public ovumNumber: number,
        public hasFertilization: boolean,
        public observationNote: GetObservationNoteNameDto,
        public ovumSource: string,
        public freezeStorageInfo: BaseStorage,
        public isChecked: boolean
    ){}
}