import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import {TweetModel} from './models'

const TweetView = React.createClass({

	getInitialState: function(){
		return {
			tweetColl: this.props.tweetColl
		}
	},

	componentWillMount: function(){
		this.state.tweetColl.on('sync update', () => { //Putting sync event on the tweetColl
			this.setState({
				tweetColl: this.state.tweetColl
			})
		})
	},

	render: function() {
		return(
			<div>
				<Header />
				<Composer tweetColl={this.state.tweetColl} />
				<TweetContainer tweetColl={this.props.tweetColl} />
			</div>
		)
	}
})

const Header = React.createClass({
	render: function() {
		return(
			<div className="header">
				<h1> Twiddle </h1>
			</div>
			)
	}
})

const Composer = React.createClass({
	
	_submitTweet: function(evt) {
		//console.log(e)
		evt.preventDefault() //Causes form to not do what it normally does(like refresh)
		var tweet = new TweetModel({
			userHandle: evt.target.username.value,
			content: evt.target.textarea.value
		})
		tweet.save()
		//Add tweet to the collection
		this.props.tweetColl.add(tweet)
	},

	render: function() { //We use name in the input/textarea below so we can access them thru the above _submitTweet f(x)
		return(
			<div className="composer">
				<form onSubmit={this._submitTweet}> 
					<input name="username" placeholder="Type user handle" /> 
					<textarea name="textarea" placeholder="Tweet Here"> </textarea>
					<button type="submit"> Submit </button>
				</form>
			</div>
			)
	}
})

const TweetContainer = React.createClass({
	render: function() {
		//console.log(this.props.tweetColl)
		return(
			<div className="tweetColl">
				{this.props.tweetColl.map((model) =>
					{return <Tweet key={model.cid} model={model}/>})}
			</div>
			)
	}
})

const Tweet = React.createClass({
	render: function() {
		//console.log('tweet model', this.props.model)
		return (
			<div className="tweet">
				<h6> {this.props.model.get('content')}  </h6>
			</div>
			)
	}
})


export default TweetView


