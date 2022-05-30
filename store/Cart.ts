import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearState {
  state: {
    open: boolean;
  };
  actions: {
    toggle: () => void;
  };
}

const useCartStore = create<BearState>()(
  devtools(
    persist((set) => ({
      state: {
        open: true,
      },
      actions: {
        toggle: () => set((store) => ({ state: { open: !store.state.open } })),
      },
    }))
  )
);

export default useCartStore