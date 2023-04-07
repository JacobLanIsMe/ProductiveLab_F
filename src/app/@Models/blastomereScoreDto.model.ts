import { CommonDto } from "./commonDto.model";

export class BlastomereScoreDto{
    constructor(
        public blastomereScore_C: CommonDto[],
        public blastomereScore_G: CommonDto[],
        public blastomereScore_F: CommonDto[]
    ){}
}