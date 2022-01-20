export class GetUserDto {
   
    constructor(
        public email:string,
        public firstName:string,
        public lastName:string,
        public photoUrl:string,
    ){}
}