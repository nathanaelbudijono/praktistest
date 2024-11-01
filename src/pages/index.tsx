import IndexComponent from "@/components/pages/index/index-component.";
import Seo from "@/components/ui/seo";

const IndexPage = () => {
  return (
    <main>
      <Seo templateTitle="Home" />
      <IndexComponent />
    </main>
  );
};

export default IndexPage;
