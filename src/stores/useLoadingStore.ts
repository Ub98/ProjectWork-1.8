import { create } from "zustand";

type TLoadingState = {
  isLoading: boolean;
  loadingCount: number;
  startLoading: () => void;
  stopLoading: () => void;
};

const useLoadingStore = create<TLoadingState>((set) => ({
  isLoading: false,
  loadingCount: 0,

  startLoading: () => set((state) => ({
    loadingCount: state.loadingCount + 1,
    isLoading: true,
  })),

  stopLoading: () => set((state) => {
    const newCount = Math.max(state.loadingCount - 1, 0);
    return {
      loadingCount: newCount,
      isLoading: newCount > 0, // Resta true finché ci sono richieste in corso
    };
  })

}));

export default useLoadingStore;