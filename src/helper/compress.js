const { createGzip,createDeflate } = require('zlib');

module.exports = (rs,req,res) => {
    const acceptEncoding = req.headers['accept-encoding'];
    if(!acceptEncoding || !acceptEncoding.match(/\bgzip|deflate\b/)){
        return rs;
    }
    else if(acceptEncoding.match(/\bgzip\b/)) {
        console.log('!!!');
        res.setHeader('Content-Encoding','gzip');
        return rs.pipe(createGzip());
    }
    else {
        res.setHeader('Content-Encoding','deflate');
        return rs.pipe(createDeflate());
    }
};