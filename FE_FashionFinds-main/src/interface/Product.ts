export interface IProduct {
    _id?: string,
    product_name: string,
    product_images: string,
    product_size: string,
    product_color: string,
    product_price: number,
    product_quantity: number,
    product_discount: number,
    product_description_sort: string,
    product_description_long: string,
    categoryId: string,
    createdAt?: string,
    updatedAt?: Date,
    slug?: string,
    review_count: number,
    average_score: number
}