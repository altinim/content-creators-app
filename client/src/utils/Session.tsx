export const checkSessionStorageKey = (key: string): boolean => {
	const value = sessionStorage.getItem(key);
	return value !== null;
};
export const getSessionStorageKey = (key: string): string | null => {
	return sessionStorage.getItem(key);
};export const removeSessionStorageKey = (key: string): void => {
	sessionStorage.removeItem(key);
};
export const clearSession = (): void => {
	sessionStorage.clear();
};
export const setSessionStorageKey = (key: string, value: string): void => {
	sessionStorage.setItem(key, value);
};
