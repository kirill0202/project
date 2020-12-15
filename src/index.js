import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Howl } from "howler";
import "./resetCss/reset.css";
import "./fonts/fonts.css";
import "./index.css";
import soundMP3 from './assets/sounds/Aqua_Drib1.mp3'

const sound = new Howl({
  src: [soundMP3],
  autoplay: false,
  preload: true,
  onplayerror: function () {
    sound.once("unlock", function () {
      sound.play();
    });
  },
});
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App sound={sound} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
