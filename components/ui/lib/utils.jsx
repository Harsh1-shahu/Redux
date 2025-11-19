// lib/utils.js
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and resolves Tailwind conflicts using twMerge
 * @param  {...any} inputs - class name values (strings, conditionals, etc.)
 * @returns {string} - merged className string
 */
export function cn(...inputs) {
    return twMerge(clsx(...inputs));
}
