import React, { useState } from "react";
import Smile from "./Smile";
import { makeStyles, withWidth } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles({
  smileOverlay: {
    position: "absolute",
    height:'100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow:'hidden',
  },
});

const SmileRain = ({ width, sound }) => {
  const classes = useStyles();

  const phrases = [
    { phrase: "бурж робит🌐" },
    { phrase: "СНГ есть❓" },
    { phrase: "базы выдаёте?👁‍🗨" },
    { phrase: "от куда траф?🔍" },
    { phrase: "топы здесь✅" },
    { phrase: "домены в бане⛔️" },
    { phrase: "админам привет🖐" },
    { phrase: "смените домены❗️❗️❗️" },
    { phrase: `KZ принимайте?` },
    { phrase: "платёжка робит💲" },
    { phrase: "биллинг дал добро♻️" },
    { phrase: "просьба снять трафик🙏" },
    { phrase: "займите на траф😞" },
    { phrase: "где скрипт автозамены ссылок❓" },
    { phrase: "базы нужны🧾" },
    { phrase: "когда выплата📅" },
    { phrase: "уменьшите минималку📉" },
    { phrase: "пуши рип😵" },
    { phrase: "старые ссылки также работают📢" },
    { phrase: "редики сдохли🏴‍☠️" },
    { phrase: "клоаке кто научит❓" },
    { phrase: "тема жива❓" },
    { phrase: "кто льёт через фб❓" },
    { phrase: "а что так можно было?😅" },
    { phrase: "слил схему😁" },
    { phrase: "где кнопка бабло❓💰" },
    { phrase: "одну красноту выдаёт❌" },
    { phrase: "сегодня были выплаты❓" },
    { phrase: "снг туго идёт🆘" },
    { phrase: "новучите лить🤗" },
    { phrase: "понижение комиссии будет❓📉" },
    { phrase: "норм идут на оплату🤑" },
    { phrase: "скок проходка по РУ📊" },
    { phrase: "продам зенку📢" },
    { phrase: "почисти кеш❗️📢❗️" },
    { phrase: "шейвите?😆" },
    { phrase: "где взять рефку❗️❓" },
  ];

  let countOfPhrases = 15;
  if (width === "sm" || width === "xs") {
    countOfPhrases = 9;
  }

  const durations = [
    7.5,
    16,
    7,
    13,
    15.5,
    10,
    9,
    15,
    8,
    12.5,
    9.5,
    14.5,
    11.5,
    8.5,
  ];

  const lefts = [
    6,
    9.07,
    86,
    21.21,
    65.63,
    35.35,
    42.42,
    49.49,
    56.56,
    30.28,
    70.7,
    77.77,
    14.14,
    80,
  ];

  const renderPhrases = (phrases) => {
    const elements = [];

    for (let i = 1; i <= countOfPhrases; i++) {
      const phrase = phrases[Math.floor(Math.random() * phrases.length)].phrase;
      const left = lefts[i - 1];
      const duration = durations[i - 1];
      const id = uuidv4();
      const element = (
        <Smile
          id={id}
          phrase={phrase}
          left={left}
          duration={duration}
          sound={sound}
        />
      );
      elements.push(element);
    }

    return elements;
  };

  const [items, setItems] = useState(renderPhrases(phrases));

  return <div className={classes.smileOverlay}>{items}</div>;
};

export default withWidth()(SmileRain);
