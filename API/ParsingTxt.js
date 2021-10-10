
const fs = require('fs');
let filename = "API/course_file.txt";
var text = fs.readFileSync(filename, "utf-8");
//console.log(text);

function buildPrereqList(text){
    let prereqList = [];
    var startIndex = 0;
    var i=0;
    while(text[startIndex]== "1" || text[startIndex]== "2" || text[startIndex]== "3" || text[startIndex]== "4"){
        var name = text.slice(startIndex,startIndex + 4);
        prereqList[i] = [];
        prereqList[i].push(name);
        startIndex = startIndex + 4; //start Index corresponds to a comma
        let condition = text.slice(startIndex,text.slice(startIndex+1).search(",")+startIndex).search("\"");
        while( condition == -1){
            var item = text.slice(startIndex+1,text.slice(startIndex+1).search(",")+startIndex+1);
            prereqList[i].push(item);
            // console.log("first:", (text.slice(startIndex+1)).search(","))
            // console.log("startIndex: ", startIndex)
            startIndex = text.slice(startIndex+1).search(",")+(startIndex+1);
            // console.log(startIndex)
            condition = text.slice(startIndex,text.slice(startIndex+1).search(",")+startIndex).search("\"");
        }
        
        prereqList[i].push("-1")
        startIndex = text.slice(startIndex+1).search("\n")+1+startIndex+1; //start of a new line
        
        i++;
    }
    return prereqList;
}


function buildCourseList(text) {
        var courseList = {}
        var startIndex = 0;
        var i = 0;
        while (text[startIndex] == "1" || text[startIndex] == "2" || text[startIndex] == "3" || text[startIndex] == "4") { //check if end of file is not reached
            var id = text.slice(startIndex, startIndex + 4);
            var name = text.slice(text.slice(startIndex).search("\"") + startIndex+1, text.slice(text.slice(startIndex).search("\"") + startIndex + 1).search("\"") + text.slice(startIndex).search("\"") + startIndex+1);
            //console.log("hello");
            //console.log(text.slice(startIndex).search("\""));
            //console.log(text.slice(text.slice(startIndex).search("\"") + startIndex + 1).search("\""));

            startIndex = text.slice(text.slice(startIndex).search("\"") + startIndex + 1).search("\"") + text.slice(startIndex).search("\"") + startIndex+1;

            var description = text.slice(startIndex + 2, text.slice(startIndex + 1).search("]") + 1 + startIndex+1);
            startIndex = text.slice(startIndex + 1).search("]") + 3 + startIndex;
            startIndex = text.slice(startIndex).search(",") + startIndex;
            var term = text.slice(startIndex + 1, text.slice(startIndex + 1).search(",") + startIndex + 1);
            startIndex = text.slice(startIndex + 1).search(",") + startIndex + 1
            var cat = text.slice(startIndex + 1, text.slice(startIndex).search("\n") + startIndex);
            courseList[id] = [name, cat, description, term];
            startIndex = text.slice(startIndex + 1).search("\n") + 1 + startIndex + 1;
            console.log(name)
            //console.log(id, name, cat, description, term);
        }
        return courseList;
    }
test = {}
test = buildPrereqList(text);
console.log(test)



