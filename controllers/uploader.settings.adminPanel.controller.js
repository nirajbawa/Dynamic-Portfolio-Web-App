const fs = require("fs");
const path = require("path");
const multer = require("multer");
const img_upload_path = path.join(__dirname, "../public/images/icons");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, img_upload_path);
    },
    filename: function (req, file, cb) {

    str = file.originalname.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
    str.trim();  

      cb(null, str);
    }
  })

  const maxSize = 524288000;


  let upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
        
        
        // Set the filetypes, it is optional
        let filetypes = /jpeg|jpg|ico|png/;
        let mimetype = filetypes.test(file.mimetype);
  
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname && file.fieldname=="imgfile") {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the " + "following filetypes - " + filetypes);
      } 
  
// mypic is the name of file attribute
}).single("imgfile");   

class Uploader {
    async sendImageList(req, res) {
        const img_folder_path = path.join(__dirname, "../public/images/icons");
        try {
            const files = await fs.readdirSync(img_folder_path);
            res.send({ images: files });
        }
        catch (e) {
            console.log(e);
            res.status(404).send();
        }

    }

    async deleteImage(req, res) {
        const img_folder_path = path.join(__dirname, "../public/images/icons", this.sanitizeString(req.params.id));
        try {
            let deleteFile = await fs.unlinkSync(`${img_folder_path}`);
            res.send({ msg: `${this.sanitizeString(req.params.id)} deleted` });
        }
        catch (e) {
            console.log(e);
            res.status(404).send();
        }

    }

    UploadImage(req, res) {
        upload(req,res,function(err) {
            if(err) {
                res.status(404).send({msg:err});
            }
            else {
                res.send({msg:"Success, Image uploaded!"});
            }
        })

    }

    sanitizeString(str) {
        str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
        return str.trim();
    }
}



module.exports = Uploader;