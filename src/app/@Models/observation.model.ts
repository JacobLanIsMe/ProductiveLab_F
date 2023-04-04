export class Observation{
    constructor(
        public observationType: string,
        public day: number,
        public observationTime: Date,
        public mainPhoto: string,
    ){}
}