//I can use chrome.omnibox here
// http://www.reddit.com/search.json?q= link to search for json

var xhttp = new XMLHttpRequest(); //Creating Request Object
var jsonString; //global variable to hold search results
chrome.omnibox.setDefaultSuggestion({
    description: 'Type /r/ along with the subreddit page to go stright to that subreddit'
});

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

        jsonString = JSON.parse(this.responseText);
        if (jsonString.data.children.length == 0) {
            //Reddit Turned up with no results subreddit doesn't exist
            alert('Subreddit Doesn\'t Exist!');
        } else {
            chrome.tabs.update({
                url:'https://reddit.com' + jsonString.data.children[0].data.url
            })
        }
    }
    
    if(this.status != 200) {
        alert('HTTP Status: ' + this.stauts)
    }

}

chrome.omnibox.onInputEntered.addListener(function (e) {
    console.log('https://www.reddit.com/subreddits/search.json?q=' + e);

    xhttp.open('GET', 'https://www.reddit.com/subreddits/search.json?q=' + e, true);
    xhttp.send();

   /* document.location = 'https://reddit.com/r/' + e; //sends user to location. */
})