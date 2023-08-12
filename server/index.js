import express from "express";
import cors from "cors";
import multer from "multer";
import { resolve } from "path";
import { v4 } from "uuid";
// import { OpenAIApi, Configuration } from "openai"
import fs from "fs"

const app = express();

const API_KEY = "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";

// const configuration = new Configuration({
//     apiKey: API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const d = fs.readFileSync('data.json');
const data = JSON.parse(d);

const product = data.product.data.map(item => ({
    "tên sản phẩm": item.name,
    "giá sản phẩm": item.price,
    // "mô tả sản phẩm": item.description
}));

// console.log(product);

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
    const arr = [];
    for (let i = 0; i < 10; i++) {
        arr.push(`${v4()}_${v4()}`.replace(/-/g, ""))
    }
    return res.status(200).json({
        result: "success",
        data: arr
    })
});

// app.post("/api/v1/chat", async (req, res) => {

//     const { message } = req.body;
//     console.log("message", message);

//     if (!message) {
//         return res.status(200).json({
//             result: "success",
//             message: ""
//         })
//     }

//     const messages = [
//         { role: "user", content: `Tôi là mọt người bán hàng, mỗi sản phẩm trong cửu hàng bao gồm các thông tin: tên sản phẩm, giá sản phẩm. Đây là thông tin json về các sản phẩm của tôi: ${JSON.stringify(product.slice(0, 4))}. Bạn hãy lấy ra sản phẩm có giá cao nhất.` }
//     ]

//     console.log(messages);

//     const chatCompletion = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         // messages: [{ role: "user", content: message }],
//         messages: messages,
//     });

//     return res.status(200).json({
//         result: "success",
//         message: chatCompletion.data.choices[0].message.content
//     })
// })

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