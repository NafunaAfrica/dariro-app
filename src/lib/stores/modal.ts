import { writable } from 'svelte/store';

export type ModalContent = {
  title: string;
  component?: string;
  props?: Record<string, unknown>;
  html?: string;
};

export const modalStore = writable<ModalContent | null>(null);

export function openModal(content: ModalContent) {
  modalStore.set(content);
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  modalStore.set(null);
  document.body.style.overflow = '';
}
