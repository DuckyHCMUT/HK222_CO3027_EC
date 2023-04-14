export function formatPrice(price) {
    return price.toLocaleString('vn-VN', {
        style: 'currency',
        currency: 'VND'
    });
};

export function isLoggedIn(user) {
    return Object.keys(JSON.parse(user)).length !== 0;
}