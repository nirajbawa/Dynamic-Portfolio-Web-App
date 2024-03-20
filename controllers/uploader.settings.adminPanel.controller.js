const fs = require("fs");
const path = require("path");
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: "dcb6xqdug",
    api_key: "624872878374517",
    api_secret: "txIDfM1S7CVRisue4CqIvP62_sY"
});

class Uploader {
    async sendImageList(req, res) {

        try {
            const result = await cloudinary.v2.api.resources({
                type: 'upload',
                prefix: 'Portfolio_Web_App/', // Use prefix instead of folder
                max_results: 500
            });

            let list = result.resources.map(value => {
                return value.public_id;
            })
            res.send({ images: list });
        }
        catch (e) {
            console.log(e);
            res.status(404).send({ msg: "error" });
        }
    }

    async deleteImage(req, res) {
        try {
            console.log(req.params.id);
            let result = await cloudinary.v2.api.delete_resources([`Portfolio_Web_App/${req.params.id}`]);
            res.send({ msg: `${req.params.id} deleted` });
        }
        catch (e) {
            console.log(e);
            res.status(404).send();
        }

    }

    async UploadImage(req, res) {
        try {
            if (req.files.imgfile != undefined) {
                if (req.files.imgfile.mimetype == "image/jpeg" || req.files.imgfile.mimetype == "image/png" || req.files.imgfile.mimetype == "image/jpg" || req.files.imgfile.mimetype == "image/x-icon" || req.files.imgfile.mimetype == "image/webp") {
                    if (req.files.imgfile.size < 101000000) {
                        const file = req.files.imgfile;
                        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "/Portfolio_Web_App/", public_id: this.safeFilename(this.getExt(req.files.imgfile.name)[0]) });
                        res.send({ msg: "Success, Image uploaded!" });
                    } else {
                        res.status(404).send({ msg: "error : file size is too large make sure your file is less than 100 MB" });
                    }
                }
                else {
                    res.status(404).send({ msg: "error : extension not allowed" });
                }
            }
            else {
                res.status(404).send({ msg: "error" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(404).send({ msg: "error" });
        }
    }

    sanitizeString(str) {
        str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
        return str.trim();
    }

    safeFilename(str) {
        return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    }

    getExt(str) {
        return str.split(".");
    }
}



module.exports = Uploader;