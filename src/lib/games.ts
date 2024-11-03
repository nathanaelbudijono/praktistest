export const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 20) + 1;
};

export const getFingerGame = (number: number): string => {
  const fingers = ["thumb", "index", "middle", "ring", "pinky"];

  const positionInCycle = (number - 1) % 8;

  return positionInCycle < 5
    ? fingers[positionInCycle]
    : fingers[8 - positionInCycle];
};

export const getDayGame = (number: number): string => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const today = new Date();
  today.setDate(today.getDate() + number);

  return days[today.getDay()];
};
