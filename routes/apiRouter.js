let Router = require('express').Router;
const apiRouter = Router()

/*
let User = require('../db/schema.js').User
let Post = require('../db/schema.js').Post
*/

//This is how you import Tweet from schema.js
let Tweet = require('../db/schema.js').Tweet


// apiRouter.get('/users', function(req, res){
//   User.find({}, function(err, results){
//     res.json(results)
//   })
// })

//READ MANY Tweets Function
// There are 2 callbacks happening here!!!
apiRouter.get('/tweets', function(request, response){
  Tweet.find({}, function(err, results){
    if(err){ // Here, this will notify the client if there's an error with requesting the data, or if invalid query
      console.log(err)
      response.json({
        message: err
      })
    }

    response.json(results) //Server takes results and wraps them in json to send back as a response back to client
  })

})


//CREATE ONE Tweet function
apiRouter.post('/tweets', function(request, response){
  //Create new variable with Tweet constructor created by mongoose, passing in tweet data sent by the client
  let newTweet = new Tweet(request.body) 
  //Save new Tweet into database, show error callback if shit hits the fan
  newTweet.save(function(err){  //save tweet to database
      if(err){ 
        console.log(err)
        response.json({
          message: err
        })
      }
      else{ //Send newTweet back to client to confirm it was successfully saved/posted
        response.json(newTweet)
      }
  })
})


//- get is a method from Express server
  //The get request is setting up a function to run 
  //If the path ('/posts/') matches and its a get request, then run the following f(x)
// apiRouter.get('/posts/', function(req, res){
//   Post.find(req.query, function(err, results){
//     res.json(results)
//   })
// })

// //read one
// apiRouter.get('/posts/:_id', function(req, res){
//   Post.findOne(req.params, function(err, result){
//     res.json(result)
//   })
// })

// //create one
// apiRouter.post('/posts', function(req, res){
//   let newPost = new Post(req.body)
//   newPost.save(function(err){
//     if(err) return res.json({message: 'error saving'})
//       res.json(newPost)
//   })
// })

// //update one
// apiRouter.put('/posts/:_id', function(req,res) {
//   Post.findOne(req.params, function(err,record) {
//     for (var prop in req.body) {
//       record[prop] = req.body[prop]
//     }
//     record.save(function(err){
//       if(err) return res.json({message: 'error saving'})
//       res.json(record)
//     })
//   })
// })

// //delete one
// apiRouter.delete('/posts/:_id', (req,res) => {
//   Post.remove(req.params,(err) => {
//     res.status(204).json({msg: "record successfully deleted",
//       _id: req.params._id})
//   })
// })

module.exports = apiRouter


