const mongoose = require('mongoose');
 
const blacklistSchema = new mongoose.Schema(
    {
        jti: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        revokedAt:{
            type: Date,
            default: Date.now
        },
        expiresAt: {
            type: Date,
            required: true,
            index: true,
            expireAfterSeconds: 180
        }
    },
    { timestamps: true }
)
 
const JTI = mongoose.model('JwtBlackList', blacklistSchema);
 module.exports = JTI