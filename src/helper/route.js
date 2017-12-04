const fs = require('fs');
const path =require('path');
const { promisify } = require('util');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
// const config = require('../config/defaultConfig');
const Handlebars = require('handlebars');
const tplPath = path.join(__dirname,'../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());
// console.log(config.root);
const compress = require('./compress');
const mime = require('mime');
const isFresh = require('./cache');

module.exports = async function readFile (req,res,filePath,config) {
    try{
        const stats = await stat(filePath);
        if(stats.isFile()){
            res.statusCode = 200;
            console.log(mime.getType(path.extname(filePath)));
            res.setHeader('Content-Type',mime.getType(path.extname(filePath)));

            if(isFresh(stats,req,res)){
                res.statusCode = 304;
                res.end();
                return;
            }

            let rs = fs.createReadStream(filePath);
            if(filePath.match(config.com)){
                rs = compress(rs,req,res);
            }
            rs.pipe(res);
        } else if(stats.isDirectory()) {

            const files = await readdir(filePath);
            // console.log(files);
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html');
            const dir = path.relative(config.root,filePath);
            console.log(config.root);
            console.log(dir);

            const data = {
                root:'',
                title:path.basename(filePath),
                dir:dir?`/${dir}`:'',
                files
            };
            res.end(template(data));
        }
    } catch(err){
        console.error(err);
        res.statusCode = 404;
        res.setHeader('Content-Type','text/plain');
        res.end(`${filePath} is not a directory or file`);
    }
};