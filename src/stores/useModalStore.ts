import { create } from "zustand";

interface ModalState {
  modalFormProduction: boolean;
  setModalFormProduction: (value: boolean) => void;
}

const useModalStore = create<ModalState>((set) => ({
  modalFormProduction: false,
  setModalFormProduction: (value) => set({ modalFormProduction: value }),
}));

export default useModalStore;
