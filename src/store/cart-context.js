import React from 'react';

const CartContext = React.createContext({
    item:[],
    totalAmount:0,
    addItem: (item) => {},
    removeItem: (item) => {},
    emptyCart: () => {},
})

export default CartContext;