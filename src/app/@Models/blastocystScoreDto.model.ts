import { CommonDto } from "./commonDto.model";

export class BlastocystScoreDto{
    constructor(
        public blastocystScore_Expansion: CommonDto[],
        public blastocystScore_ICE: CommonDto[],
        public blastocystScore_TE: CommonDto[]
    ){}
}