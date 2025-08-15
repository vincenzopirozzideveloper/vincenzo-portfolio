import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isMobileDevice(): boolean {
  return window.innerWidth <= 768;
}

export function useIsMobile(): boolean {
  return isMobileDevice();
}
