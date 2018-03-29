const data = [{
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
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
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweets) {
  let user = tweets.user.name;
  let avatar = tweets.user.avatars.small;
  let userHandle = tweets.user.handle;
  let content = tweets.content.text;
  let dateCreated = tweets.created_at;
  const tweetHTML =
    `<article>
<header>
<img class="avatar" src="${escape(avatar)}" />
<h3 class="userName">${escape(user)}</h3>
<p class="handle">${escape(userHandle)}</p>
</header>
 <p class="tweet-content">${escape(content)}</p>
<footer>
<div>
<p class="date">${escape(dateCreated)} Days ago</p>
</div>
<div class="icons">
     <i class="fas fa-heart"></i>
     <i class="fas fa-flag"></i>
     <i class="fas fa-retweet"></i>
   </div>
 </footer>
</article>`;

  return tweetHTML;
}


function renderTweets(tweets) {
  tweets.forEach(function(tweet) {
    $("#tweets-container").prepend(createTweetElement(tweet));
    console.log(tweet);
  });
}



$(document).ready(function() {
  renderTweets(data);

  $("#newTweet").on("submit", function(event) {
    event.preventDefault();
    let tweetChar = $("#newTweet textarea").val().length;
    if (tweetChar > 140) {
      alert("It's a tweet, not an essay! Try again");
    } else if (tweetChar === 0) {
      alert("Come on, you have to tweet something!");
    } else {

      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $("#newTweet").serialize(),
        success: function(data) {
          loadTweets();
          $("#tweetSubmit").val("");
        }
      });
    }
  });

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      type: "GET",
      dataType: "json",
      success: function(data) {
        $("#tweets-container").empty();
        renderTweets(data);
      }
    });
  }
  loadTweets();

  $(".new-tweet").hide();

  $("#compose").on("click", function() {
    $(".new-tweet").slideToggle();
    $("textarea").focus();
  });

});










