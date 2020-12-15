export const useLocalStorageTheme = (key) => {
  const currentTheme = localStorage.getItem(key);
  return { currentTheme };
};
