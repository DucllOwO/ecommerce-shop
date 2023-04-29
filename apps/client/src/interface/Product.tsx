
export interface Product{
    id: number
    name: string
    price: number
    description?: string | null
    image?: string[]
    view?: number
    sold?: number
    isActive?: boolean
    discount?: number
    tag: number
    collection?: number
}