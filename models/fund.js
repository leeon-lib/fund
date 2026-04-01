var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FundSchema = new Schema({
	user_id: { type: Schema.Types.ObjectId, ref: 'User' },
	name: { type: String, required: true },
	code: { type: String },
	amount: { type: Number, default: 0 },
	buy_price: { type: Number, default: 0 },
	current_price: { type: Number, default: 0 },
	buy_date: { type: Date, default: Date.now },
	note: { type: String, default: '' },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	deleted_at: { type: String, default: null },
});

mongoose.model('Fund', FundSchema);
