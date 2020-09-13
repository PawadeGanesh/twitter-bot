const twit = require('twit');
const config = require('../config/config');
const Twitter = new twit(config);

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params

let retweet = function () {
	let params = {
		q: '#nodejs, #Nodejs',
		result_type: 'recent',
		lang: 'en',
	};

	Twitter.get('search/tweets', params, (err, data) => {
		// if there no errors
		if (!err) {
			// grab ID of tweet to retweet
			let retweetId = data.statuses[0].id_str;
			// Tell TWITTER to retweet
			Twitter.post(
				'statuses/retweet/:id',
				{
					id: retweetId,
				},
				(err, res) => {
					if (res) {
						console.log('Retweeted!!!');
					}
					// if there was an error while tweeting
					if (err) {
						console.log('Something went wrong while RETWEETING... Duplication maybe...');
					}
				}
			);
		}
		// if unable to Search a tweet
		else {
			console.log('Something went wrong while SEARCHING...');
		}
	});
};

// grab & retweet as soon as program is running...
retweet();
// retweet in every 30 minutes
setInterval(retweet, 1800000);

// FAVORITE BOT====================

// find a random tweet and 'favorite' it

let favoriteTweet = function () {
	let params = {
		q: '#nodejs, #Nodejs',
		result_type: 'recent',
		lang: 'en',
	};

	// find the tweet

	Twitter.get('search/tweets', params, (err, data) => {
		// find tweets
		let tweet = data.statuses;
		let randomTweet = ranDom(tweet);

		// if random tweet exists

		if (typeof randomTweet != 'undefined') {
			// Tell TWITTER to 'favorite'
			Twitter.post('favorites/create', { id: randomTweet.id_str }, (err, res) => {
				// if there was an error while 'favorite'
				if (err) {
					console.log('CANNOT BE FAVORITE... Error');
				} else {
					console.log('FAVORITED... Success!!!');
				}
			});
		}
	});
};

// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet in every 60 minutes
setInterval(favoriteTweet, 3600000);

// function to generate a random tweet tweet

function ranDom(arr) {
	var index = Math.floor(Math.random() * arr.length);
	return arr[index];
}
