export class TreatmentSummaryDto{
    constructor(
        public ovumPickupDetailId: string,
        public courseOfTreatmentSqlId: string,
        public ovumFromCourseOfTreatmentSqlId: string,
        public ovumPickupDetailStatus: string,
        public dateOfEmbryo: number,
        public ovumNumber: number,
        public fertilizationStatus: string,
        public observationNote: string,
        public isChecked: boolean
    ){}
}