import Layout from "@/components/ui/layout/layout";
import Link from "next/link";

const IndexComponent = () => {
  return (
    <Layout>
      <h1>test</h1>
      <Link href="/admin/dashboard">admin</Link>
    </Layout>
  );
};

export default IndexComponent;
