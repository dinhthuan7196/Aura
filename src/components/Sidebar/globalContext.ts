import { createContext, useContext } from 'react';

export type GlobalContent = {
  onClose?: () => void;
};

export const SideBarGlobalContext = createContext<GlobalContent>({});
export const useGlobalContext = () => useContext(SideBarGlobalContext);
