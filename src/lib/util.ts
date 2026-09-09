export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]