const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const renderFile = require('ejs').renderFile

// Load Configuration
const appSecrets = require('./config/secrets.js')
const appAuthentication = require('./config/auth.js')
const connectToDB = require('./config/db-setup.js').connectToDB

// Import Routers
let indexRouter = require('./routes/indexRouter.js')
let authRouter = require('./routes/authRouter.js')
let apiRouter = require('./routes/apiRouter.js')

// Load DB User Model (for appAuthentication configuration)
let User = require('./db/schema.js').User


// =========
// RUN APP
// =========
const app = express()
const PORT = process.env.PORT || 3000
app.set('port', PORT)

// =========
// VIEW ENGINE
// =========
app.set('views', './dist/views');
app.engine('html', renderFile)
app.set('view engine', 'html');

// =========
// DATABASE
// =========
connectToDB("tiy-starter-kit")

// =========
// APPLICATION MIDDLEWARE 
// =========
app.use( express.static( __dirname + '/dist/assets') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );
app.use( cookieParser() );
app.use( session({secret: appSecrets.sessionSecret }) );
app.use( passport.initialize() );
app.use( passport.session() );
appAuthentication(User)


// 
// =========
// ROUTERS
// =========
// Any routes that match, we will use the given router!
app.use( '/', indexRouter )
app.use( '/auth', authRouter )
app.use( '/api', apiRouter )

app.listen(PORT,function() {
	console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
})