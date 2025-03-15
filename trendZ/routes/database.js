const mongoose = require('mongoose');

const uri = "mongodb+srv://francocagnoli:ypwqHOiuoFtuZXs9@trendzdb.crj1n.mongodb.net/trendZ?retryWrites=true&w=majority&appName=trendzDB";

const connectDB = async () => {
    try {
        await mongoose.connect(uri); // Ya no es necesario pasar useNewUrlParser y useUnifiedTopology
        console.log('✅ MongoDB conectado');
    } catch (error) {
        console.error('❌ Error al conectar MongoDB:', error);
        process.exit(1); // Detiene la app si falla la conexión
    }
};

module.exports = connectDB;
