// http://www.reddit.com/search.json?q= link to search for json

var xhttp = new XMLHttpRequest(); //Creating Request Object
var jsonString; //global variable to hold search results
chrome.omnibox.setDefaultSuggestion({
    description: 'Type /r/ along with the subreddit page to go stright to that subreddit'
});

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

        jsonString = JSON.parse(this.responseText);
        if (jsonString.data.children.length == 0) { //Checks on DONE state
            //Reddit Turned up with no results subreddit doesn't exist
            alert('Subreddit Doesn\'t Exist!');
        } else {
            chrome.tabs.update({
                url:'https://reddit.com' + jsonString.data.children[0].data.url // text that will read "/r/anime for example"
            })
        }
    }
    
    if( this.readyState == 2 && this.status != 200) { //Checks on HEADERS_Recieved state
        alert('HTTP Status: ' + this.stauts)
    }

}

chrome.omnibox.onInputEntered.addListener(function (e) {
    xhttp.open('GET', 'https://www.reddit.com/subreddits/search.json?q=' + e, true);
    xhttp.send();

   /* document.location = 'https://reddit.com/r/' + e; //sends user to location. */
})