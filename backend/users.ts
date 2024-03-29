export class User {
    constructor ( 
        public email: string,
        public name: string,
        private password: string
    ) {}

    matches(another:User): boolean {
        return  another !== undefined &&
                another.email === this.email &&
                another.password == this.password
    }
}

export const users: {[key: string]: User} = {
    "admin@admin.com": new User("admin@admin.com",'Admin','123456'),
    "fhrlobacz@gmail.com": new User('fhrlobacz@gmail.com','Fernando','asdasd')
}