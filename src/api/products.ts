import { catalog } from '../data/catalog';

export type Product = {
    id: string;
    title: string;
    category: string;
    price: number;
    unit: string;
    thumbnail: string;
};

type ApiIngredient = {
    idIngredient: string;
    strIngredient: string;
    strThumb: string | null;
};

const API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const IMAGES_URL = 'https://www.themealdb.com/images/ingredients/';

export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Не удалось загрузить продукты');
    }
    const data = await response.json();
    const ingredients: ApiIngredient[] = data.meals ?? [];
    const byName = new Map(ingredients.map((item) => [item.strIngredient.toLowerCase(), item]));

    const products: Product[] = [];
    for (const entry of catalog) {
        const item = byName.get(entry.key);
        if (item) {
            products.push({
                id: item.idIngredient,
                title: entry.name,
                category: entry.category,
                price: entry.price,
                unit: entry.unit,
                thumbnail: item.strThumb || `${IMAGES_URL}${entry.key.replace(/ /g, '_')}.png`,
            });
        }
    }
    return products;
}