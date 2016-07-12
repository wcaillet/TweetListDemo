const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    // REQUIRED FOR AUTHENTICATION: Do Not Touch
    email: String,
    password: String,
})

// const postsSchema = new Schema({
//   title: String, 
//   body: String,
//   user: Object
// })

//Schema for our tweets
const tweetSchema = new Schema({
		content: String,
		userHandle: String
	},

	{
		timestamps: true
	} //If set to true then mongo will put timestamp in for you
)

module.exports = {
  // User: createModel('User', usersSchema),
  // Post: createModel('Post', postsSchema)
  Tweet: createModel('Tweet', tweetSchema)
}
