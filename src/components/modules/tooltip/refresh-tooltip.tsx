import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RefreshCcw } from "lucide-react";

const RefreshToolTip = ({
  getAllData,
}: {
  getAllData: () => Promise<void>;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              getAllData();
            }}
            variant="ghost"
          >
            <RefreshCcw strokeWidth={1} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Refresh</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default RefreshToolTip;
