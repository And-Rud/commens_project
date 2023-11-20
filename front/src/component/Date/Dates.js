import React from "react";

const Dates = ({ time }) => {
  let dates = "";

  function formatMinutes(minutes) {
    return minutes.toString().padStart(2, "0");
  }

  if (time) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = formatMinutes(minutes);
    dates = `${day}.${month}.${year}, ${hours}:${formattedMinutes} хв`;
  } else {
    dates = "00:00";
  }
  return <span>{dates}</span>;
};

export default Dates;
