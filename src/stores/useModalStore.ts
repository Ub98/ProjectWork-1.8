import { create } from "zustand";

interface ModalState {
  modalFormProduction: boolean;
  setModalFormProduction: (value: boolean) => void;
  modalFormResource: boolean
  setModalFormResource: (value: boolean) => void;
}

const useModalStore = create<ModalState>((set) => ({
  modalFormProduction: false,
  setModalFormProduction: (value) => set({ modalFormProduction: value }),
  modalFormResource: false,
  setModalFormResource: (value) => set({ modalFormResource: value }),
}));

export default useModalStore;
