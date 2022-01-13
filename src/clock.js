import React from "react";
import { css } from "glamor";
import moment from "moment";

const style = {
  clock: css({
    color: "white",
    fontSize: "5rem",
    padding: "2rem",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  })
};

export default () => {
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const refreshTime = () => {
      const n = new Date();
      setDate(n);
      setTimeout(refreshTime, 1000);
    };
    refreshTime();
  }, []);

  return <h1 {...style.clock}>{moment(date).format("LT")}</h1>;
};
