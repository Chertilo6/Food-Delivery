export function validateRequired(value: string, message: string) {
    return value.trim() ? '' : message;
}

export function validateEmail(value: string) {
    const email = value.trim();
    if (!email) return 'Введите почту';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Введите корректную почту';
    return '';
}