import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';
export class FunctionDto{
    constructor(
        public functionId: number,
        public name: string,
        public icon: string,
        public frontEndIcon?: IconDefinition
    ){}
}