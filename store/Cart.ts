import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUseCartState {
  state: {
    open: boolean;
    products: any;
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
