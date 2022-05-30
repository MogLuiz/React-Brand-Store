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

const useStore = create<BearState>()(
  devtools(
    persist((set) => ({
      state: {
        open: false,
      },
      actions: {
        toggle: () => set((store) => ({ state: { open: !store.state.open } })),
      },
    }))
  )
);
