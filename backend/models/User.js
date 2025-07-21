const mongoose=require('mongoose');
const bcypt = require('bcryptjs');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']

    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    role: {
        type: String,
        enum: [ 'student', 'certifiedReviewer'],
        default: 'student'
    },
    connections: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

},
{
    timestamps: true,
});

userSchema.pre('save',async function (next) {
    if (!this.isModified('password')) {
        return next();
    const salt= await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
    }
});

// compare passswords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports= mongoose.model('User', userSchema);