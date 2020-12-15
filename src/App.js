import { Box } from "@material-ui/core";
import React, {  useReducer, useState } from "react";
import {  Route, Switch } from "react-router-dom";
import Login from "./components/Auth/Login/Login.jsx";
import  Register  from "./components/Auth/Register/Register.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import MainHeader from "./components/MainPage/header/MainHeader.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";
import { ThemeContext } from "./context/themeContext.js";
import { useLocalStorageTheme } from "./hooks/useLocalStorageTheme.js";
import { DARK, LIGHT, theme } from "./state/consts.js";
import { mainReducer } from "./state/mainReducer.js";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./config/reducer";

function App({ sound, flag }) {
  const { currentTheme } = useLocalStorageTheme("theme");

  const initialState = {
    theme: currentTheme === "light" ? theme.light : theme.dark,
  };

  const [state, dispatch] = useReducer(mainReducer, initialState);
  document.body.style.backgroundColor = state.theme;

  const themeChanger = () => {
    dispatch({
      type: state.theme === theme.light ? DARK : LIGHT,
    });
    document.body.style.backgroundColor = state.theme;
  };

  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return (
    <>
      <ThemeContext.Provider value={{ currentTheme }}>
      <Provider store={store}>
        <MainHeader themeChanger={themeChanger} />

        <Box pt={8} style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            maxHeight: "100%",
            padding:'0px'
          }}>

          <Switch>
            <Route path="/" exact>
              <MainPage themeChanger={themeChanger} sound={sound}/>
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/dashboard" exact>
              <Dashboard />
            </Route>
          </Switch>
        </Box>
        </Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
