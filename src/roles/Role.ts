export class Role {
    creep: Creep

    constructor(creep: Creep) {
        this.creep = creep;
    }

    getController(): StructureController {
        if (!this.creep.room.controller) {
            throw new Error("Controller is undefined");
        }
        return this.creep.room.controller;
    }

    run(): void {
        new RoomVisual(this.creep.room.name).text(
            this.getRoleName(),
            this.creep.pos.x,
            this.creep.pos.y - 1,
            {color: 'grey', font: 0.2});
    }

    harvest(): void {
        const source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (source) {
            if (this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(source, { visualizePathStyle: { stroke: '#FFFF00' } });
            }
        }
    }

    getRoleName(): string {
        return this.creep.memory.role;
    }

    static getRoleName(): string {
        throw new Error("Method not implemented.");
    }

    static getBodyParts(): BodyPartConstant[] {
        throw new Error("Method not implemented.");
    }
}
