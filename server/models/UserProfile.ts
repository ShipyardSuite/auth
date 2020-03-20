import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Document = mongoose.Document;

export interface IUserProfile extends Document {
	firstName: String;
	lastName: String;
}

const UserProfileSchema: Schema = new Schema({
	firstName: { type: String },
	lastName: { type: String }
});

export default mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);
