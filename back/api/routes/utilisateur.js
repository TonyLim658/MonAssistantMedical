const express = require('express');
const router = express.Router();
const models = require('../../models');

module.exports = () => {

    //Création d'un utilisateur
    //valide : renvoie utilisateur
    //invalide : renvoie erreur
    router.post('/', (req, res) => {
        models.Utilisateur.create(req.body).then((response) => {
            res.status(200).send(response.dataValues);
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });;
    });

    //Authentification d'un utilisateur
    router.get('/authentification', (req, res) => {
        models.Utilisateur.findOne({

            where: {
                login: req.body.login,
                mot_de_passe: req.body.mdp
            },
            include: [
                {
                    model: models.Profil,
                }
            ]

        }).then((user) => {
            console.log(user);
            res.status(200).send(user);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500)
        });
    });

    //Récupération des informations d'un utilisateur + ses profils
    router.get('/:id', (req, res) => {
        models.Utilisateur.findOne({

            where: { id: req.params.id },
            include: [
                {
                    model: models.Profil,
                }
            ]

        }).then((user) => {
            res.status(200).send(user);
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
    });

    //modification d'un utilisateur
    router.put('/', (req, res) => {

        models.Utilisateur.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then((response) => {
            console.log(response);
            res.status(200).send(true);
        }).catch((error) => {
            res.status(500).send(error);
        });
    });

    //suppression d'un utilisateur
    router.delete('/:id', (req , res) => {
        models.Utilisateur.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.status(200).send(true);
        }).catch((error) => {
            res.status(500).send(error);
        });
    });

    //ajout d'un profil à l'utilisateur
    router.post('/:iduser/profil/:idprofil', (req , res) => {
        models.Utilisateur.findByPk(req.params.iduser).then(user => {
            user.addProfil(req.params.idprofil);
            user.save();
        }).then(() => {
            res.status(200).send(true);
        }).catch((error) => {
            res.sendStatus(500);
        });
    });

    //suppression d'un profil à l'utilisateur
    router.delete('/:iduser/profil/:idprofil', (req , res) => {
        models.Utilisateur.findByPk(req.params.iduser).then(user => {
            user.removeProfil(req.params.idprofil);
            user.save();
        }).then(() => {
            res.status(200).send(true);
        }).catch((error) => {
            res.sendStatus(500);
        });
    });

    
    return router;
};
