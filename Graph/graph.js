const fs = require('fs')

class Graph {
    constructor(){
        let filename = "API/course_file.txt";
        var text = fs.readFileSync(filename, "utf-8");
        this.prereqs = this.buildPrereqList(text);
        this.taken = ["base"];
        this.unclicked = [];
        this.graph = {"base": []};
        
    }
    getTaken(){
        return this.taken;
    }
    unclick(id){
        let index = this.taken.indexOf(id);
        this.findAllDeleted(id);
        return this.availableClasses();
    }
    getPrereqs(){
        return this.prereqs;
    }

    addClass(id){
        this.taken.push(id);
        this.graph[id] = [];
        let preCourses = [];
        let index = 0;
        // look for the pre-reqs that allowed me to add this class
        for(let i = 0; i < this.prereqs.length; ++i){
            if(this.prereqs[i][0] == id){
                for(let j = 1; j < this.prereqs[i].length; ++j){
                    if(this.prereqs[i][j] == "-1")
                        break;
                    if(this.taken.includes(this.prereqs[i][j]) && this.prereqs[i][j].length == 4)
                        preCourses.push(this.prereqs[i][j]);
                    
                    if(this.taken.includes(this.prereqs[i][j].substr(0,4)) && this.prereqs[i][j].length == 9)
                        preCourses.push(this.prereqs[i][j].substr(0,4));

                    else if(this.prereqs[i][j].length == 9 && this.taken.includes(this.prereqs[i][j].substr(4, 4)))
                        preCourses.push(this.prereqs[i][j].substr(4,4));
                }
            }
        }
        if(preCourses.length == 0){
            let graphArr = this.graph["base"];
            graphArr.push(id);
            this.graph["base"] = graphArr;
        }
        else{
            for(let i = 0; i < preCourses.length; ++i){
                let graphArr = this.graph[preCourses[i]];
                graphArr.push(id);
                this.graph[preCourses[i]] = graphArr;
            }
        }
        // console.log(this.graph);
    }
    availableClasses(){
        var classList = [];
        for(var i = 0; i < this.prereqs.length; ++i){
            if(this.taken.includes(this.prereqs[i][0]))
                continue;
            if(this.prereqs[i][0] == "2212"){
                if(this.taken.length > 1)
                    classList.push(this.prereqs[i][0]);
                continue;
            }
            if(this.prereqs[i][0] == "3262"){
                if(this.taken.includes("1100") || this.taken.includes("2201") || this.taken.includes("2204"))
                    classList.push(this.prereqs[i][0]);
                continue;
            }
            for(var j = 1; j < this.prereqs[i].length; ++j){
                let currID = this.prereqs[i][j];
                if(currID == -1){
                    classList.push(this.prereqs[i][0]);
                    break;
                }
                if(!this.taken.includes(currID) && currID.length == 4)
                    break;
                else if(currID.length == 9 && !this.taken.includes(currID.substr(0, 4)) && !this.taken.includes(currID.substr(4, 4))){
                    break;
                }
            }
        }
        return classList;
    }
    findAllDeleted(id){
        var checkCourses = this.graph[id];
        for(let i = 0; i < checkCourses.length; ++i){
            let exist = false;
            for(var key in this.graph){
                if(key == id)
                    continue;
                if(this.graph[key].includes(checkCourses[i]))
                    exist = true;
                    break;
            }
            if(!exist){
                delete this.graph[checkCourses[i]];
                if(this.taken.includes(checkCourses[i]))
                    this.taken.splice(this.taken.indexOf(checkCourses[i]), 1);
            }
        }
        delete this.graph[id];
        for(var key in this.graph){
            let currArr = this.graph[key];
            for(let i = 0; i < currArr; ++i){
                if(currArr[i] == id)
                    currArr.splice(i, 1);
            }
            this.graph[key] = currArr;
        }
        this.taken.splice(this.taken.indexOf(id), 1);
    }
    buildPrereqList(text){
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
}

/*
1000,base,"The Beauty and Joy of Computing","Fundamental concepts of computing including abstraction, algorithms, design, and distributed computation. Hands-on curriculum focusing on translating ideas into working computer programs and developing a mastery of practical computational literacy. The relevance and societal impact of computer science are emphasized. Students in the School of Engineering may only receive open elective credit for CS 1000. FALL, SPRING. [3]",FALL/SPRING,None
1100,base,"Applied Programming and Problem Solving with Python","Foundations of computing using Python. Programming fundamentals. Designing, debugging, running programs. Scalar, vector, and matrix computations for scientific computing and data science. Numeric and text processing. Basic data visualization techniques. Intended for students other than computer science and computer engineering majors. Not open to students who have earned credit for CS 1104 or 2204 without permission. Total credit for CS/DS 1100 and CS 1104 will not exceed 4 credit hours. Total credit for CS/DS 1100 and CS 2204 will not exceed 5 hours. Credit hours reduced from second course taken (or from test or transfer credit) as appropriate. FALL, SPRING. [3]",FALL/SPRING,None
1101,base,"Programming and Problem Solving","An intensive introduction to algorithm development and problem solving on the computer. Structured problem definition, top down and modular algorithm design. Running, debugging, and testing programs. Program documentation. Not open to students who have earned credit for CS 1104 without permission. Total credit for this course and CS 1104 will not exceed 3 credit hours. Credit hours reduced from second course taken (or from test or transfer credit) as appropriate. FALL, SPRING. [3]",FALL/SPRING,Core
1103,base,"Introductory Programming for Engineers and Scientists","Problem solving on the computer. Intended for students other than computer science and computer engineering majors. Methods for designing programs to solve engineering and science problems using MATLAB. Generic programming concepts. FALL, SPRING. [3]",FALL/SPRING,None
1104,base,"Programming and Problem Solving with Python","An intensive introduction to algorithm development and problem solving using the Python programming language. Structured problem definition, top down and modular algorithm design. Running, debugging, and testing programs. Program documentation. Not open to students who have earned credit for CS 1100, DS 1100, or CS 1101 without permission. Total credit for this course and CS 1100 will not exceed 4 credit hours. Total credit for this course and DS 1100 will not exceed 4 credit hours. Total credit for this course and CS 1101 will not exceed 3 credit hours. Credit hours reduced from second course taken (or from test or transfer credit) as appropriate. FALL, SPRING. [3]",FALL/SPRING,Core
1151,base,"Computers and Ethics","Analysis and discussion of problems created for society by computers, and how these problems pose ethical dilemmas to both computer professionals and computer users. Topics include: computer crime, viruses, software theft, ethical implications of life-critical systems. FALL, SPRING. [3]",FALL/SPRING,None
*/

let graph = new Graph();
let courseInfo  = {
    "1000": ["The Beauty and Joy of Computing", "None", "The Beauty and Joy of Computing","Fundamental concepts of computing including abstraction, algorithms, design, and distributed computation. Hands-on curriculum focusing on translating ideas into working computer programs and developing a mastery of practical computational literacy. The relevance and societal impact of computer science are emphasized. Students in the School of Engineering may only receive open elective credit for CS 1000. FALL, SPRING. [3]"],
    "1101": ["Programming and Problem Solving", "Core", "Programming and Problem Solving,An intensive introduction to algorithm development and problem solving on the computer. Structured problem definition, top down and modular algorithm design. Running, debugging, and testing programs. Program documentation. Not open to students who have earned credit for CS 1104 without permission. Total credit for this course and CS 1104 will not exceed 3 credit hours. Credit hours reduced from second course taken (or from test or transfer credit) as appropriate. FALL, SPRING. "],
    "1100": ["Programming and Problem Solving", "None", "An intensive introduction to algorithm development and problem solving on the computer. Structured problem definition, top down and modular algorithm design. Running, debugging, and testing programs. Program documentation. Not open to students who have earned credit for CS 1104 without permission. Total credit for this course and CS 1104 will not exceed 3 credit hours. Credit hours reduced from second course taken (or from test or transfer credit) as appropriate. FALL, SPRING. [3]"],
    "1103": ["Introductory Programming for Engineers and Scientists", "None" ,"Problem solving on the computer. Intended for students other than computer science and computer engineering majors. Methods for designing programs to solve engineering and science problems using MATLAB. Generic programming concepts. FALL, SPRING. [3]"],
    "1104": ["Programming and Problem Solving with Python", "Core", "An intensive introduction to algorithm development and problem solving using the Python programming language. Structured problem definition, top down and modular algorithm design. Running, debugging, and testing programs. Program documentation. Not open to students who have earned credit for CS 1100, DS 1100, or CS 1101 without permission. Total credit for this course and CS 1100 will not exceed 4 credit hours. Total credit for this course and DS 1100 will not exceed 4 credit hours. Total credit for this course and CS 1101 will not exceed 3 credit hours. Credit hours reduced from second course taken (or from test or transfer credit) as appropriate. FALL, SPRING. [3]"],
    "1151": ["Computers and Ethics", "Core", "Analysis and discussion of problems created for society by computers, and how these problems pose ethical dilemmas to both computer professionals and computer users. Topics include: computer crime, viruses, software theft, ethical implications of life-critical systems. FALL, SPRING. [3]"]
}
function getDisplay(){
    var result = [];
    result.push([]);
    var layer = 0;
    let classes = graph.availableClasses();
    console.log(classes);
    for(let i = 0; i < classes.length; ++i){
        if(layer != parseInt(classes[i].substr(0,1))){
            layer = parseInt(classes[i].substr(0,1));
        }
        while(result.length < layer){
            result.push([]);
        }
        let dictionary = {};
        dictionary["id"] = classes[i];
        dictionary["name"] = courseInfo[classes[i]][0];
        dictionary["isTaken"] = graph.taken.includes(classes[i]);
        dictionary["category"] = courseInfo[classes[i]][1];
        result[layer-1].push(dictionary);
    }
    return result;
}

function check(id, isTaken){
    // isTaken = true = uncheck
    // isTaken = false = check
    if(isTaken){
        graph.unclick(id);
    }
    else{
        graph.addClass(id);
    }
}

function getCourseDetails(id){
    let dictionary = {};
    dictionary["id"] = id;
    dictionary["name"] = courseInfo[id][0];
    dictionary["description"] = courseInfo[id][2];
    dictionary["category"] = courseInfo[id][1];
    dictionary["term"] = courseInfo[id][3];
    return dictionary;
}   

console.log(getDisplay());
/*
console.log("Taken: ", graph.taken);
console.log("Available: ", graph.availableClasses());
console.log("Graph: ", graph.graph);

graph.addClass("1101");
console.log("\n\n\n");

console.log("Taken: ", graph.taken);
console.log("Available: ", graph.availableClasses());
console.log("Graph: ", graph.graph);
*/

/*
let filename = "API/course_file.txt";
var text = fs.readFileSync(filename, "utf-8");
console.log(text);
// var graph = new Graph(string);



for(var i = 0; i < graph.availableClasses().length; ++i){
    console.log(graph.availableClasses()[i]);
}


graph.addClass("1101");


for(var i = 0; i < graph.availableClasses().length; ++i){
    console.log(graph.availableClasses()[i]);
}*/