import { API_URL } from "@/constant/env";

export const fetchLogin = async ({
  name,
  type,
}: {
  name: string;
  type: string;
}): Promise<successLoginProps | errorLoginProps | undefined> => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ name, type }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
