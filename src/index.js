const yargs = require('yargs');
const Server =require('./app');

const argv = yargs.usage('filewindow [option]')
    .option('p',{
        alias:'port',
        describe:'端口号',
        default:33333
    })
    .option('h',{
        alias:'hostname',
        describe:'host',
        default:'localhost'
    })
    .option('d',{
        alias:'root',
        describe:'根路径',
        default:process.cwd()
    })
    .version()
    .alias('v','version')
    .help()
    .argv;

const server = new Server(argv);
server.start();