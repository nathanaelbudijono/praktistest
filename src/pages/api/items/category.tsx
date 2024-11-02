import { itemProps } from "@/types/database-types";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const categoryHandler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const filePath = path.join(process.cwd(), "public", "database.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    const categories = data.Items.map((item: itemProps) => item.type);
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred!" });
  }
};

export default categoryHandler;
