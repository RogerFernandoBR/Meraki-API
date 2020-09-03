const fs = require("fs");

module.exports = {

    async show(req, res) {
        const {
            user, course, lesson, sequence, ext
        } = req.params;
        const path = `./uploads/${user}/${course}/${lesson}/${sequence}.${ext}`;
        const stat = fs.statSync(path);
        const total = stat.size;

        try {
            console.log(req.headers);
            if (req.headers.range) {
                const { range } = req.headers;
                const parts = range.replace(/bytes=/, "").split("-");
                const partialstart = parts[0];
                const partialend = parts[1];

                const start = parseInt(partialstart, 10);
                const end = partialend ? parseInt(partialend, 10) : total - 1;
                const chunksize = (end - start) + 1;
                console.log(`RANGE: ${start} - ${end} = ${chunksize}`);

                const file = fs.createReadStream(path, { start, end });
                res.writeHead(206, {
                    "Content-Range": `bytes ${start}-${
                        end}/${total}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunksize,
                    "Content-Type": "video/mp4"
                });
                file.pipe(res);
            } else {
                console.log(`ALL: ${total}`);
                res.writeHead(200, {
                    "Content-Length": total,
                    "Content-Type": "video/mp4"
                });
                fs.createReadStream(path).pipe(res);
            }
        } catch (err) {
            return res.send({ errors: { erro: err } });
        }
    }
};
