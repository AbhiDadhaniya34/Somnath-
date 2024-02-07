const express = require("express");
const multer = require("multer");
const path = require("path");
const { Pool } = require("pg");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "abhi2002",
  database: "somnath",
});

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.use(express.json());

// Image upload endpoint
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imageName = req.file.filename;
    const { billname } = req.body;

    // Save imageName in PostgreSQL database
    await pool.query("INSERT INTO images (name,billname) VALUES ($1,$2)", [
      imageName,
      billname,
    ]);

    res.json({ imageName });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Image search endpoint
app.get("/search", async (req, res) => {
  try {
    const { name } = req.query;
    const result = await pool.query(
      "SELECT name FROM images WHERE billname = $1",
      [name]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Image not found" });
    } else if (result.rows.length === 1) {
      // If there's only one row, return the single image
      res.json({ imageName: result.rows[0].name });
    } else {
      const imageNames = result.rows.map((row) => row.name);
      res.json({ imageNames });
    }
  } catch (error) {
    console.error("Error searching image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Image download endpoint
app.get("/download", async (req, res) => {
  try {
    const { name } = req.query;
    const imagePath = path.join(__dirname, "uploads", name);

    if (!fs.existsSync(imagePath)) {
      res.status(404).json({ error: "Image not found" });
    } else {
      const fileStream = fs.createReadStream(imagePath);
      res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Content-Disposition", `attachment; filename=${name}`);
      fileStream.pipe(res);
    }
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
