import React, { useContext, useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { makeStyles } from "@material-ui/core/styles";
import amber from "@material-ui/core/colors/amber";
import { ThemeContext } from "../../../../context/themeContext";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 42,
    width: 42,
    borderRadius: theme.spacing(1),
    fontSize: "32px",
    borderWidth: "2px",
    borderColor: "#1a202c",
    borderStyle: "solid",
    alignItems:'center',
    padding:'0px'
  },
}));

export const ThemeChanger = ({ themeChanger }) => {
  const classes = useStyles();

  const { currentTheme } = useContext(ThemeContext);

  const [icon, setIcon] = useState(
    currentTheme === "dark" ? "WbSunnyIcon" : "Brightness2Icon"
  );

  const [stylesForIcon, setStylesForIcon] = useState({
    backgroundColor: "#1a202c",
    "&:hover": {
      backgroundColor: "#354159",
    },
    color: "#EFEFF0",
  });

  useEffect(() => {
    if (currentTheme === "dark") {
      setStylesForIcon((prev) => ({
        ...prev,
        backgroundColor: "#1a202c",
        // "&:hover": { backgroundColor: "#CED7EB" },
        color: amber[600],
        border:'none'
      }));
    } else {
      setStylesForIcon((prev) => ({
        ...prev,
        backgroundColor: "#f5f5f5",
        // "&:hover": { backgroundColor: "#354159" },
        color: "#1a202c",
        border:'none'
      }));
    }
  }, [currentTheme]);

  const themeHandler = () => {
    setIcon(currentTheme === "light" ? "WbSunnyIcon" : "Brightness2Icon");
    themeChanger();
  };

  return (
    <IconButton
      className={classes.root}
      style={{ ...stylesForIcon }}
      onClick={themeHandler}
    >
      {icon === "Brightness2Icon" ? <Brightness2Icon /> : <WbSunnyIcon />}
    </IconButton>
  );
};
