//

module.exports = {
    PORT: process.env.PORT || 3000,
    DB: process.env.MONGODB_URI || 'mongodb+srv://userCartaller:1234@cluster0.sngea.mongodb.net/JdpAutos?retryWrites=true&w=majority',
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'estaeslallave'
}