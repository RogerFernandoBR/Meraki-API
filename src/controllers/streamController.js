const fs = require("fs");
const File = require("../models/fileSchema");
const { index } = require("./userController");

module.exports = {
    async stream(req, res) {
        // Get the file id from request
        const {
            id
        } = req.params;
        
        //Find the file register by id
        const file = await File.findById(id);

        // If there isn't the the data return error
        if (!file.user || !file.course || !file.lesson) return res.status(404).send({ errors: { MongoError: "Dados insuficientes!" } })

        // Mount the path
        const path = `./uploads/${file.user}/${file.course}/${file.lesson}/${file.path}`;

        try {
            // Save information abaut the file in a constant
            const stat = fs.statSync(path);

            // Save the total size of the file
            const total = stat.size;

            //Just for debug the requests
            console.log(req.headers);

            // If there is a range in request headers
            if (req.headers.range) {

                //get the range from headers
                const { range } = req.headers;

                // remove the string "bytes=" from the begining of headers range and split by "-"
                const parts = range.replace(/bytes=/, "").split("-");

                // save the start in a constant as a string
                const partialstart = parts[0];

                // save the end in a constant as a string
                const partialend = parts[1];

                // Save the start as a integer (decimal base)
                const start = parseInt(partialstart, 10);

                // Save the end as a integer (decimal base)
                const end = partialend ? parseInt(partialend, 10) : total - 1;

                // The totl size of the particial content save in a constant
                const chunksize = (end - start) + 1;

                //Just for debug the requests
                console.log(`RANGE: ${start} - ${end} = ${chunksize}`);

                // Create a read stream from path with the start to the end of partial range
                const file = fs.createReadStream(path, { start, end });

                // Write in response the partial content stream information
                res.writeHead(206, {
                    "Content-Range": `bytes ${start}-${end}/${total}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunksize,
                    "Content-Type": "video/mp4",
                });

                // Include in the response the partial file stream
                file.pipe(res);
            // If there is no range in request headers, then return all the file
            } else {
                //Just for debuging
                console.log(`ALL: ${total}`);

                // Writing the response with the lenght and type of content
                res.writeHead(200, {
                    "Content-Length": total,
                    "Content-Type": "video/mp4"
                });

                // Include the stream of intire file on response
                fs.createReadStream(path).pipe(res);
            }
        } catch (err) {
            return res.send({ errors: { erro: err } });
        }
    }
};
