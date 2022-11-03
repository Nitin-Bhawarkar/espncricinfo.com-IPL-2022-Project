const request = require("request");
const cheerio = require("cheerio");
const allScoreCard = require("./scorecard");

function getAllMatchesLink(url){

    request(url,cb);
        
        function cb(error, response, html){
        if(error){
            console.log(error);
        }else{
           //  console.log(html);
    
         extractAllLink(html);

        }
    }
}

function extractAllLink(html){

    let $ = cheerio.load(html);
       let scorecard = $(".ds-grow.ds-px-4.ds-border-r.ds-border-line-default-translucent");
       for(let i = 0;i<scorecard.length;i++){
            let link = $(scorecard[i]).find("a").attr("href");
            let fullLink = "https://www.espncricinfo.com/"+link;
            console.log(fullLink);
            allScoreCard.scoreCard(fullLink);
}
}

module.exports ={
    gAmatches: getAllMatchesLink
}











