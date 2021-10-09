const fs = require('fs')

class Graph {
    constructor(){
        let address = "API/course_file.csv";
        this.prereqs = [
            ["1101", "-1"],
           // ["1104", "-1"],
           // ["2212", "1101/1104", "-1"],
           // ["2201", "1101/1104", "-1"],
           // ["3250", "2201/2212", "-1"]
        ]; 
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

}
let graph = new Graph();
let courseInfo  = {
    "1101": ["Programming and Problem Solving", "Core", "Programming and Problem Solving,An intensive introduction to algorithm development and problem solving on the computer. Structured problem definition, top down and modular algorithm design. Running, debugging, and testing programs. Program documentation. Not open to students who have earned credit for CS 1104 without permission. Total credit for this course and CS 1104 will not exceed 3 credit hours. Credit hours reduced from second course taken (or from test or transfer credit) as appropriate. FALL, SPRING. "],
}

function getDisplay(){
    var result = [];
    result.push([]);
    var layer = 0;
    let classes = graph.availableClasses();
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

console.log(getDisplay());



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