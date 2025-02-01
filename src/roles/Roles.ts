import { MiniBuilder } from "./MiniBuilder";
import { MiniHarvester } from "./MiniHarvester";
import { MiniUpgrader } from "./MiniUpgrader";
import { Role } from "./Role";

export class Roles {
    roles: Map<typeof Role, Role[]>;

    constructor() {
        this.roles = new Map<typeof Role, Role[]>();
        _.forEach(Game.creeps, (creep) => {
            let roleType = this.getRoleType(creep);
            if (!this.roles.has(roleType)) {
                this.roles.set(roleType, []);
            }
            this.roles.get(roleType)!.push(new roleType(creep));
        });
    }

    run() {
        this.roles.forEach((roles) => {
            roles.forEach((role) => {
                role.run();
            });
        });
    }

    getRoleType(creep: Creep): typeof Role {
        switch (creep.memory.role) {
            case MiniHarvester.getRoleName():
                return MiniHarvester;
            case MiniUpgrader.getRoleName():
                return MiniUpgrader;
            case MiniBuilder.getRoleName():
                return MiniBuilder;
            default:
                throw new Error("Unknown role");
        }
    }

    getRoles(roleType: typeof Role): Role[] {
        return this.roles.get(roleType) || [];
    }
}
