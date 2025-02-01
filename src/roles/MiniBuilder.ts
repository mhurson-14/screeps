import { Builder } from "./Builder";

export class MiniBuilder extends Builder {
    static getRoleName(): string {
        return 'MiniBuilder';
    }

    static getBodyParts(): BodyPartConstant[] {
        return [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
    }
}
