export type Product = {
    id: string;
    title: string;
    price: number;
    category: string;
    thumbnail?: string;
    emoji?: string;
};

type ApiProduct = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
};

const API_URL = 'https://dummyjson.com/products/category/groceries';
const USD_TO_KZT = 500;

const translations: Record<string, { title: string; category: string }> = {
    Apple: { title: 'Яблоки, 1 кг', category: 'Фрукты' },
    Strawberry: { title: 'Клубника, 500 г', category: 'Фрукты' },
    Kiwi: { title: 'Киви, 500 г', category: 'Фрукты' },
    Lemon: { title: 'Лимоны, 1 кг', category: 'Фрукты' },
    Mulberry: { title: 'Шелковица, 500 г', category: 'Фрукты' },
    Cucumber: { title: 'Огурцы, 1 кг', category: 'Овощи' },
    Potatoes: { title: 'Картофель, 1 кг', category: 'Овощи' },
    'Red Onions': { title: 'Красный лук, 1 кг', category: 'Овощи' },
    'Green Bell Pepper': { title: 'Болгарский перец, 1 кг', category: 'Овощи' },
    'Green Chili Pepper': { title: 'Перец чили, 200 г', category: 'Овощи' },
    'Beef Steak': { title: 'Говяжий стейк, 1 кг', category: 'Мясо и рыба' },
    'Chicken Meat': { title: 'Курица, 1 кг', category: 'Мясо и рыба' },
    'Fish Steak': { title: 'Рыбный стейк, 1 кг', category: 'Мясо и рыба' },
    Milk: { title: 'Молоко, 1 л', category: 'Молочные продукты' },
    Eggs: { title: 'Яйца, 10 шт', category: 'Молочные продукты' },
    Rice: { title: 'Рис, 1 кг', category: 'Бакалея' },
    'Cooking Oil': { title: 'Подсолнечное масло, 1 л', category: 'Бакалея' },
    'Honey Jar': { title: 'Мёд, 500 г', category: 'Бакалея' },
    'Ice Cream': { title: 'Мороженое, 500 г', category: 'Сладости' },
    Juice: { title: 'Сок, 1 л', category: 'Напитки' },
    'Soft Drinks': { title: 'Газировка, 1 л', category: 'Напитки' },
    Water: { title: 'Питьевая вода, 5 л', category: 'Напитки' },
    'Nescafe Coffee': { title: 'Кофе Nescafe, 200 г', category: 'Напитки' },
};

function toTenge(usd: number) {
    return Math.round((usd * USD_TO_KZT) / 10) * 10;
}

export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Не удалось загрузить продукты');
    }
    const data = await response.json();
    const fromApi: Product[] = (data.products as ApiProduct[])
        .filter((item) => translations[item.title])
        .map((item) => ({
            id: `api-${item.id}`,
            title: translations[item.title].title,
            category: translations[item.title].category,
            price: toTenge(item.price),
            thumbnail: item.thumbnail,
        }));
    return fromApi;
}