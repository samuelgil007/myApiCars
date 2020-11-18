const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id_user: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sign_up_date: {
        type: Date,
        default: Date.now()
    },
    last_login_date: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: "admin",
        enum: [
            "admin",
            "Gerente general",
            "Asistente de gerencia",
            "Gerente financiero",
            "Asistente financiero",
            "Asistente recursos humanos",
            "Supervisor de taller",
            "Tecnico de taller"
        ]
    }

});
// este metodo ejecuta un hook antes de un metodo
UserSchema.pre('save', function(next) {
    bcrypt.genSalt(10).then(salts => {
        //me encriptara una cadena de caracteres, me devuelve una promesa con el hash , y ese hash lo guardo
        bcrypt.hash(this.password, salts).then(hash => {
            this.password = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));
});

const User = mongoose.model('User', UserSchema);

module.exports = User;