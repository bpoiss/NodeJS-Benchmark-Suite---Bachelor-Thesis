var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Todo = new Schema({
    user_id: String,
    content: String,
    done: Boolean,
    updated_at: Date
});

mongoose.model( 'Todo', Todo );
mongoose.connect( 'mongodb://localhost/express-todo', function(err) {
    if(err) {
        errorMsg = 'Error connecting to MongoDB, please make sure MongoDB is installed, running and listening on Port 27017.';
        console.log(errorMsg);
        err.message = errorMsg + '\n' + err.message;
        throw err;
    } else {
        console.log('Successfully connected to MongoDB');
    }
} );
