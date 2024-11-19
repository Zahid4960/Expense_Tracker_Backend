const mongoose = require('mongoose')

class DBConfig {
    constructor() {
        this.DB_HOST = process.env.MONGODB_HOST
        this.DB_PORT = process.env.MONGODB_PORT
        this.DB_NAME = process.env.MONGODB_NAME
    }

    async dbConnection() {
        /**
         * Connects to the MongoDB database using Mongoose.
         * 
         * This method establishes a connection to the MongoDB database 
         * using the host, port, and database name specified in the environment variables.
         * If the connection is successful, it logs a success message.
         * If the connection fails, it logs an error and exits the process.
         */
        try {
            let connect = await mongoose.connect(`mongodb://${this.DB_HOST}:${this.DB_PORT}/${this.DB_NAME}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })

            if (connect) {
                console.log('DB conntected successfully!')
            }
        } catch(err) {
            console.log('DB connection failed. Please check error log.')
            console.error(err)
            process.exit(1)
        }
    }
}

module.exports = new DBConfig()