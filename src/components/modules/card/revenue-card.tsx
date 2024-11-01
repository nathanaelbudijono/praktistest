import Typography from "@/components/ui/typography";
import { formatToIDR } from "@/lib/helper";
import { RevenueCardProps } from "@/types/types";

const RevenueCard = ({
  title,
  description,
  info,
  currency,
  icon: Icon,
  color,
}: RevenueCardProps) => {
  return (
    <div className="border w-full pr-4 rounded-md shadow-sm flex items-center gap-5 h-36 max-md:h-32">
      <div
        className="w-20 h-full relative rounded-l-md px-4"
        style={{
          backgroundColor: `rgba(${parseInt(color.slice(0, 2), 16)}, ${parseInt(
            color.slice(2, 4),
            16
          )}, ${parseInt(color.slice(4, 6), 16)}, 0.2)`,
        }}
      >
        <Icon
          strokeWidth={1}
          style={{ color: `#${color}` }}
          size={10}
          className="absolute w-8 h-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-md:w-6 max-md:h-6"
        />
      </div>
      <div className="py-3 space-y-1">
        <Typography variant="label">{title}</Typography>
        <Typography variant="h3" className="text-nowrap">
          {currency ? `${formatToIDR(info)}` : `${info}`}
        </Typography>
        {description && (
          <Typography variant="p" color="muted">
            {description}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default RevenueCard;
