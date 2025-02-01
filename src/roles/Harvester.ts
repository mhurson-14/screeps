import { Role } from "roles/Role";

export class Harvester extends Role {
    run() {
        super.run();
        if (this.transferring()) {
            if (this.creep.store.getUsedCapacity() == 0) {
                this.setTransferring(false);
            } else {
                this.transferEnergy();
            }
        } else {
            if (this.creep.store.getFreeCapacity() == 0) {
                this.setTransferring(true);
            } else {
                this.harvest();
            }
        }
    }

    transferEnergy(): void {
        let targets = this.creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        if (targets.length == 0) {
            targets = this.creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
        }

        if (targets.length > 0) {
            let target = targets[0];
            if (this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(target, { visualizePathStyle: { stroke: '#904983' } });
            }
        }
    }

    transferring(): boolean {
        return this.creep.memory.transferring || false;
    }

    setTransferring(transferring: boolean): void {
        this.creep.memory.transferring = transferring;
    }
}
