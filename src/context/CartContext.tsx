import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { Product } from '../api/products';

export type CartItem = {
    product: Product;
    quantity: number;
};

type CartValue = {
    items: CartItem[];
    totalCount: number;
    totalPrice: number;
    getQuantity: (id: string) => number;
    add: (product: Product) => void;
    decrease: (id: string) => void;
    clear: () => void;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const add = useCallback((product: Product) => {
        setItems((current) => {
            const found = current.find((item) => item.product.id === product.id);
            if (found) {
                return current.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
                );
            }
            return [...current, { product, quantity: 1 }];
        });
    }, []);

    const decrease = useCallback((id: string) => {
        setItems((current) =>
            current.flatMap((item) => {
                if (item.product.id !== id) return [item];
                return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [];
            }),
        );
    }, []);

    const clear = useCallback(() => setItems([]), []);

    const value = useMemo(() => {
        const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const getQuantity = (id: string) => items.find((item) => item.product.id === id)?.quantity ?? 0;
        return { items, totalCount, totalPrice, getQuantity, add, decrease, clear };
    }, [items, add, decrease, clear]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart нужно использовать внутри CartProvider');
    }
    return context;
}