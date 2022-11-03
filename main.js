
// Venue Date Opponent Result Runs Ball Four Sixes StrikeRate

const request = require("request");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const alMatchObj = require("./AllMatches");
const url = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423";

// Home Page
const iplPath = path.join(__dirname,"ipl");
dirCreater(iplPath);


request(url,cb);
function cb(error,request,html){
    if(error){
        console.log(error);
    }else{
       //  console.log(html);

     extractLink(html);
    }

}

function extractLink(html){
    let $ = cheerio.load(html);
    let dataArr = $(".ds-border-t.ds-border-line.ds-text-center.ds-py-2");
    let getResult = $(dataArr[0]).find("a").attr("href");
    let fullLink = "https://www.espncricinfo.com/"+getResult;
    // console.log(viewResult);

    alMatchObj.gAmatches(fullLink);

}

function dirCreater(filePath){
    if(fs.existsSync(filePath) == false){
        fs.mkdirSync(filePath);
    }
}















