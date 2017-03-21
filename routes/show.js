var Jira = require('../scripts/Jira/Jira');
var config = require('../scripts/config');
var testJira = new Jira(config.jira);

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/allIssues/:boardId', function(req, res, next) {
    testJira.selectIssuesBy(req.params.boardId, req.query)
        .then(result => {
            if (result.length === 0) {
                console.log('Select parameter doesn´t exist')
                return res.send('Select parameter doesn´t exist')
            }
            res.send(result);
        })
        .catch(e => console.log(e));
})



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
    testJira.getDetailsOfVersion(req.params.versionId)
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