import mong, {Schema} from 'mongoose';

const ConversationSchema = new mong.Schema({
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    participants: [{type: Schema.Types.ObjectId, ref: 'User'}],
    type: {type: Schema.Types.String},
})

export default mong.model('Conversation', ConversationSchema);
