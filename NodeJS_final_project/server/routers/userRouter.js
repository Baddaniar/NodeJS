const express = require("express");
const { ProjectUserModel } = require("../Models");
const router = express.Router();

//Получать всех юзеров
router.get("/", (req, res) => {
    ProjectUserModel.find({}, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
}) 

//Получить одного юзера
router.get("/:id", (req, res) => {
    const id = req.params.id;
    ProjectUserModel.findById(id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
})

//Добавить пользователя
router.post("/", (req, res) => {
    const { fullName, login, password } = req.body;
    const newUser = new UserModel({ fullName, login, password, aboutAuthor: "", followedAuthors: []});
    newUser.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send("ok");
        }
    });
})

//Редактировать пользователя

//Подписаться на пользователя
//Отписаться от пользователя



module.exports = router;