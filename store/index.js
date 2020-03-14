
export const state = () => ({
    products: [],
    cart: [
        // { id: 1, title: 'Keçi Peyniri', price: 10, count: 3, totalPrice: 30 },
        // { id: 2, title: 'Sele Zeytin', price: 15, count: 3, totalPrice: 45 },
        // { id: 3, title: 'Petek Balı', price: 40, count: 2, totalPrice: 80 },
        // { id: 4, title: 'Vişne Reçeli', price: 5, count: 2, totalPrice: 10 },
    ],
    totalPrice: 0.0
})

export const mutations = {
    setProducts(state, products) {
        state.products = products
    },
    setCart(state, cart) {
        state.cart = cart
    },
    setTotalPrice(state, totalPrice) {
        state.totalPrice = totalPrice
    },
    changeCount(state, payload) {
        let item = state.cart.find(i => i.title == payload.item.title);
        item.count += payload.count;
        item.totalPrice = item.count * item.price
        if (item.count == 0) {
            state.cart.splice(state.cart.indexOf(item), 1)
        }
    }
}

export const actions = {
    nuxtServerInit(vuexContext, context) {

        return context.$axios.get("/")
            .then(response => {
                vuexContext.commit("setProducts", response.data.products)
                vuexContext.commit("setCart", response.data.cart.items)
                vuexContext.commit("setTotalPrice", response.data.cart.totalPrice)
            }).catch(e => console.error(e))
    },
    fetchProducts(vuexContext, context) {

    },
    addToCart(vuexContext, product) {
        // let cart = [...vuexContext.getters.getCart];
        // let item = cart.find((i) => {
        //     return i.title == product.title
        // })
        // if (item) {
        //     let index = cart.indexOf(item)
        //     cart[index] = { ...item }
        //     cart[index].count += product.count
        //     cart[index].totalPrice += product.totalPrice
        // }
        // else {
        //     cart.push(product)
        // }

        // const totalPrice = vuexContext.getters.getTotalPrice + product.totalPrice
        // vuexContext.commit("setTotalPrice", totalPrice);
        this.$axios.post("/add-to-cart", { product: product })
            .then(res => {
                vuexContext.commit("setCart", res.data.cart);
                vuexContext.commit("setTotalPrice", res.data.totalPrice)
            })
    },
    removeProduct(vuexContext, product) {
        this.$axios.post("/remove-product", { product: product })
            .then(response => {
                vuexContext.commit("setCart", response.data.cart)
                vuexContext.commit("setTotalPrice", response.data.totalPrice)
            })

        // let cart = [...vuexContext.getters.getCart]
        // cart.splice(cart.indexOf(product), 1)
        // vuexContext.commit("setCart", cart);
        // vuexContext.commit("setTotalPrice", vuexContext.getters.getTotalPrice - product.totalPrice)
    },
    changeCount(vuexContext, payload) {
        this.$axios.post("/change-count", { product: payload.item, count: payload.count })
            .then(res => {
                vuexContext.commit("setCart", res.data.cart.items)
                vuexContext.commit("setTotalPrice", res.data.cart.totalPrice)
            })
    }
}

export const getters = {
    getProducts(state) {
        return state.products
    },
    getCart(state) {
        return state.cart
    },
    getTotalPrice(state) {
        return state.totalPrice
    }
}


