const fs = require('fs')

class Graph {

    constructor(){
        let address = "API/course_file.csv";
        this.prereqs = [];
        
        
        this.prereqs = [
            ["1101", "-1"],
            ["1104", "-1"],
            ["2212", "1101/1104", "-1"],
            ["2201", "1101/1104", "-1"],
            ["3250", "2201/2212", "-1"]
        ];

        
        this.taken = ["base"];
        this.unclicked = [];
        this.graph = {"base": []};
    }
    unclick(id){
        this.unclicked.push(id);
    }
    getPrereqs(){
        return this.prereqs;
    }
    addClass(id){
        this.taken.push(id);
        let preCourses = [];
        for(let i = 0; i < this.prereqs[id].length; ++i){

        }
    }
    availableClasses(){
        var classList = [];
        for(var i = 0; i < this.prereqsSize; ++i){
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

}

let filename = "API/course_file.txt";
var text = fs.readFileSync(filename, "utf-8");
console.log(text);
// var graph = new Graph(string);


/*
for(var i = 0; i < graph.availableClasses().length; ++i){
    console.log(graph.availableClasses()[i]);
}


graph.addClass("1101");


for(var i = 0; i < graph.availableClasses().length; ++i){
    console.log(graph.availableClasses()[i]);
}*/