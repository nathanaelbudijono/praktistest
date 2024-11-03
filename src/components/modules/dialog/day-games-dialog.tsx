import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { getDayGame, getFingerGame, getRandomNumber } from "@/lib/games";
import { toast } from "@/hooks/use-toast";

const DayGameDialog = () => {
  const [answer, setAnswer] = React.useState<string>("");
  const [number, setNumber] = React.useState<number>(2);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finger = getDayGame(number);

    const isCorrect = finger.toLowerCase() === answer.toLowerCase();

    if (isCorrect) {
      toast({
        title: "Correct, cheers!",
      });
      setNumber(getRandomNumber());
      setAnswer("");
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect, try again!",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger>Day Guest</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Day Guest</DialogTitle>
          <DialogDescription>
            A number is given, the challenge is to figure out the day of the
            week it will be that many days from today.
          </DialogDescription>
        </DialogHeader>
        <section className="space-y-5">
          <Typography variant="p">
            My number is {number}, what day do i land on?
          </Typography>
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <Input
              placeholder="Guest day.."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />{" "}
            <Button type="submit">Submit</Button>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default DayGameDialog;
