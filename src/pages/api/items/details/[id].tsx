import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { itemProps } from "@/types/database-types";

const itemsDetailHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const id = req.query.id;
    const filePath = path.join(process.cwd(), "public", "database.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    const itemDetail = data.Items.find((item: itemProps) => item.name === id);
    if (itemDetail) {
      res
        .status(200)
        .json({ itemDetail, message: "Item detail found", status: true });
    } else {
      res.status(404).json({ message: "Item not found!", status: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred!", status: false });
  }
};
export default itemsDetailHandler;
