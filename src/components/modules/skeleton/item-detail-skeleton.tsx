import Layout from "@/components/ui/layout/layout";
import { Skeleton } from "@/components/ui/skeleton";

const ItemDetailSkeleton = () => {
  return (
    <Layout>
      <Skeleton className="w-full h-20 mb-5" />
      <main className="h-screen">
        <section className="mt-5">
          <Skeleton className="w-4 h-4" />
        </section>
        <section className="mt-5 flex h-screen max-tablet:h-full gap-5">
          <div className="w-1/2 max-lg:hidden">
            <Skeleton className="w-full h-[500px]" />
          </div>
          <div className="w-1/2 flex flex-col max-lg:w-full">
            <Skeleton className="w-full h-[500px]" />
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ItemDetailSkeleton;
