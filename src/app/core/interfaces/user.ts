export interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    name: {
        firstname: string,
        lastname: string,
    },
    address: {
        street: string,
        city: string,
        zipcode: string,
    },
    phone: string,
}
