export class TreatmentSummaryDto{
    constructor(
        public ovumPickupDetailId: string,
        public courseOfTreatmentSqlId: string,
        public ovumFromCourseOfTreatmentSqlId: string,
        public ovumPickupDetailStatus: string,
        public dateOfEmbryo: number,
        public ovumNumber: number,
        public hasFertilization: boolean,
        public observationNote: string,
        public ovumSource: string,
        public isChecked: boolean
    ){}
}