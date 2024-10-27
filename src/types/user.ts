export interface User {
    id: number | string
    email : string,
    name : string,
    role : 'user' | 'admin',
    phone : string
}


export interface UserLogin {
    email : string ,
    password : string
}