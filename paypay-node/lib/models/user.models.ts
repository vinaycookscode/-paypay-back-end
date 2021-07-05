import { GENDER_TYPES, MONGOOSE_GENDER_TYPES, USER_ROLES, USER_ROLES_ENUM } from "../utils/constants/global.constants";
var bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const UserSchema = new schema(
	{
		name: { type: String, required: true, minlength: 2, maxlength: 100},
		gender: { type: String, required: true, maxlength: 100, enum : MONGOOSE_GENDER_TYPES,
			default: GENDER_TYPES.MALE},
		email: { type: String, required: false, maxlength: 100,
							validate: [
								{ validator: (inputString) => {
									if (inputString) {
										return inputString ? /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inputString.toLowerCase()) : false
									}
								},
								message: inputString => `${inputString.value} is not a valid email id`
							},
							{
								validator: async function (email) {
									if (email) {
										const user = await this.constructor.findOne({email});
										// console.log('user information', user);
										if (!user) return true; else return false;
									}
								},
								message: (email) => 'This email-id already present. Try other emailid'
							}
						]
				},
		address: { type: String, required: false,  minlength: 2 , maxlength: 100},
		city: { type: String, required: true,  minlength: 2 , maxlength: 100},
		state: { type: String, required: true,  minlength: 2 , maxlength: 100},
		photo: { type: String, required: false},
		hobby: { type: String, required: true,  minlength: 2 , maxlength: 100},
		password: { type: String, required: false,},
		role: { type: String, required: true, maxlength: 100, enum : USER_ROLES,
			default: USER_ROLES_ENUM.USER },
		isActive: { type: Boolean, default: true }
	}
);

UserSchema.pre('save', function(next) {
	var that = this;
	if (that?.password) {
		if (!that.isModified('password')) return next();
		that.password = bcrypt.hashSync(that.password, 10);
	}
	return next();
});

UserSchema.methods.comparePassword = function(inputPassword) {
	if (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password);
	}
}
export default mongoose.model('User', UserSchema);