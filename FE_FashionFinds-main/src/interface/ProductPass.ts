export interface IProductPass {
    _id?: string,
    product_name: string,
    product_images: string,
    product_price: number,
    product_description: string,
    categoryId: string,
    createdAt?: string,
    updatedAt?: Date,
    slug?: string,
    review_count: number,
    average_score: number
}