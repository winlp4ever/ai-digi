const path = require('path');
const fs = require('fs');
const _cliProgress = require('cli-progress');
const request = require('request');
var AWS = require('aws-sdk');
AWS.config.loadFromPath(path.join(__dirname, 'aws-credentials', 'accessKeys.json'));

var uploadToS3 = function (file, fn, callback) {
    s3 = new AWS.S3({apiVersion: '2006-03-01'});
    let f = file.replace(/^data:\w+\/[A-Za-z0-9_-]+;base64,/, "");
    console.log('file-size: ' + Buffer.byteLength(f, 'base64') + 'B');
    const base64Data = new Buffer.from(f, 'base64');
    var uploadParams = {
        Bucket: 'aii-digital', 
        Key: `files/` + fn,
        Body: base64Data,
        ContentEncoding: 'base64'
    };

    s3.upload (uploadParams, function (err, data) {
        if (err) {
            console.log("Error", err);
            callback({err: err});
        } if (data) {
            console.log("Upload Success", data.Location);
            callback({link: data.Location});
        }
    });
}

module.exports = {
    uploadToS3: uploadToS3,
}