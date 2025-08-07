// lib/utils.ts

import { type ClassValue, clsx } from "clsx";

/**
 * Merge Tailwind CSS class names conditionally.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
