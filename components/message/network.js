const express = require("express");
const multer = require("multer");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/files/');
    },
    filename: (req, file, callback) => {
        const [name, extension] = file.originalname.split(".");
        callback(null, `${name}_${Date.now()}.${extension}`);
    }
});

const upload = multer({
    storage: storage
});

router.get("/", (req, res) => {
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages)
    .then((messageList) => {
        response.success(req, res, messageList, 200)
    })
    .catch(e => {
        response.error(req, res, "Internal error", 500, e)
    });
});

router.post("/", upload.single('file'),(req, res) => {
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(e => {
            response.error(req, res, "Bad Request", 400, e);
        });
});

router.patch('/:id', (req, res) => {
    controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, 'Bad Request', 400, e);
    });
});

router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
    .then(() => {
        response.success(req, res, `Delete ${req.params.id} message`, 200);
    })
    .catch(() => {
        response.error(req, res, 'Bad Request', 400, e);
    })
});
module.exports = router