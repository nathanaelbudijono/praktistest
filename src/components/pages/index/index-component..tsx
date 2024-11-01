import Header from "@/components/modules/header";
import { Button } from "@/components/ui/button";
import Layout from "@/components/ui/layout/layout";
import Typography from "@/components/ui/typography";
import { BASE_URL } from "@/constant/env";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/router";

const IndexComponent = () => {
  const router = useRouter();
  return (
    <Layout>
      <Header />
      <section className="mt-5 h-screen flex items-center justify-between">
        <section className="w-1/2 max-tablet:w-full">
          <div className="border-l-[10px] rounded-md border-primary px-4 space-y-5">
            <Typography variant="h1">Spice your Style</Typography>
            <Typography variant="h2">Catch the island vibe</Typography>
          </div>
          <Typography variant="h4" className="mt-5 tracking-wide leading-loose">
            The Islander Shop offers a carefully curated selection of
            coastal-inspired clothing and accessories designed to capture the
            relaxed, breezy vibe of island living. Each item in our collection
            reflects the essence of seaside style.
          </Typography>
          <div className="mt-5 space-x-3 max-md:space-x-2 max-sm:space-x-1">
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                toast({
                  title: "Dummy Button",
                  description: "Please press View Dashboard",
                });
              }}
            >
              Explore Shops
            </Button>
            <Button
              size="lg"
              onClick={() => {
                router.push(`${BASE_URL}/admin/dashboard`);
              }}
            >
              View Dashboard
            </Button>
          </div>

          <div className="mt-5">
            <Typography variant="p" className="font-semibold">
              Enjoy discound
            </Typography>
            <Typography variant="p" color="muted">
              Get 10% off your first purchase when you sign up for our
              newsletter
            </Typography>
          </div>
        </section>
        <section className="relative w-1/2 max-tablet:hidden">
          <img
            src="/assets/background.jpg"
            alt="background"
            className="object-cover"
          />
        </section>
      </section>
    </Layout>
  );
};

export default IndexComponent;
