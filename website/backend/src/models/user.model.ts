export class CreateUserDto {
    constructor(
        public uuid: string,
        public passwordHash: string,
        public email:string,
        public firstName: string,
        public lastname?: string,
        public photoUrl?:string,
    ) { }
}

export class User {
    constructor(
        public uuid:string,
        public email:string,
        public firstName: string,
        public lastname?: string,
        public photoUrl?:string,
    ){}
}