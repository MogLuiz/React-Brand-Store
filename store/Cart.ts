import create from "zustand";

type TProduct = {
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
        state: { open: !store.state.open, products: store.state.products },
      })),
  },
}));

export default useCartStore;
