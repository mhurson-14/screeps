import { MiniBuilder } from "roles/MiniBuilder";
import { MiniHarvester } from "roles/MiniHarvester";
import { MiniUpgrader } from "roles/MiniUpgrader";
import { Role } from "roles/Role";
import { Roles } from "roles/Roles";

export class Spawner {
    spawner: StructureSpawn
    roles: Roles;
    quotas: Map<typeof Role, number>;
    priority: (typeof Role)[]

    constructor(spawner: StructureSpawn, roles: Roles, quotas: Map<typeof Role, number>) {
        this.spawner = spawner;
        this.roles = roles;
        this.quotas = quotas;
        this.priority = [MiniHarvester, MiniUpgrader, MiniBuilder];
    }

    run() {
        this.priority.forEach((roleClass) => {
            let quota = this.quotas.get(roleClass);
            let roles = this.roles.getRoles(roleClass);
            if (quota !== undefined && roles.length < quota) {
                this.spawn(roleClass);
            }
        });
    }

    spawn<T extends typeof Role>(roleClass: T) {
        let creepName = roleClass.getRoleName() + Game.time;
        let spawnOptions = { memory: { role: roleClass.getRoleName() } };
        this.spawner.spawnCreep(roleClass.getBodyParts(), creepName, spawnOptions);
    }
}
