const path = require('path');
const fs = require('fs');
const _cliProgress = require('cli-progress');
const request = require('request');
const mailer = require('nodemailer');
var AWS = require('aws-sdk');
AWS.config.loadFromPath(path.join(__dirname, 'aws-credentials', 'accessKeys.json'));

var mailCredentials = require(path.join(__dirname, 'mail-credentials', 'config.js'));
var Transporter = mailer.createTransport(mailCredentials)

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

var mailTo = async function (sender, dest, subj, cnt) {
    let info = await Transporter.sendMail({
        from: sender,
        to: dest,
        subject: subj,
        text: cnt,
        html: cnt
    }) 
    console.log(info.messageId);
}

module.exports = {
    uploadToS3: uploadToS3,
    mailTo: mailTo
}