import React from "react";

const Dates = ({ time }) => {
  let dates = "";

  if (time) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    dates = `${day}.${month}.${year}, ${hours}:${minutes} хв`;
  } else {
    dates = "00:00";
  }
  return <span>{dates}</span>;
};

export default Dates;
