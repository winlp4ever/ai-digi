//const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const http = require('http');

const utils = require('./utils');

// set up server
var app = express();
// app.use(favicon(path.join(__dirname, 'imgs', 'favicon.ico'))); -- uncomment this line if u have a favicon for your site
app.use(express.static(__dirname + './public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const prodConfig = require('./webpack.prod.js');
const devConfig = require('./webpack.dev.js');
const options = {};
var PORT = 5000;

var mode = 'prod';
if (process.argv.length < 3) mode = 'prod';
if (process.argv[2] != 'prod' & process.argv[2] != 'dev') {
    console.error('Wrong mode - only dev or prod is accepted!');
    return;
};
mode = process.argv[2];
if (mode == 'prod') {
    compiler = webpack(prodConfig);
    PORT = 5000;
}
else compiler = webpack(devConfig);

const server = new http.Server(app);
const io = require('socket.io')(server);

server.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
});
app.use(
    middleware(compiler, options)
);
app.use(require('webpack-hot-middleware')(compiler));

// setup backend data for servicese

// websocket communication handlers
io.on('connection', function(socket){
    count ++;
    console.log(`${count}th user connected with id: ${socket.id}`);
    socket.on('disconnect', function(){
        count --;
        console.log(`1 user disconnected, rest ${count}`);
    });
    
});

// normal routes with POST/GET 
app.get('*', (req, res, next) => {
    var filename = path.join(compiler.outputPath,'index');
    
    compiler.outputFileSystem.readFile(filename, async (err, data) => {
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        res.send(data);
        res.end();
    });
});

app.post('/post-file', (req, res) => {
    utils.uploadToS3(req.body.file, req.body.fn, msg => {res.json(msg)});
})

app.post('/register-submit', (req, res) => {
    utils.mailTo('contact@ai-digital-transformation-school.com', 'contact@ai-digital-transformation-school.com', 'New Inscription', JSON.stringify(req.body, null, 4));
    const msg = `
    <p>Bonjour,\n</p> 
    <p>L'équipe de l'IA-TD est prête à vous accueillir à l'une de nos journée d'admission. Veillez à bien remplir en ligne votre dossier de candidature avant notre rencontre. lien pour remplir le dossier de candidature
    <a href='http://35.180.234.167:5000/candidate-form'>here</a>
    </p>

    <p>A très vite !</p>
    <p>Bien cordialement,</p>
    <p>L'équipe IA-TD</p>
    `
    try {
        utils.mailTo('contact@ai-digital-transformation-school.com', req.body.email, 'Thank you for your inscription', msg);
    } catch (err) {
        console.log(err);
    }

    res.json({status: 'ok'})
})

app.post('/candidate-submit', (req, res) => {
    utils.mailTo('contact@ai-digital-transformation-school.com', 'contact@ai-digital-transformation-school.com', 'New Candidature', JSON.stringify(req.body, null, 4));
    
    const msg = `
    <p>Bonjour,\n</p> 
    <p>L'équipe de l'IA-TD est a bien reçu votre dossier de candidature !
    </p>

    <p>A très vite !</p>
    <p>Bien cordialement,</p>
    <p>L'équipe IA-TD</p>
    `
    try {
        utils.mailTo('contact@ai-digital-transformation-school.com', req.body.email, 'Thank you for your candidature', msg);
    } catch (err) {
        console.log(err);
    }
    res.json({status: 'ok'})
})


// on terminating the process
process.on('SIGINT', _ => {
    console.log('now you quit!');
    process.exit();
})