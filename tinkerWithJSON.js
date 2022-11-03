

// Method 1st

let fs = require("fs");
let xlsx =  require("xlsx");

//    let buffer = fs.readFileSync("./example.json");
//    console.log("========================================================")
//     console.log(buffer);
//     // Array
//     let data = JSON.parse(buffer);
//     // console.log(data);

// Method 2nd

let data = require("./example.json");


/* 
console.log(data);


data.push({
    "name" : "Rekha",
    "lastName" : "Bhawarkar",
    "isGrowing" : "Yes",
    "Tools": ["Web Scraping", "Node.js", "React.js"],
    "address" : {
        "city" : "Wardha",
        "pincode" : 442104,
        "state": "Maharashtra",
        "area" : "Village"
    }
});

 let stringData = JSON.stringify(data);
 fs.writeFileSync("./example.json",stringData);

 */

 //========--------------==========------------============----------===========----------------========----------



 // WorkBook --> filePath , WorkSheet --> Name , JSON data

// For write

 // new Worksheet

function excelWriter(filepath,json,sheetName){

    let newWB = xlsx.utils.book_new();

    // JSON data --> convert excel format
    let newWS = xlsx.utils.json_to_sheet(json);
   
    // newwb , ws , sheet name
   
    xlsx.utils.book_append_sheet(newWB,newWS, sheetName);
   
   // filepath
   
    xlsx.writeFile(newWB, filepath);

}

 
// ========----------=========-------------===========---------==========----------===========--------

function excelReader(filePath,sheetName){
 // Read
// workbook get
if(fs.existsSync(filePath) == false){
    return [];
}
let wb = xlsx.readFile("abc.xlsx");
// sheet
let excelData = wb.Sheets["Sheet-1"];
// sheet data get
let ans = xlsx.utils.sheet_to_json(excelData);
return;
}














































