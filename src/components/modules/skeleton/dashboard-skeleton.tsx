import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <main className="w-full">
      <section className="flex gap-7 max-md:flex-col">
        <section className="w-1/2 max-dashboard:w-full flex gap-4 max-dashboard:flex-col">
          <div className="w-full grid grid-cols-1 gap-2 max-md:grid max-md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => {
              return <RevenueSkeleton key={index} />;
            })}
          </div>
          <Skeleton className="w-full max-md:h-[30vh]" />
        </section>
        <section className="w-1/2 max-dashboard:w-full">
          <div className="h-full grid grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, index) => {
              return <BestSellingSkeleton key={index} />;
            })}
          </div>
        </section>
      </section>
      <section className="flex mt-5 gap-7 h-[32vh]">
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
      </section>
    </main>
  );
};

export default DashboardSkeleton;

const RevenueSkeleton = () => {
  return <Skeleton className="h-36 max-md:h-32 w-full" />;
};
const BestSellingSkeleton = () => {
  return <Skeleton className="w-full h-full" />;
};
