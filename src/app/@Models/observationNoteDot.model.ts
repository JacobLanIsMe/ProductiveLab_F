import { Observation } from "./observation.model";

export class ObservationNoteDto{
    constructor(
        public ovumPickupDate: Date,
        public ovumNumber: number,
        public observationNote: Observation[],
        public orderedObservationNote: Observation[]
    ){}
}