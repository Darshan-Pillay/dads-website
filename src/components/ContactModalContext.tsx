import { createContext, useContext } from 'react';

export const ContactModalContext = createContext<{ openModal: () => void }>({
  openModal: () => {},
});

export function useContactModal() {
  return useContext(ContactModalContext);
}
