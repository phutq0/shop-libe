; import express from "express";
import cors from "cors";
import multer from "multer";
import { resolve } from "path";
import { v4 } from "uuid";

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(express.static("./"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = file.fieldname.includes("image") ? "/upload/images" : "/upload/video";
        file.saveLocation = path;
        cb(null, resolve("." + path));
    },
    filename: function (req, file, cb) {
        const filename = (v4().replace(/-/g, "") + "_" + file.originalname).replace(/\s/g, "_");
        file.link = file.saveLocation + "/" + filename;
        cb(null, filename);
    }
})

const uploadFile = multer({ storage }).any()

app.get("/", async (req, res) => {

    return res.send("<h1>Hello World</h1>");
});

app.post("/api/v1/upload", uploadFile, async (req, res) => {
    const files = req.files;

    return res.status(200).json({
        result: "success",
        links: files ? files.map(i => i.link) : []
    });
});

app.listen(4000, () => {
    console.log("App is running at port 4000");
});