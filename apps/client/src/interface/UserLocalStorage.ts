export default interface IUserLocalStorage {
    id: number,
    firstname: string,
    lastname: string,
    phone_number: string,
    address: string,
    avatar: string,
    product_viewed: string[],
    email: string,
    logged_date: string,
    is_admin: boolean
}