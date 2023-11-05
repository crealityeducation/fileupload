const express = require("express");
const fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");

process.env.TZ = "Asia/Kolkata";

console.info("**** fileupload started ****");
const port = 3033;
const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
    bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true,
    })
);

app.use(fileUpload());
//setting view engine to ejs
app.set("view engine", "ejs");
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/images", express.static(__dirname + "/public/images"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * routers for html template
 */
app.get("/", async (req, res) => {
    res.render("fileupload");
});

/**
 * File Upload & Download
 */
app.post("/upload", function (req, res) {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    console.log(Object.keys(req.files.sampleFile).length)
    if (Array.isArray(req.files.sampleFile)) {
        req.files.sampleFile.forEach(o => {
            // sampleFile = o.sampleFile;
            uploadPath = __dirname + "/dwnld/" + o.name;

            // Use the mv() method to place the file somewhere on your server
            o.mv(uploadPath, function (err) {
                if (err) return res.status(500).send(err);

            });
        })
    } else {
        uploadPath = __dirname + "/dwnld/" + req.files.sampleFile.name;

        // Use the mv() method to place the file somewhere on your server
        req.files.sampleFile.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);
        })
        res.send("File uploaded!");
    }
})

app.get("/download", function (req, res) {
    const file = `${__dirname}/dwnld/${req.query.filename}`;
    res.download(file); // Set disposition and send it.
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})