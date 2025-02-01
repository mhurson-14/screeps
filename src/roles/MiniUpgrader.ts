import { Upgrader } from './Upgrader';

export class MiniUpgrader extends Upgrader {
    static getRoleName(): string {
        return 'MiniUpgrader';
    }

    static getBodyParts(): BodyPartConstant[] {
        return [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
    }

}
