
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

 function createTweetElement(tweets) {
let user = tweets.user.name;
let avatar = tweets.user.avatars.small;
 let userHandle = tweets.user.handle;
 let content = tweets.content.text;
 let dateCreated = tweets.created_at;
 const tweetHTML =
`<article>
<header>
<img class="avatar" src="${avatar}" />
<h3 class="userName">${user}</h3>
<p class="handle">${userHandle}</p>
</header>
 <p class="tweet-content">${content}</p>
<footer>
<div>
<p class="date">${dateCreated}</p>
</div>
<div>
     <img class="icons" src="/images/heart">
     <img class="icons" src="/images/retweet">
     <img class="icons" src="/images/flag">
   </div>
 </footer>
</article>`;

return tweetHTML;
  }

function renderTweets(tweets) {
  tweets.forEach(function(tweet) {
     $("#tweets-container").append(createTweetElement(tweet));
  console.log(tweet);
  });
}



$(document).ready(function() {
  renderTweets(data);
});






