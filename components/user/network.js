const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.post('/', (req, res) => {
    controller.addUser(req.body.name)
    .then((data) => {
        response.success(req, res, data, 201);
    })
    .catch(err => {
        response.error(req, res, 'Bad Request', 400, err);
    });
});

router.get('/', (req, res) => {
    const filterUser = req.query.name || null
    controller.getUsers(filterUser)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch(err => {
        response.error(req, res, 'Internal Error', 500, err);
    });
});
module.exports = router;