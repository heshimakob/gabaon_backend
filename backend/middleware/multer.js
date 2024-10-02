const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Dossier où vous souhaitez stocker les fichiers
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Vous pouvez personnaliser le nom si vous le souhaitez
    }
});
