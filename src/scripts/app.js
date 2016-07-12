import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import TweetView from './TweetView'

import {TweetCollection} from './models'


const app = function() {

	const TweetRouter = Backbone.Router.extend({
		routes: {
			"home": "showTweets",
			"*catchall": "redirectHome" //This catchall needs to be at the bottom of the routes, or else all the routes will get funneled thru here first
		},

		redirectHome: function() {
			location.hash = "home"
		},

		showTweets: function() {
			var coll = new TweetCollection()
			coll.fetch()
			ReactDOM.render(<TweetView tweetColl={coll} />, document.querySelector('.container'))
		},

		initialize: function() {
			Backbone.history.start()
		}

	})

	new TweetRouter()
}

app()