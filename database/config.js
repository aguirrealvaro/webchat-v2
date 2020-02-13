let config

if (process.env.NODE_ENV === 'production'){
    config = {
        db: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST
    }
}else{
    config = {
        db: 'webchat',
        username: 'postgres',
        password: '1234',
        host: 'localhost'
    }
}

module.exports = config