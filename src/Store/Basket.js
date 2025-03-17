import { create } from "zustand";

const UseBasket = create((set) => ({
    basket: JSON.parse(localStorage.getItem("basket")) || [],
    addNewProduct: (product) => set((state) => {
        const newBasket = [product, ...state.basket]
        localStorage.setItem("basket", JSON.stringify(newBasket))
        return {
            basket: newBasket,
        }
    }),
    changeProductCount: (id, o) => set(state => {
        const currentElement = state.basket.find((p) => p.id === id)
        if (o === "+") {
            currentElement.count += 1
        } else if (o === "-"){
            if (currentElement.count > 1){
                currentElement.count -= 1
            }
        }
        currentElement.totalPrice = currentElement.count * currentElement.price
        return {
            basket: [...state.basket],
        }
    })
}))

export default UseBasket;