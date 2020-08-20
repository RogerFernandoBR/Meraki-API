const multer = require("multer");
const crypto = require("crypto");
const { extname, resolve } = require("path");
const fs = require("fs");

const options = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let dir = "";

            if (req.body.thumb) {
                dir = resolve(__dirname, "..", "..", "uploads", req.body.user, req.body.cover, req.body.thumb);
            } else if (req.body.cover) {
                dir = resolve(__dirname, "..", "..", "uploads", req.body.user, req.body.cover);
            } else if (req.body.user) {
                dir = resolve(__dirname, "..", "..", "uploads", req.body.user);
            } else {
                dir = resolve(__dirname, "..", "..", "uploads/others");
            }

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            return cb(null, dir);
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, res) => {
                if (err) return cb(err);

                return cb(null, res.toString("hex") + extname(file.originalname));
            });
        }
    })
};

const upload = multer(options);

module.exports = upload.single("file");
