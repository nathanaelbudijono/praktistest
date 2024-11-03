import LoginForm from "@/components/modules/form/login-form";
import Header from "@/components/modules/header";
import Layout from "@/components/ui/layout/layout";
import Typography from "@/components/ui/typography";
import { BASE_URL } from "@/constant/env";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LoginComponent = () => {
  return (
    <Layout>
      <Header />
      <main className="mt-5 h-screen flex">
        <section className="relative w-1/2 bg-muted max-lg:hidden">
          <div className="flex flex-col px-6 pt-4 pb-20 items-start justify-between h-full ">
            <Link href={`${BASE_URL}`} className="z-10">
              <ArrowLeft className="text-gray-500" />
            </Link>
            <Typography variant="p" className="font-semibold z-10">
              &quot;Embrace your style with Islander Shop—where fashion meets
              the spirit of the sea!&ldquo;
            </Typography>
          </div>
          <Image
            fill
            priority
            alt="background"
            src="/assets/login-background.png"
            className="object-cover -z-0 opacity-20"
          />
        </section>
        <section className="w-1/2 flex flex-col justify-center items-center space-y-3 lg:space-y-4 lg:px-32 max-lg:w-full">
          <Typography variant="h2">Create an account</Typography>
          <Typography variant="p" color="muted">
            Enter your name below to create your account
          </Typography>
          <LoginForm />
          <Typography variant="p" color="muted">
            By clicking the button, you agree to our terms and conditions
          </Typography>
        </section>
      </main>
    </Layout>
  );
};

export default LoginComponent;
