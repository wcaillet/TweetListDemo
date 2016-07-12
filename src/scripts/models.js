import Backbone from 'backbone'

export const TweetModel = Backbone.Model.extend({
	url: "/api/tweets" //telling the model which url to talk to
})

export const TweetCollection = Backbone.Collection.extend({
	model: TweetModel,
	url: "/api/tweets"  //telling the Collection which url to talk to
})