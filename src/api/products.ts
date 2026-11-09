export type Product = {
    id: number;
    title: string;
    price: number;
    category: string;
};

const API_URL = 'https://dummyjson.com/products/category/groceries';

export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Не удалось загрузить продукты');
    }
    const data = await response.json();
    return data.products;
}   