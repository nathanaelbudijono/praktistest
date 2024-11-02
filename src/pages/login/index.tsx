import LoginComponent from "@/components/pages/login/login-component";
import Seo from "@/components/ui/seo";

const LoginPage = () => {
  return (
    <main>
      <Seo templateTitle="Login" />
      <LoginComponent />
    </main>
  );
};

export default LoginPage;
