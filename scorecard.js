

// Venue Date Opponent Result Runs Ball Four Sixes StrikeRate

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
let xlsx =  require("xlsx");

//   const url = "https://www.espncricinfo.com//series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

function processScoreCard(url){
    request(url,cb);
}

// Home Page
function cb(error,request,html){
    if(error){
        console.log(error);
    }else{
       //  console.log(html);
     extractMatchDetails(html);
    }
}

function extractMatchDetails(html){
// Venue Date Opponent Result Runs Ball Four Sixes StrikeRate

// IPL
    // Team
        // Player

            //:=  Runs , Balls , Four , Sixes , Venue , Opponent , Date , Result

            // For Both Teams Venue , Date , Result 

        // Venue , Date

       // .ds-text-tight-m.ds-font-regular.ds-text-ui-typo-mid

       // Result

       // .ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title

    let $ = cheerio.load(html);

            let desDetails = $(".ds-text-tight-m.ds-font-regular.ds-text-ui-typo-mid");
            let resultt = $(".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title");
            let stringArr = desDetails.text().split(",");

           // let VenueArr = stringArr.text().split("(DSC)");
            let Venue = stringArr[1].trim();


            let date = stringArr[2].trim();
            let result = resultt.text();

            // console.log(Venue);
            // console.log(date);
            // console.log(result);

         let innings = $(".ds-rounded-lg.ds-mt-2");
        //  let htmlString = " ";
         for(let i = 0;i<innings.length;i++){

            // htmlString += $(innings[i]).html();

            
            // Team , Opponent
       
           let teamName = $(innings[i]).find(".ds-text-title-xs.ds-font-bold.ds-text-typo-title .ds-text-title-xs").text();
         
           let opponentIndex = i==0?1:0;
           let opponentName = $(innings[opponentIndex]).find(".ds-text-title-xs.ds-font-bold.ds-text-typo-title .ds-text-title-xs").text();
           
           
           // Player
           //:=  Runs , Balls , Four , Sixes , StrikeRate , Opponent
           
           let cInning = $(innings[i]).find(".ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table:not(.ds-hidden)");
           
           console.log(` ${Venue} | ${date} | ${teamName} | ${opponentName} | ${result}`);
           
            let allBatsman = $(cInning).find("tr");

            for(let j =0;j<allBatsman.length-4;j++){

                let allColsPlayer = $(allBatsman[j]).find("td");

                let PlayerName = $(allColsPlayer[0]).text();
                let runs = $(allColsPlayer[2]).text();
                let balls = $(allColsPlayer[3]).text();
                let four = $(allColsPlayer[5]).text();
                let sixes = $(allColsPlayer[6]).text();
                let strikeRate = $(allColsPlayer[7]).text();


                console.log(`${PlayerName} ${runs} ${balls} ${four} ${sixes} ${strikeRate}`);

                processPlayer(teamName , PlayerName , runs , balls , four , sixes , strikeRate , opponentName , Venue , date , result);
                  //  console.log(PlayerName);
              //  console.log(isWorthy);
        }
    }
}


function processPlayer(teamName , PlayerName , runs , balls , four , sixes , strikeRate , opponentName , Venue , date , result){
    let teamPath = path.join(__dirname, "ipl" , teamName);

    dirCreater(teamPath);

    let filePath = path.join(teamPath , PlayerName + ".xlsx");
   let content = excelReader(filePath, PlayerName);

   let playerObj = {
    teamName, 
    PlayerName,
    runs, balls, four,sixes, strikeRate, opponentName, Venue,date , result
   }
   content.push(playerObj);
   excelWriter(filePath, content, PlayerName);

}

function excelWriter(filepath,json,sheetName){

    let newWB = xlsx.utils.book_new();

    // JSON data --> convert excel format
    let newWS = xlsx.utils.json_to_sheet(json);
   
    // newwb , ws , sheet name
   
    xlsx.utils.book_append_sheet(newWB,newWS, sheetName);
   
   // filepath
   
    xlsx.writeFile(newWB, filepath);

}

function excelReader(filePath,sheetName){
    // Read
   // workbook get
   if(fs.existsSync(filePath) == false){
       return [];
   }
   let wb = xlsx.readFile(filePath);
   // sheet
   let excelData = wb.Sheets[sheetName];
   // sheet data get
   let ans = xlsx.utils.sheet_to_json(excelData);
   return ans;
   }

function dirCreater(filePath){
    if(fs.existsSync(filePath) == false){
        fs.mkdirSync(filePath);
         }
      }


module.exports = {
    scoreCard: processScoreCard
}












