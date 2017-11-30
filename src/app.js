const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs =require('fs');
const { promisify } = require('util');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('./config/defaultConfig');

const server = http.createServer((req,res)=>{
    const url = req.url;
    const filePath = path.join(config.root,url);
    console.log(filePath);
    async function readFile () {
        try{
            const stats = await stat(filePath);
            if(stats.isFile()){
                res.statusCode = 200;
                res.setHeader('Content-Type','text/plain');
                fs.createReadStream(filePath).pipe(res);
            } else if(stats.isDirectory()) {

                const files = await readdir(filePath);
                console.log(files);
                res.statusCode = 200;
                res.setHeader('Content-Type','text/html');
                let arr = files;
                const html = arr.map(value => {
                    return `<a href="${url}${value}">${value}</a><br>`
                }).join(',');
                res.end(html);
            }
        } catch(err){
            res.statusCode = 404;
            res.setHeader('Content-Type','text/plain');
            res.end(`${filePath} is not a directory or file`);
        }
    }
    readFile();

    // async function readDir () {
    //     try{
    //         const files = await
    //     } catch(err){
    //
    //     }
    // }
    // fs.stat(filePath,(err,stats)=>{
    //     if(err){
    //         res.statusCode = 404;
    //         res.setHeader('Content-Type','text/plain');
    //         res.end(`${filePath} is not a directory or file`);
    //         return;
    //     }
    //     if(stats.isFile()){
    //         res.statusCode = 200;
    //         res.setHeader('Content-Type','text/plain');
    //         fs.createReadStream(filePath).pipe(res);
    //     } else if(stats.isDirectory()) {
    //         fs.readdir(filePath,(err,files)=>{
    //             console.log(files);
    //             res.statusCode = 200;
    //             res.setHeader('Content-Type','text/plain');
    //             res.end(files.join(','));
    //         })
    //     }
    // });
});

server.listen(config.port, config.hostname, ()=>{
    const addr = `http://${config.hostname}:${config.port}`;
    console.log(`Server started at ${chalk.green(addr)}`);
});