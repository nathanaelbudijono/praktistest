import * as React from "react";

const useBarWidth = (): number => {
  const [barWidth, setBarWidth] = React.useState<number>(490);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1750 && window.innerWidth >= 1600) {
        setBarWidth(350);
      } else if (window.innerWidth < 1600 && window.innerWidth >= 1400) {
        setBarWidth(260);
      } else {
        setBarWidth(490);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return barWidth;
};

export default useBarWidth;
