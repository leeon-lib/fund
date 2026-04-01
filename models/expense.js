var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
	user_id: { type: Schema.Types.ObjectId, ref: 'User' },
	type: { type: String, enum: ['income', 'expense'], required: true },
	category: { type: String, required: true },
	amount: { type: Number, required: true },
	description: { type: String, default: '' },
	date: { type: Date, default: Date.now },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	deleted_at: { type: String, default: null },
});

mongoose.model('Expense', ExpenseSchema);
