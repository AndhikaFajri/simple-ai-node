import express from "express";
import path from "path";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

// Static folder untuk frontend
app.use(express.static(path.join(__dirname, "public")));

// Endpoint untuk memanggil AI
app.get("/api/ai", async (req, res) => {
    try {
        const response = await fetch("https://api.replicate.com/v1/models/ibm-granite/granite-3.3-8b-instruct/predict", {
            method: "POST",
            headers: {
                "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                input: {
                    prompt: "Halo, perkenalkan dirimu singkat saja!"
                }
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Gagal memanggil API", detail: err.message });
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
