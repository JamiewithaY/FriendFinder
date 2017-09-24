var friendData = require('../data/friends.js');
var path = require('path');

// API GET Requests - when users "visit" a page. 
// (ex:localhost:PORT/api/friends...they are shown a JSON of the data in the table) 

module.exports = function(app){
	app.get('/api/friends', function(req, res){
		res.json(friendData);
	});

//API POST Request-handles when user submits a form & thus submits data to the server.
// In each of the below cases, when a user submits form data (a JSON object)
// ...the JSON is pushed to the appropriate Javascript array


	app.post('/api/friends', function(req, res){

		var greatMatch = {
			name: "",
			image: "",
			matchDifference: 1000
		};

		console.log(req.body);

		//These variables will store the users survey Post
		var userData= req.body;
		var userScores= userData.scores;

		console.log(userScores);
		
		//This variable will calculate the difference between the user's scores and the scores of each user in the database
		var totalDifference = 0;

		//2 Loops are happening. One to go through all of the friends and one to go through everyones scores
		
		//loop 1-loop through all the friends in the database
		for(var i = 0; i < friendData.length; i++){

			console.log(friendData[i]);
			totalDifference = 0;

			//loop 2-go through friends scores and the users score and calculate the difference between the two.  Push the total differnce to the variable set above
			for(var j = 0; j < friendData[i].scores[j]; j++){
				// We calculate the difference between the scores and sum them into the totalDifference
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendData[i].scores[j]));
				// If the sum of differences is less then the differences of the current "best match"
				if (totalDifference <= greatMatch.friendDifference){

					// Reset the bestMatch to be the new friend. 
					greatMatch.name = friendData[i].name;
					greatMatch.photo = friendData[i].photo;
					greatMatch.matchDifference = totalDifference;
				}
			}
		}

	// Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
	// the database will always return that the user is the user's best friend).	

		friendData.push(userData);
 	// / Return a JSON with the user's greatMatch. This will be used by the HTML in the next page. 
		res.json(greatMatch);
	});
};