const mongoose = require('mongoose');
// require('dotenv').config();

const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true, // Esta opción ya no es necesaria
            // useFindAndModify: false // Esta opción ya no es necesaria
        });

        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }

}

module.exports = {
    dbConnection,
}