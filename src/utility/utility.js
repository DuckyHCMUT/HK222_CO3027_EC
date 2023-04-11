export function formatPrice(price) {
    return price.toLocaleString('vn-VN', {
        style: 'currency',
        currency: 'VND'
    });
};