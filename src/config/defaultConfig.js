module.exports = {
    root:process.cwd(),
    hostname:'localhost',
    port:33333,
    com:/\.(html|css|js|md)/,
    cache:{
        maxAge: 600,
        expires: true,
        cacheControl: true,
        lastModified: true,
        etag: true
    }
};