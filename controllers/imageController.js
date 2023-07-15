const ImageKit = require("imagekit");
const FileReader = require("filereader");
const fs = require("fs");

const imagekit = new ImageKit({
    publicKey : "public_xfoAsM0viPaAnA3blkuEFb8Y/ts=",
    privateKey : "private_AW+LKBKEOD7Xn9BWCP9Wd1wm34w=",
    urlEndpoint : "https://ik.imagekit.io/mdsaquibshakeel/pets/"
});

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

const getImageUrl = (req, res) => {
    try {
        fs.readFile(req.file.path, function (err, data) {
          if (err) throw err;
          imagekit.upload(
            {
              file: data,
              fileName: "my_file_name.jpg",
            },
            function (error, result) {
                if (error) console.log(error);
                fs.unlink(req.file.path, (err) => {
                    if (err) throw err;
                });
                return res.status(200).json({ url: result.url });
            }
            );
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    getImageUrl
};