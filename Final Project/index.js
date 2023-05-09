const express = require("express");
const moment = require("moment");
const morgan = require("morgan");
const finaltest = require("./mongodb");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Middleware untuk penanganan Log
const log = (req, res, next) => {
  console.log(`${moment().format("LLLL")} - ${req.ip} - ${req.originalUrl}`);
  next();
};
app.use(log);
app.use(morgan("combined"));

app.get("/matakuliah", async (req, res) => {
  const db = finaltest.db("finaltest");
  const matakuliah = await db.collection("matakuliah").find().toArray();
  res.json({ 
    status: "sukses", 
    message: "data berhasil didapatkan", 
    matakuliah });
});

app.get("/matakuliah/:kode", async (req, res) => {
  let kode = req.params.nim;
  const db = finaltest.db("finaltest");
  const matakuliah = await db.collection("matakuliah").find({ kode }).toArray();
  res.json({ 
    status: "sukses", 
    message: "data berhasil didapatkan", 
    matakuliah });
});

app.get("/matakuliah/nama/:nama", async (req, res) => {
  let nama = req.params.nama;
  const db = finaltest.db("finaltest");
  const matakuliah = await db.collection("matakuliah").find({ nama }).toArray();
  res.json({
    status: "sukses",
    message: "data berhasil didapatkan",
    matakuliah, });
});

app.post("/matakuliah", async (req, res) => {
  const db = finaltest.db("finaltest");
  const student = await db.collection("matakuliah").insertOne(req.body);
  res.json({
    status: "sukses",
    message: "data berhasil disimpan",
    matakuliah,
  });
});

app.delete("/matakuliah/:kode", async (req, res) => {
  let nim = req.params.kode;
  const db = finaltest.db("finaltest");
  const matakuliah = await db.collection("matakuliah").deleteOne({ kode });
  res.json({ 
    status: "sukses", 
    message: "data berhasil dihapus", 
    matakuliah });
});


app.put("/matakuliah/:kode", async (req, res) => {
  let kode = req.params.kode;
  const db = finaltest.db("finaltest");
  const matakuliah = await db.collection("matakuliah").updateOne({ kode });
  res.json({ 
    status: "sukses", 
    message: "data berhasil diupdate", 
    matakuliah });
});

//Middleware untuk 404
app.use((req, res, next) => {
  res.json({
    status: "error",
    kode: "404",
    message: "resource tidak ditemukan",
  });
});

//Middleware untuk error handling
app.use((err, req, res, next) => {
  res.json({
    status: "error",
    message: `terjadi kesalahan pada server: ${err}`,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});