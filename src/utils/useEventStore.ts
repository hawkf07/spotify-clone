import create from "zustand";

interface useNavbarStoreInterface {
  navbarIsOpen:boolean;
  navbarTogglerhandler:()=> void;
}

const useNavbarStore = create<useNavbarStoreInterface>((set,get) => ({
  navbarIsOpen:false,
  navbarTogglerhandler:()=> set((state) => ({navbarIsOpen:!state.navbarIsOpen}))
}))

export {
  useNavbarStore
}