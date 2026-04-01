var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
	user_id: { type: Schema.Types.ObjectId, ref: 'User' },
	action: { type: String, required: true },
	detail: { type: String, default: '' },
	ip: { type: String, default: '' },
	created_at: { type: Date, default: Date.now },
});

mongoose.model('Activity', ActivitySchema);
