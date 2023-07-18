import mong, {Schema} from 'mongoose';

const MessageSchema = new mong.Schema({
    date: {type: Schema.Types.Date},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    content: {type: Schema.Types.String},
    type: {type: Schema.Types.String},
})

export default mong.model('Message', MessageSchema);
