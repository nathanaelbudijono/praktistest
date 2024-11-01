import { Skeleton } from "@/components/ui/skeleton";

const ManageItemSkeleton = () => {
  return (
    <main>
      <Skeleton className="w-[25%] h-12" />
      <section className="mt-5">
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, index) => {
            return <Skeleton key={index} className="w-full h-10" />;
          })}
        </div>
      </section>
      <section className="mt-5">
        <div className="grid grid-cols-1 gap-3 tablet:grid-cols-2  lg:grid=cols-3 xl:grid-cols-4">
          {Array.from({ length: 5 }).map((_, index) => {
            return <Skeleton key={index} className="w-full h-52" />;
          })}
        </div>
      </section>
    </main>
  );
};

export default ManageItemSkeleton;
