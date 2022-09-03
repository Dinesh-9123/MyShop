export const cartServiceUrls = {
    getCartItems: () => `https://localhost:7269/api/Cart/CartGetAll`,
    removeFromCart: () => `https://localhost:7269/api/Cart/CartRemoveItem`,
    addMoreInCart: () => `https://localhost:7269/api/Cart/CartAddItem`,
    orderAll: () => `https://localhost:7269/api/Cart/CartOrderAll`,
    getShippingItems: () => `https://localhost:7269/api/Cart/CartGetShippingItems`,
    saveShippingItem: () => `https://localhost:7269/api/Cart/CartShippingItem`
}