require("dotenv/config")

const {env} = process

const config = {
    token: env.TOKEN,
    dbUri: env.DB_URI
}

module.exports = config