"use client";

import useTimeOfDay from "@/hooks/useTimeOfDay";
import Typography from "../typography";

const ContentTitle = () => {
  const time = useTimeOfDay();
  return (
    <main>
      <Typography variant="h3">Good {time}, TIS Admin</Typography>
    </main>
  );
};

export default ContentTitle;
