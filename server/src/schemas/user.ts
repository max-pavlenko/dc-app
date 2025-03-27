import mong, {Schema} from 'mongoose';

const UserSchema = new mong.Schema({
    email: {type: String, unique: true},
    password: {type: String},
    username: {type: String, unique: true},
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
    avatar: {type: String},
    authProvider: {type: String},
})

export default mong.model('User', UserSchema);
