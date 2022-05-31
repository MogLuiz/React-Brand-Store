import create from "zustand";

export type TProduct = {
  id: string;
  image: string;
  price: string;
  title: string;
};
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

const useCartStore = create<IUseCartState>((set) => ({
  state: {
    open: false,
    products: [],
  },
  actions: {
    toggle: () =>
      set((store) => ({
        state: { ...store.state, open: !store.state.open },
      })),
    addProduct: (product) =>
      set((store) => ({
        state: {
          ...store.state,
          products: [...store.state.products, product],
        },
      })),
  },
}));

export default useCartStore;
