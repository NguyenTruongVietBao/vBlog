import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: string) {
  return new Date(date).toLocaleString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path;
};

const isClient = typeof window !== 'undefined';
export const getAccessTokenFromLocalStorage = () =>
  isClient ? localStorage.getItem('accessToken') : null;
export const setAccessTokenToLocalStorage = (accessToken: string) =>
  isClient ? localStorage.setItem('accessToken', accessToken) : null;
export const removeAccessTokenFromLocalStorage = () =>
  isClient ? localStorage.removeItem('accessToken') : null;
