// Packages
import create from "zustand";

// Types
import { TProduct } from "./types";

interface IUseCartState {
  state: {
    open: boolean;
    products: TProduct[];
  };
  actions: {
    toggle: () => void;
    addProduct: (product: TProduct) => void;
  };
}

const initialState = {
  open: false,
  products: [],
};

const useCartStore = create<IUseCartState>((set) => ({
  state: initialState,
  actions: {
    toggle: () =>
      set((store) => ({
        state: { ...store.state, open: !store.state.open },
      })),
    addProduct: (product) =>
      set((store) => ({
        state: {
          open: true,
          products: [...store.state.products, product],
        },
      })),
  },
}));

export default useCartStore;
