const express = require('express');
const router = express.Router();
const models = require('../../models');

module.exports = () => {

    router.get('/', (req, res) => {
        models.Couleur.findAll().then((couleurs) => {
            res.send(couleurs);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500)
        });
    });

    router.post('/', (req, res) => {
        models.Couleur.create(req.body).then(() => {
            res.status(200).send(true);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500)
        });;
    });

    return router;
};
