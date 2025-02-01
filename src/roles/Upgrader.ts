import { Role } from "./Role";

export class Upgrader extends Role {
    run() {
        super.run();
        if (this.upgrading()) {
            if (this.creep.store[RESOURCE_ENERGY] == 0) {
                this.setUpgrading(false);
            } else {
                this.upgrade();
            }
        } else {
            if (this.creep.store.getFreeCapacity() == 0) {
                this.setUpgrading(true);
            } else {
                this.harvest();
            }
        }
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
