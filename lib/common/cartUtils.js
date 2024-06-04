export function addToCart(cart, setCart, item) {
  const existingItem = cart.find(
    (cartItem) => cartItem.item_id === item.item_id,
  );

  if (existingItem) {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.item_id === item.item_id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }

      return cartItem;
    });

    setCart(updatedCart);
  } else {
    setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
  }
}

export function removeFromCart(cart, setCart, item) {
  const existingItem = cart.find(
    (cartItem) => cartItem.item_id === item.item_id,
  );

  if (existingItem) {
    if (existingItem.quantity > 1) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.item_id === item.item_id) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }

        return cartItem;
      });

      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter(
        (cartItem) => cartItem.item_id !== item.item_id,
      );

      setCart(updatedCart);
    }
  }
}

export function clearCart(cart, setCart) {
  setCart([]);
};
