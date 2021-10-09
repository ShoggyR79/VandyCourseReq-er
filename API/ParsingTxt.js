
const fs = require('fs');
let filename = "API/course_file.txt";
var text = fs.readFileSync(filename, "utf-8");
//console.log(text);

function buildPrereqList(text){
    let prereqList = [];
    var startIndex = 0;
    
    for(let i =0;i<countLines(text);i++){
    
        var name = text[startIndex,startIndex + 4];
        prereqList[i] = [];
        prereqList[i].push(name);
        startIndex = startIndex + 4; //start Index corresponds to a comma
        condition = text.slice(startIndex,text.slice(startIndex+1).search(",")+startIndex).search("CS");
        while( condition == -1){
            console.log(prereqList)
            var item = text.slice(startIndex+1,text.slice(startIndex+1).search(",")+startIndex);
            prereqList[i].push(item);
            // console.log("first:", (text.slice(startIndex+1)).search(","))
            // console.log("startIndex: ", startIndex)
            startIndex = text.slice(startIndex+1).search(",")+(startIndex+1);
            // console.log(startIndex)
            condition = text.slice(startIndex,text.slice(startIndex+1).search(",")+startIndex).search("CS");
        }
        
        prereqList[i].push("-1")
        startIndex = text.slice(startIndex+1).search("\n")+1+startIndex; //start of a new line
    }
    return prereqList;
    
}

function countLines(text){
    return  text.split(/\r\n|\r|\n/).length;
}
var test = [];
test = buildPrereqList(text);
console.log(test[0])


