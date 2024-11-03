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
import { getFingerGame, getRandomNumber } from "@/lib/games";
import { toast } from "@/hooks/use-toast";

const FingerGamesDialog = () => {
  const [answer, setAnswer] = React.useState<string>("");
  const [number, setNumber] = React.useState<number>(7);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finger = getFingerGame(number);

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
      <DialogTrigger>Finger Guest</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Finger Guest</DialogTitle>
          <DialogDescription>
            Count fingers in a unique back and for pattern! Start with your
            thumb and when you reach pinky, reverse the direction. Keep counting
            up yo your chosen number to see which finger you land on.
          </DialogDescription>
        </DialogHeader>
        <section className="space-y-5">
          <Typography variant="p">
            My number is {number}, what finger do i land on?
          </Typography>
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <Input
              placeholder="Guest my finger.."
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

export default FingerGamesDialog;
