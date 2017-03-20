var Jira = require('../scripts/Jira/Jira');
var config = require('../scripts/config');
var testJira = new Jira(config.jira);

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/versions/:boardId', function(req, res, next) {

    testJira.getVersions(req.params.boardId)
        .then(versions => {
            res.send(versions)
        })
        .catch(err => {
            res.send(err)
        })
});

router.get('/versions/details/:versionId', function(req, res, next) {
    testJira.getDetailsOfVersion(req.params)
        .then(version => {
            console.log(version);
            res.send(version)
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/versions/progress/:boardId/:versionId', function(req, res, next) {

    testJira.getProgressOfVersionsInBoard(req.params.boardId, req.params.versionId)
        .then(progress => {
            res.send(progress)
        })
        .catch(err => {
            res.send(err)
        })
});

module.exports = router;