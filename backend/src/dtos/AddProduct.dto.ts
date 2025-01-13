export default interface AddProductDto{
    name: string;
    description: string;
    price: number;
    category: string;
    subCategory: string;
    sizes: Array<any>;
    bestseller: string;
}