import mongoose from 'mongoose';
import cryptoJS from 'crypto-js';

const { Schema } = mongoose;

const UserSchema = new Schema({
    email:
    {
        type: String,
        default: ''
    },
    password:
    {
        type: String,
        default: ''
    },
    verificationToken: 
    {
        type: String,
        default: ''
    },
    isVerified: 
    {
        type: Boolean,
        default: false
    },
    isDeleted:
    {
        type: Boolean,
        default: false
    },
    signUpDate:
    {
        type: Date,
        default: Date.now()
    },
    lastLogin:
    {
        type: Date,
        default: Date.now()
    }
});

UserSchema.methods.generateHash = (password) =>
{
    const encrypted = cryptoJS.AES.encrypt(password, cryptoJS.SHA256(password).toString());

    return encrypted.toString();
};

UserSchema.methods.generateToken = () =>
{
    return cryptoJS.SHA256(Date.now()).toString();
};

UserSchema.methods.validPassword = (password, userPassword) => 
{
    const decrypted = cryptoJS.AES.decrypt(userPassword, cryptoJS.SHA256(password).toString());

    return decrypted.toString(cryptoJS.enc.Utf8);
};

export default mongoose.model('User', UserSchema);
