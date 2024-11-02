import { buyersProps } from "@/types/database-types";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const loginHandler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { name, type } = req.body;
      console.log(req.body);
      if (!name || !type) {
        return res
          .status(400)
          .json({ message: "Name and type are required", status: false });
      }

      const jsonFilePath = path.join(process.cwd(), "public", "database.json");

      fs.readFile(jsonFilePath, "utf8", (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error reading data", status: false });
        }

        const jsonData = JSON.parse(data);

        const checkBuyer = jsonData.Buyers.find(
          (item: buyersProps) => item.name === name
        );

        if (checkBuyer) {
          return res
            .status(400)
            .json({ message: "Buyer already exists", status: false });
        }

        jsonData.Buyers.push({ name, type });

        fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error writing data", status: false });
          }
          res.status(200).json({
            message: "Buyer added successfully",
            status: true,
            buyer: { name, type },
          });
        });
      });
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred!", status: false });
  }
};

export default loginHandler;
