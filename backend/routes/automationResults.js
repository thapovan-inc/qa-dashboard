const express = require('express');
const async = require('async');
const models = require('../models');
const router = express.Router();

const regexSpecialChars = /[^a-zA-Z0-9-_\s]/g;
const requiredParams = ['types', 'env', 'status', 'description', 'report_url'];

models.automationResults.belongsTo(models.automationTypesMaster, {foreignKey: 'types', as: 'typesDef'});
models.automationResults.belongsTo(models.automationEnvMaster, {foreignKey: 'env', as: 'envDef'});
models.automationResults.belongsTo(models.automationStatusMaster, {foreignKey: 'status', as: 'statusDef'});

router.get('/', function (req, res, next) {
    const limit = req.params.limit || 25;
    const page = req.params.page || 1;
    const offset = (page - 1) * limit;
    models.automationResults.findAll({
        include: ['typesDef', 'envDef', 'statusDef'],
        offset,
        limit,
        order: [['id', 'DESC']]
    }).then(results => {
        res.json(results);
    }).catch(error => {
        res.json({error: error.message});
    })
});

router.post('/', function (req, res, next) {
    const apiKey = req.get('x-api-key');
    const params = req.body;

    if (apiKey === undefined || apiKey.trim().length === 0) {
        res.status(412);
        res.json({error: 'api key required'});
        return;
    }

    if (Object.keys(params).length === 0) {
        res.status(412);
        res.json({error: 'invalid post data'});
        return;
    }

    let mandatory = true;
    requiredParams.forEach(key => {
        if (params[key] === undefined || params[key].trim().length === 0) {
            mandatory = false;
        }
    });

    if (!mandatory) {
        res.status(412);
        res.json({error: `${requiredParams.join(", ")} are required params123`});
        return;
    }

    params.status = params.status.replace(regexSpecialChars, "").toUpperCase();
    params.env = params.env.replace(regexSpecialChars, "").toUpperCase();
    params.types = params.types.replace(regexSpecialChars, "").toUpperCase();
    params.description = params.description.substr(0, 150);
    params.report_url = params.report_url.substr(0, 1024);

    async.parallel({
        type: function (callback) {
            models.automationTypesMaster.findOne({
                where: {type: params.types},
                attributes: ['id'],
            }).then(row => {
                const id = (row || {}).id || 0;
                if (id === 0) {
                    models.automationTypesMaster.create({
                        type: params.types,
                        created_by: apiKey,
                        created_at: new Date(),
                        updated_at: new Date()
                    }).then(result => {
                        callback(null, result.id);
                    }).catch(e => {
                        res.json({error: e.message});
                        return;
                    });
                } else {
                    callback(null, id);
                }
            });
        },
        envs: function (callback) {
            models.automationEnvMaster.findOne({
                where: {env_name: params.env},
                attributes: ['id']
            }).then(row => {
                const id = (row || {}).id || 0;
                if (id === 0) {
                    models.automationEnvMaster.create({
                        env_name: params.env,
                        created_by: apiKey,
                        created_at: new Date(),
                        updated_at: new Date()
                    }).then(result => {
                        callback(null, result.id);
                    }).catch(e => {
                        res.json({error: e.message});
                        return;
                    });
                } else {
                    callback(null, id);
                }
            });
        },
        status: function (callback) {
            models.automationStatusMaster.findOne({
                where: {status: params.status},
                attributes: ['id'],
            }).then(row => {
                const id = (row || {}).id || 0;
                if (id === 0) {
                    models.automationStatusMaster.create({
                        status: params.status,
                        created_by: apiKey,
                        created_at: new Date(),
                        updated_at: new Date()
                    }).then(result => {
                        callback(null, result.id);
                    }).catch(e => {
                        res.json({error: e.message});
                        return;
                    });
                } else {
                    callback(null, id);
                }
            });
        }
    }, function (err, results) {
        if (err) {
            res.json({error: err.message});
        }
        models.automationResults.create({
            types: results.type,
            env: results.envs,
            status: results.status,
            sprint_name: params.sprint_name || null,
            ticket_name: params.ticket_name || null,
            description: params.description,
            report_url: params.report_url,
            inserted_by: apiKey,
            inserted_at: new Date(),
            updated_at: new Date()
        }).then(result => {
            res.status(201);
            res.json({id: result.id, message: 'record inserted successfully'});
        }).catch(e => {
            res.json({error: e.message})
        });
    });
});

module.exports = router;
