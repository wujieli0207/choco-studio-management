const porjectName = import.meta.env.VITE_GLOB_APP_TITLE;

export function warn(message: string) {
  console.warn(`[${porjectName} warn]:${message}`);
}

export function error(message: string) {
  throw new Error(`[${porjectName} error]:${message}`);
}
