export class CreateUserDto {
    constructor(
        public userId: string,
        public passwordHash: string,
        public email:string,
        public firstName: string,
        public lastname?: string,
        public photoUrl?:string,
    ) { }
}

export class User {
    constructor(
        public userId:string,
        public email:string,
        public firstName: string,
        public lastname?: string,
        public photoUrl?:string,
    ){}
}