import ItemDetailComponent from "@/components/pages/shop/item-detail-component";
import Seo from "@/components/ui/seo";
import { capitalizeFirstLetter } from "@/lib/helper";
import { useRouter } from "next/router";

const ItemsDetailsPage = () => {
  const router = useRouter();
  const item = router.query.id as string;
  if (!item) {
    return <div>Loading..</div>;
  }
  return (
    <main>
      <Seo
        templateTitle={`${item ? capitalizeFirstLetter(item) : ""} Details`}
      />
      <ItemDetailComponent item={item} />
    </main>
  );
};

export default ItemsDetailsPage;
