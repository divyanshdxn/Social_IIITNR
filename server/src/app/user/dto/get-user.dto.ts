export class GetUserDto {
   
    constructor(
        public userId:string,
        public email:string,
        public firstName:string,
        public lastName:string,
        public photoUrl:string,
    ){}
}