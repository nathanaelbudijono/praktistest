import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { buyersProps, transactionProps } from "@/types/database-types";
import { cartProps } from "@/types/cart-types";

const transactionHandler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        const filePath = path.join(process.cwd(), "public", "database.json");
        const fileContents = fs.readFileSync(filePath, "utf8");
        const data = JSON.parse(fileContents);

        res.status(200).json(data.Transaction.reverse());
        break;
      case "POST":
        const carts: cartProps[] = req.body;

        if (!Array.isArray(carts) || carts.length === 0) {
          return res.status(400).json({ message: "Invalid cart data!" });
        }

        const jsonFilePath = path.join(
          process.cwd(),
          "public",
          "database.json"
        );

        fs.readFile(jsonFilePath, "utf8", (err, data) => {
          if (err) {
            return res.status(500).json({
              message: "Error reading data, transaction failed!",
              status: false,
            });
          }

          const jsonData = JSON.parse(data);

          const addedTransactions: transactionProps[] = [];

          for (const { item, qty, buyer } of carts) {
            if (!item || !qty || !buyer) {
              return res
                .status(400)
                .json({ message: "Missing fields in cart object!" });
            }

            const checkBuyer = jsonData.Buyers.find(
              (buyerObj: buyersProps) => buyerObj.name === buyer
            );

            if (!checkBuyer) {
              return res.status(400).json({
                message: `${buyer} does not exist, transaction failed!`,
                status: false,
              });
            }

            jsonData.Transaction.push({ item, qty, buyer });
            addedTransactions.push({ item, qty, buyer });
          }

          fs.writeFile(
            jsonFilePath,
            JSON.stringify(jsonData, null, 2),
            (err) => {
              if (err) {
                return res.status(500).json({
                  message: "Error writing data, transaction failed!",
                  status: false,
                });
              }
              res.status(200).json({
                message: "Transactions added successfully",
                status: true,
                transactions: addedTransactions,
              });
            }
          );
        });
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred!" });
  }
};

export default transactionHandler;
