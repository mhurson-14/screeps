import { Harvester } from "roles/Harvester";

export class MiniHarvester extends Harvester {
    static getRoleName(): string {
        return 'MiniHarvester';
    }

    static getBodyParts(): BodyPartConstant[] {
        return [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
    }

}
