"use client";
import { useState } from "react";
import BinanceSettings from "@/lib/models/BinanceSettings";
import TradeSettings from "@/lib/models/TradeSettings";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<"binance_settings" | "trade_settings">("binance_settings");

  return (
    <div className="container mx-auto p-4">
        <div className="flex space-x-4 mb-4">
            <button
                className={`py-2 px-4 rounded-lg ${
                  activeTab === "binance_settings" ? "bg-primary text-white" : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("binance_settings")}
            >
              Binance Settings
            </button>
            <button
                className={`py-2 px-4 rounded-lg ${
                  activeTab === "trade_settings" ? "bg-primary text-white" : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("trade_settings")}
            >
              Trade Settings (Default)
            </button>
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
            {activeTab === "binance_settings" && <BinanceSettingsForm />}
            {activeTab === "trade_settings" && <TradeSettingsForm />}
        </div>
    </div>
  );
}

function BinanceSettingsForm() {
  const [formData, setFormData] = useState({ apiKey: "", apiSecret: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const response = await fetch("/api/binanceSettings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            alert("Settings saved successfully!");
        } else {
            console.error(result.message);
            alert("Error saving settings.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block mb-2">API Key</label>
            <input
              type="text"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
        </div>

        <div className="mb-4">
            <label className="block mb-2">API Secret</label>
            <input
              type="text"
              name="apiSecret"
              value={formData.apiSecret}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
        </div>

        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
            Submit
        </button>
    </form>
  );
}

function TradeSettingsForm() {
  const [formData, setFormData] = useState({
      leverageType: "0",
      leverageAmount: "",
      leverageMargin: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (name === "leverageAmount") {
          if (parseInt(value) > 20) {
              setError("Leverage amount cannot exceed 20x.");
          } else {
              setError("");
          }
      }
  
      setFormData({ ...formData, [name]: value });
      // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (error) {
        console.log(error);
        return;
      }
      else{
        console.log("Form 2 Submitted", formData);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block mb-2">Leverage Type</label>
            <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="leverageType"
                    value="0"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Cross
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    name="leverageType"
                    value="1"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Isolated
                </label>
            </div>
        </div>

        <div className="mb-4">
            <label className="block mb-2">Leverage Amount</label>
            <input
              type="number"
              name="leverageAmount"
              value={formData.leverageAmount}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            {error && <span className="text-red-500">{error}</span>}
            {!error && <span>Leverage amount can be max 20x</span>}
        </div>

        <div className="mb-4">
            <label className="block mb-2">Leverage Margin</label>
            <input
              type="number"
              name="leverageMargin"
              value={formData.leverageMargin}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
        </div>

        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
            Submit
        </button>
    </form>
  );
}
