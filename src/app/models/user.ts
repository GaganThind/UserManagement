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
    public addressLine1: string;
    public addressLine2: string;
    public city: string;
    public state: string;
    public country: string;
    public zipcode: number;

    addRole(role: string) {
        if (undefined == this.userRole) {
            this.userRole = new Set<UserRole>();
        }
        this.userRole.add(new UserRole(role));
    }
}
