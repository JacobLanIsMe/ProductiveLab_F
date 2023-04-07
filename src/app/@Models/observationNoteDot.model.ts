import { Observation } from "./observation.model";

export class ObservationNoteDto{
    constructor(
        public ovumPickupDetailId: string,
        public ovumPickupDate: Date,
        public ovumNumber: number,
        public observationNote: Observation[],
        public orderedObservationNote: Observation[][]
    ){}
}