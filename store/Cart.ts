// Packages
import create from "zustand";

// Types
import { TProduct } from "./types";

export interface IUseCartState {
  state: {
    open: boolean;
    products: TProduct[];
  };
  actions: {
    toggle: () => void;
    reset: () => void;
    addProduct: (product: TProduct) => void;
  };
}

const initialState = {
  open: false,
  products: [],
};

const addProductStoreAction = (store: IUseCartState, product: TProduct) => {
  if (store.state.products.includes(product)) return store.state.products;

  return [...store.state.products, product]
};

const useCartStore = create<IUseCartState>((set) => ({
  state: initialState,
  actions: {
    toggle: () =>
      set((store) => ({
        state: { ...store.state, open: !store.state.open },
      })),
    reset: () => set((store) => ({ state: { ...initialState } })),
    addProduct: (product) =>
      set((store) => ({
        state: {
          open: true,
          products: addProductStoreAction(store, product),
        },
      })),
  },
}));

export type ProductType = TProduct;
export default useCartStore;
