import { UserRole } from "./user-role";

export class User {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public matchingPassword: string;
    public phoneNumber: string;
    public dob: Date;
    public gender: string;
    public userRole: Set<UserRole>;

    addRole(role: string) {
        if (undefined == this.userRole) {
            this.userRole = new Set<UserRole>();
        }
        this.userRole.add(new UserRole(role));
    }
}
