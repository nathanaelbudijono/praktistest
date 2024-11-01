import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

const transactionHandler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const filePath = path.join(process.cwd(), "public", "database.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    res.status(200).json(data.Transaction);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred!" });
  }
};

export default transactionHandler;
