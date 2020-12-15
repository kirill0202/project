import { DARK, LIGHT, theme } from "./consts";

export const mainReducer = (state, action) => {
  switch (action.type) {
    case LIGHT:
      if (localStorage.getItem("theme") == "dark") {
        localStorage.removeItem("theme");
        localStorage.setItem("theme", "light");
      }
      return { ...state, theme: theme.light };
    case DARK:
      if (localStorage.getItem("theme") == "light") {
        localStorage.removeItem("theme");
        localStorage.setItem("theme", "dark");
      }
      return { ...state, theme: theme.dark };
    default:
      return state;
  }
};
