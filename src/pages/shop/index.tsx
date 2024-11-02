import ShopComponent from "@/components/pages/shop/shop-component";
import Seo from "@/components/ui/seo";

const ShopPage = () => {
  return (
    <main>
      <Seo templateTitle="Shop" />
      <ShopComponent />
    </main>
  );
};

export default ShopPage;
