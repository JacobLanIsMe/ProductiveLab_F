export class TreatmentSummaryDto{
    constructor(
        public ovumDetailId: string,
        public courseOfTreatmentSqlId: string,
        public ovumFromCourseOfTreatmentSqlId: string,
        public ovumDetailStatus: string,
        public dateOfEmbryo: number,
        public ovumNumber: number,
        public hasFertilization: boolean,
        public observationNote: string,
        public ovumSource: string,
        public isChecked: boolean
    ){}
}