import React, { useEffect, useState, useContext } from "react";
import { makeStyles, withWidth } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import "./smile.scss";
import { ThemeContext } from "../../context/themeContext";
import { theme } from "../../state/consts";

const useStyles = makeStyles((theme) => ({
  smileObj: {
    zIndex: 99,
    position: "absolute",
    maxHeight: "100%",
    textAlign: "center",
    fontFamily: "RobotoBold",
    textTransform: "uppercase",
    padding: '0px',
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const Smile = ({ id, phrase, duration, sound, left, width }) => {
  const classes = useStyles();
  const { currentTheme } = useContext(ThemeContext);
  //Audio
  const [audioFlag, setAudioFlag] = useState(true);

  //inProp CSSTransition
  const [inProp, setInProp] = useState(false);

  //Show Message
  const [showMessage, setShowMessage] = useState(true);
  //Пробег по всем смайлам и назначение им скорости анимации
  useEffect(() => {
    document
      .querySelector(`.smile${id}`)
      .style.setProperty("--duration", duration + "s");
  }, []);

  // За 0.01 секунду до окончания анимации все
  //флаги приходят в норму, чтобы снова адекватн опоказать фразу
  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage(true);
      setAudioFlag(true);
      setInProp(false);
    }, duration * 1000 - 1);
    return () => clearInterval(interval);
  }, []);

  //При клике на фразу происходит исчезновение и звук щелчка
  const smileHandler = () => {
    setInProp(true);
    if (audioFlag) {
      sound.play();
      setAudioFlag(false);
    }
  };

  return (
    <CSSTransition
      timeout={300}
      appear={true}
      classNames="alert"
      in={inProp}
      onEntered={() => setShowMessage(false)}
    >
      <div
        onClick={smileHandler}
        duration={duration}
        className={classes.smileObj + " " + `smile webkit smile${id}`}
        style={{
          left: `${left}%`,
          width: width === "xs" ? "4%" : "6%",
          color: '#f9b942',
          fontSize:
            width === "xs"
              ? 18
              : width === "sm"
              ? 21
              : width === "md"
              ? 22
              : 23,
        }}
      >
        {showMessage ? phrase : ""}
      </div>
    </CSSTransition>
  );
};

export default withWidth()(Smile);
