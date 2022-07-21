import { types, getRoot } from "mobx-state-tree";

const CartItem = types
  .model("CartItem", {
    id: types.string,
    count: types.number,
  })
  .views((self) => ({
    get shopItem() {
      const store = getRoot(self);
      return store.items.find((x) => x.id === self.id);
    },
  }))
  .actions((self) => {
    return {
      add() {
        self.count++;
      },
      remove() {
        if (self.count === 1) {
          //remove myself.
          const store = getRoot(self);
          store.removeCartItem(self);
          return;
        }
        self.count--;
      },
    };
  });

export default CartItem;
