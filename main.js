$(document).ready(function(){
    var srOffset = 10;
   $("#submit").click(function(){
       var searchArr = document.getElementById('search-text').value.split(' ');
       var searchText = searchArr.join("%20");
       document.getElementById('title').style.marginTop = "0%";
       document.getElementById('main-form').style.marginBottom = "2%";
       document.getElementById('random').style.marginTop = "2%";
       $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&utf8=1&srsearch="+searchText, function(json){
           var queryURL = "";
           var pageIDs = [];
           for (var i=0;i<10;i++){
               pageIDs.push(json.query.search[i].pageid);
           }
           var pageIDURL = pageIDs.join("%7C");
           $.getJSON("https://en.wikipedia.org/w/api.php?action=query&prop=info&origin=*&pageids="+pageIDURL+"&inprop=url&format=json", function(jsonInner){
                document.getElementById('results').innerHTML = "<a href="+jsonInner.query.pages[json.query.search[0].pageid].fullurl+"><div class='well'><b>"+json.query.search[0].title+"</b><br>"+json.query.search[0].snippet+"</div></a>";
                for (var i=1;i<10;i++){
                    document.getElementById('results').innerHTML += "<a href="+jsonInner.query.pages[json.query.search[i].pageid].fullurl+"><div class='well'><b>"+json.query.search[i].title+"</b><br>"+json.query.search[i].snippet+"</div></a>";
                }
                document.getElementById('load-more').style.display = "initial";
           });
       });
   });

    $("#load-more").click(function(){
        var searchArr = document.getElementById('search-text').value.split(' ');
       var searchText = searchArr.join("%20");
       $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&continue=-%7C%7C&list=search&utf8=1&srsearch="+searchText+"&sroffset="+srOffset, function(json){
           var queryURL = "";
           var pageIDs = [];
           srOffset += 10;
           for (var i=0;i<10;i++){
               pageIDs.push(json.query.search[i].pageid);
           }
           var pageIDURL = pageIDs.join("%7C");
           $.getJSON("https://en.wikipedia.org/w/api.php?action=query&prop=info&origin=*&pageids="+pageIDURL+"&inprop=url&format=json", function(jsonInner){
                for (var i=0;i<10;i++){
                    document.getElementById('results').innerHTML += "<a href="+jsonInner.query.pages[json.query.search[i].pageid].fullurl+"><div class='well'><b>"+json.query.search[i].title+"</b><br>"+json.query.search[i].snippet+"</div></a>";
                }
           });
       });              
    });
    
    $("#search-text").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#submit").click();
    }
});
});