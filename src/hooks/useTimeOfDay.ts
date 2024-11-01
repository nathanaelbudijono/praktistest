import * as React from "react";

const useTimeOfDay = (): string => {
  const [timeOfDay, setTimeOfDay] = React.useState<string>("morning");

  const getTimeOfDay = () => {
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 12) {
      setTimeOfDay("morning");
    } else if (hours >= 12 && hours < 18) {
      setTimeOfDay("afternoon");
    } else if (hours >= 18 && hours < 21) {
      setTimeOfDay("evening");
    } else {
      setTimeOfDay("night");
    }
  };

  React.useEffect(() => {
    getTimeOfDay();
    const interval = setInterval(getTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  return timeOfDay;
};

export default useTimeOfDay;
