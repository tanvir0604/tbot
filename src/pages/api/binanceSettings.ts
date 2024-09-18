// pages/api/binanceSettings.ts
import { NextApiRequest, NextApiResponse } from "next";
import BinanceSettings from "@/lib/models/BinanceSettings";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const binanceSetting = new BinanceSettings();

  switch (req.method) {
    case "POST":
      return handlePost(req, res, binanceSetting);
    case "GET":
      return handleGet(req, res, binanceSetting);
    case "PUT":
      return handlePut(req, res, binanceSetting);
    case "DELETE":
      return handleDelete(req, res, binanceSetting);
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse, binanceSetting: BinanceSettings) {
    const { apiKey, apiSecret } = req.body;

    if (!apiKey || !apiSecret) {
        return res.status(400).json({ message: "API Key and Secret are required." });
    }

    // Default authorId for now (you will use the session later)
    const authorId = 1;

    try {
        const userBinanceSettings = await binanceSetting.updateOrCreateItems(
        { authorId },
        { apiKey, apiSecret },
        { authorId, apiKey, apiSecret }
        );

        res.status(200).json({ message: "Settings saved successfully!", data: userBinanceSettings });
    } catch (error) {
        console.error("Error updating or creating Binance settings:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, binanceSetting: BinanceSettings) {

    const authorId = 1;

    try {
        const userBinanceSettings = await binanceSetting.getItemDetailsById(authorId);
        res.status(200).json({ message: "Data Found!", data: userBinanceSettings });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse, binanceSetting: BinanceSettings) {
  // Implement your PUT logic here
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse, binanceSetting: BinanceSettings) {
  // Implement your DELETE logic here
}
