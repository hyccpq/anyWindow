const http = require('http');
const chalk = require('chalk');
const path = require('path');
const config = require('./config/defaultConfig');
const readFile = require('./helper/route');
const openURL = require('./helper/openURL');

class Server {
    constructor(conf){
        this.config = Object.assign({},config,conf);
    }

    start(){
        const server = http.createServer((req,res)=>{
        const filePath = path.join(this.config.root,req.url);
        // console.log();
        console.log(req.url,filePath);
        readFile(req,res,filePath,this.config);


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

        server.listen(this.config.port, this.config.hostname, ()=>{
            const addr = `http://${this.config.hostname}:${this.config.port}`;
            console.log(`Server started at ${chalk.green(addr)}`);
            openURL(addr);
        });
    }
}

module.exports = Server;

