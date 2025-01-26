import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// tailwind classes merged with clsx including conditional classes and class conflicts are handled by twMerge
export const twc= (...classes: ClassValue[])=>{
    return twMerge(clsx(...classes))
}