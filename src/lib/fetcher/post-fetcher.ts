import { toast } from "@/hooks/use-toast";
import { fetchLogin } from "../api/post-api";

export const handleFetchLogin = async ({
  name,
  type,
}: {
  name: string;
  type: string;
}): Promise<boolean | undefined> => {
  try {
    const data = await fetchLogin({ name, type });
    if (data) {
      if (data.status === true) {
        document.cookie = `name = ${name}; path=/; max-age=86400`;
        localStorage.setItem("name", JSON.stringify(name));
        localStorage.setItem("type", JSON.stringify(type));
        toast({
          title: `${name} account created successfully`,
          description: data.message,
        });
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Failed to add create account",
          description: data.message,
        });
        return false;
      }
    } else {
      toast({
        variant: "destructive",
        title: "Failed to add create account",
        description: "Data is empty",
      });
      return undefined;
    }
  } catch (err) {
    toast({
      variant: "destructive",
      title: "Something went wrong",
    });
    console.log(err);
    return undefined;
  }
};
