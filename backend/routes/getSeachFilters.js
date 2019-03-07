const express = require('express');
const async = require('async');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require('../models');
const router = express.Router();

router.get('/', function (req, res, next) {
    const sprint = req.query.sprint || '';
    if (sprint !== '') {
        models.automationResults.findAll({
            attributes: [['ticket_name', 'label'], ['ticket_name', 'value']],
            where: {[Op.and]: [{sprint_name: sprint}, {ticket_name: {[Op.not]: null}}]}
        }).then(rows => {
            res.json(rows);
        });
    } else {
        async.parallel({
            types: function (callback) {
                models.automationTypesMaster.findAll({
                    attributes: [['id', 'value'], ['type', 'label']],
                    order: [['id', 'ASC']]
                }).then(rows => {
                    callback(null, rows);
                });
            },
            envs: function (callback) {
                models.automationEnvMaster.findAll({
                    attributes: [['id', 'value'], ['env_name', 'label']],
                    order: [['id', 'ASC']]
                }).then(rows => {
                    callback(null, rows);
                });
            },
            status: function (callback) {
                models.automationStatusMaster.findAll({
                    attributes: [['id', 'value'], ['status', 'label']],
                    order: [['id', 'ASC']]
                }).then(rows => {
                    callback(null, rows);
                });
            },
            sprint_names: function (callback) {
                models.automationResults.findAll({
                    attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('sprint_name')), 'value'], ['sprint_name', 'label']],
                    where: {sprint_name: {[Op.not]: null}}
                }).then(rows => {
                    callback(null, rows);
                });
            }
        }, function (err, results) {
            if (err) {
                res.json({error: err.message});
            }
            res.send(results);
        });
    }
});

router.get('/:id', function (req, res, next) {
    console.log(req.params);
    models.automationTypesMaster.findById(req.params.id, {
        attributes: [['id', 'value'], ['type', 'label']],
        order: [['id', 'ASC']]
    }).then(types => {
        res.send(types);
    }).catch(err => {
        res.json({error: err.message});
    });
});

module.exports = router;
