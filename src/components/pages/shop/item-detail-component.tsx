import Header from "@/components/modules/header";
import Layout from "@/components/ui/layout/layout";
import { BASE_URL } from "@/constant/env";
import useCheckLogged from "@/hooks/use-check-logged";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const ItemDetailComponent = () => {
  const [name, type] = useCheckLogged();

  return (
    <Layout>
      <Header />
      <section className="mt-5">
        <Link href={`${BASE_URL}/shop`}>
          <ArrowLeft className="text-gray-500" />
        </Link>
      </section>
    </Layout>
  );
};

export default ItemDetailComponent;
