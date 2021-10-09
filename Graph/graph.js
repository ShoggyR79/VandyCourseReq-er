const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const fs = require('fs')

class Graph {

    constructor(){
        let address = "API/course_file.csv";

        this.prereqs = {
            "1101": ["-1"],
            "1104": ["-1"],
            "2212": ["1101/1104", "-1"],
            "2201": ["1101/1104", "-1"],
            "3250": ["2201/2212", "-1"]
        };
        
        this.taken = ["base"];
        this.unclicked = [];
        this.graph = {"base": []};
    }
    availableClasses(){
        var classList = [];
        for(key in this.prereqs){
            if(this.taken.includes(key))
                continue;
        
            for(var j = 1; j < this.prereqs[key].length; ++j){
                let currID = this.prereqs[key][j];
                if(currID == "-1"){
                    classList.push(key);
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
    /*
    addClass(id){
        this.taken.push(id);
        let preCourses = [];
        for(let i = 0; i < this.prereqs[id].length; ++i){
            
        }
    }
    getPrereqs(){
        return this.prereqs;
    }
    unclick(id){
        this.unclicked.push(id);
    }
    */

}

let graph = new Graph();
console.log(graph.availableClasses());


/*
let filename = "API/course_file.csv";
var text = fs.readFileSync(filename);
var textByLine = text.split("\n");
console.log(text);
*/