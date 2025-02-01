import { Role } from './Role';

// Todo: Refactor to use action type enum instead of boolean flags
export class Builder extends Role {
    run() {
        if (this.creep.store[RESOURCE_ENERGY] == 0) {
            this.clearCurrentTask();
        }
        if (this.transferring()) {
            this.transferEnergy();
        } else if (this.repairing()) {
            this.repair();
        } else if (this.building()) {
            this.build();
        } else if (this.upgrading()) {
            this.upgrade();
        } else {
            if (this.creep.store.getFreeCapacity() == 0) {
                if (this.getClosestTransferrableSite()) {
                    this.setTransferring(true);
                } else if (this.getClosestRepairableStructure()) {
                    this.setRepairing(true);
                } else if (this.getClosestConstructionSite()) {
                    this.setBuilding(true);
                } else {
                    this.setUpgrading(true);
                }
            } else {
                this.harvest();
            }
        }
        super.run();
    }

    clearCurrentTask(): void {
        this.setBuilding(false);
        this.setRepairing(false);
        this.setTransferring(false);
        this.setUpgrading(false);
    }

    build(): void {
        let target = this.getClosestConstructionSite();
        if (target) {
            if (this.creep.build(target) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(target, { visualizePathStyle: { stroke: '#0096FF' } });
            }
        } else {
            this.setBuilding(false);
        }
    }

    getClosestConstructionSite(): ConstructionSite | null {
        return this.creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    }

    repair(): void {
        const target = this.getClosestRepairableStructure();

        if (target) {
            if (this.creep.repair(target) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(target, { visualizePathStyle: { stroke: '#FF0000' } });
            }
        } else {
            this.setRepairing(false);
        }
    }

    getClosestRepairableStructure(): Structure | null {
        return this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.hits < structure.hitsMax;
            }
        });
    }

    getClosestTransferrableSite(): Structure | null {
        let target = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        if (!target) {
            target = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
        }
        return target;
    }

    transferEnergy(): void {
        let target = this.getClosestTransferrableSite();
        if (target) {
            if (this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(target, { visualizePathStyle: { stroke: '#904983' } });
            }
        } else {
            this.setTransferring(false);
        }
    }

    building(): boolean {
        return this.creep.memory.building || false;
    }

    setBuilding(building: boolean): void {
        this.creep.memory.building = building;
    }

    repairing(): boolean {
        return this.creep.memory.repairing || false;
    }

    setRepairing(repairing: boolean): void {
        this.creep.memory.repairing = repairing;
    }

    transferring(): boolean {
        return this.creep.memory.transferring || false;
    }

    setTransferring(transferring: boolean): void {
        this.creep.memory.transferring = transferring;
    }

    upgrade(): void {
        if (this.creep.upgradeController(this.getController()) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.getController(), { visualizePathStyle: { stroke: '#50C878' } });
        }
    }

    upgrading(): boolean {
        return this.creep.memory.upgrading || false;
    }

    setUpgrading(upgrading: boolean) {
        this.creep.memory.upgrading = upgrading;
    }
}
