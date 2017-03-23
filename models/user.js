var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var utility = require('utility');

var UserScheam = new Schema({
	email: { type: String },
	name:{ type: String },
	password:{ type: String },
	token: { type: String },
	level:{ type: String },									// 用户等级
	is_activated: { type: Boolean, default: false },		// 是否激活
	is_lock:{ type: Boolean, default: false },				// 是否锁定
	created_at:{ type: Date, default: Date.now },
	updated_at:{ type: Date, default: Date.now },
	deleted_at:{ type: String, default: null },
});

mongoose.model('User', UserScheam);
