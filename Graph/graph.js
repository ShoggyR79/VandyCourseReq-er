const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const { createPublicKey } = require('crypto');
const fs = require('fs');
const { PassThrough } = require('stream');


class Graph {
    constructor() {
        let filename = "../API/course_file.txt";
        var text = fs.readFileSync(filename, "utf-8");
        this.prereqs = this.buildPrereqList(text);
        this.courseInfo = this.buildCourseList(text);
        this.taken = ["base"];
        this.unclicked = [];
        this.graph = { "base": [] };
    }
    getTaken() {
        return this.taken;
    }
    unclick(id) {
        let index = this.taken.indexOf(id);
        this.findAllDeleted(id);
        return this.availableClasses();
    }
    getPrereqs() {
        return this.prereqs;
    }

    addClass(id) {
        this.taken.push(id);
        this.graph[id] = [];
        let preCourses = [];
        let index = 0;
        if(id == "2212"){
            for(let i = 0; i < this.taken.length; ++i){
                if(this.taken[i].substr(0,1) == "1"){
                    preCourses.push(this.taken[i]);
                }
            }
        }
        // look for the pre-reqs that allowed me to add this class
        for (let i = 0; i < this.prereqs.length; ++i) {
            if (this.prereqs[i][0] == id) {
                for (let j = 1; j < this.prereqs[i].length; ++j) {
                    if (this.prereqs[i][j] == "-1")
                        break;
                    if (this.taken.includes(this.prereqs[i][j]) && this.prereqs[i][j].length == 4)
                        preCourses.push(this.prereqs[i][j]);

                    if (this.taken.includes(this.prereqs[i][j].substr(0, 4)) && this.prereqs[i][j].length == 9)
                        preCourses.push(this.prereqs[i][j].substr(0, 4));

                    if (this.prereqs[i][j].length == 9 && this.taken.includes(this.prereqs[i][j].substr(5, 4)))
                        preCourses.push(this.prereqs[i][j].substr(5, 4));
                }
            }
        }
        if (preCourses.length == 0) {
            let graphArr = this.graph["base"];
            graphArr.push(id);
            this.graph["base"] = graphArr;
        }
        else {
            for (let i = 0; i < preCourses.length; ++i) {
                let graphArr = this.graph[preCourses[i]];
                graphArr.push(id);
                this.graph[preCourses[i]] = graphArr;
            }
        }
        
        let alreadyTaken = []
        for(let i = 0; i < this.taken.length; ++i){
            let n = 0;
            for(let m = 0; m < this.prereqs.length; ++m){
                if(this.prereqs[m][0] == this.taken[i] && this.prereqs[m][0] != id){
                    n = m;
                    break;
                }
            }
            // find the class already taken that shoudl be added to the graph
            for(let j = 1; j < this.prereqs[n].length; ++j){
                if (this.prereqs[n][j] == "-1")
                    break;
                if (this.prereqs[n][j] == id && this.prereqs[n][j].length == 4)
                    alreadyTaken.push(this.prereqs[n][0]);

                if (this.prereqs[n][j].includes(id) && this.prereqs[n][j].length == 9)
                    alreadyTaken.push(this.prereqs[n][0]);
            }
        }
        this.graph[id] = alreadyTaken;

    }
    availableClasses() {
        var classList = [];
        for (var i = 0; i < this.prereqs.length; ++i) {
            if (this.taken.includes(this.prereqs[i][0]))
                continue;
            if (this.prereqs[i][0] == "2212") {
                if (this.taken.length > 1)
                    classList.push(this.prereqs[i][0]);
                continue;
            }
            if (this.prereqs[i][0] == "3262") {
                if (this.taken.includes("1100") || this.taken.includes("2201") || this.taken.includes("2204"))
                    classList.push(this.prereqs[i][0]);
                continue;
            }
            for (var j = 1; j < this.prereqs[i].length; ++j) {
                let currID = this.prereqs[i][j];
                if (currID == -1) {
                    classList.push(this.prereqs[i][0]);
                    break;
                }
                if (!this.taken.includes(currID) && currID.length == 4)
                    break;
                else if ((currID.length == 9) && ((!this.taken.includes(currID.substr(0, 4))) && (!this.taken.includes(currID.substr(5, 4))))) {
                    break;
                }
            }
        }
        return classList;
    }
    updateGraphDelete(){
        for(var key in this.graph){
            let id = key;
            if(id == "3262"){
                if((!this.taken.includes("1101")) && (!this.taken.includes("1101")) && (!this.taken.includes("1101")))
                    this.unclick(id);
                    return;
            }
            let array = [];
            for(let i = 0; i < this.prereqs.length; ++i){
                if(this.prereqs[i][0] == id){
                    array = this.prereqs[i];
                    break;
                }
            }
            let everyChecked = true;
            if(id == "2201"){
                console.log("2201 case: ", array);
                //console.log("2201 case: ", this.taken);
            }
            for(let i = 1; i < array.length; ++i){
                if(array[i].length == 4 && (!this.taken.includes(array[i])))
                    everyChecked = false;
                
                // execute if this array[i] has not been taken
                //console.log("taken: ", this.taken, array[i].substr(0, 4), array[i].substr(5, 4));
                if(array[i].length == 9 && !(this.taken.includes(array[i].substr(0, 4)) || (this.taken.includes(array[i].substr(5, 4))))){
                    //console.log("setting to false: ", id)
                    everyChecked = false;
                }   
            }
                if(!everyChecked){
                    this.findAllDeleted(id);
                    this.updateGraphDelete();
                }
            
        }
        for(var key in this.graph){
            let array = this.graph[key]
            for(let i = 0; i < array.length; ++i){
                if(!this.taken.includes(array[i])){
                    array.splice(i, 1);
                }
            }
            this.graph[key] = array;
        }

    }
    findAllDeleted(id) {
        var checkCourses = this.graph[id];
        if(checkCourses != undefined){
        // checking if any of the connections should be deleted from graph
        for (let i = 0; i < checkCourses.length; ++i) {
            let exist = false;
            for (var key in this.graph) {
                if (key == id)
                    continue;
                // if checkCourse exists as a value in any other key, then don't delete
                if (this.graph[key].includes(checkCourses[i])){
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                this.findAllDeleted(checkCourses[i]);
                delete this.graph[checkCourses[i]];
                if (this.taken.includes(checkCourses[i]))
                    this.taken.splice(this.taken.indexOf(checkCourses[i]), 1);
            }
        }
        delete this.graph[id];
        for (var key in this.graph) {
            let currArr = this.graph[key];
            for (let i = 0; i < currArr; ++i) {
                if (currArr[i] == id)
                    currArr.splice(i, 1);
            }
            this.graph[key] = currArr;
        }
    }
        this.taken.splice(this.taken.indexOf(id), 1);
        this.updateGraphDelete();
    }
    buildPrereqList(text) {
        let prereqList = [];
        var startIndex = 0;
        var i = 0;
        while (text[startIndex] == "1" || text[startIndex] == "2" || text[startIndex] == "3" || text[startIndex] == "4") {
            var name = text.slice(startIndex, startIndex + 4);
            prereqList[i] = [];
            prereqList[i].push(name);
            startIndex = startIndex + 4; //start Index corresponds to a comma
            let condition = text.slice(startIndex, text.slice(startIndex + 1).search(",") + startIndex).search("\"");
            while (condition == -1) {
                var item = text.slice(startIndex + 1, text.slice(startIndex + 1).search(",") + startIndex + 1);
                prereqList[i].push(item);
                // console.log("first:", (text.slice(startIndex+1)).search(","))
                // console.log("startIndex: ", startIndex)
                startIndex = text.slice(startIndex + 1).search(",") + (startIndex + 1);
                // console.log(startIndex)
                condition = text.slice(startIndex, text.slice(startIndex + 1).search(",") + startIndex).search("\"");
            }

            prereqList[i].push("-1")
            startIndex = text.slice(startIndex + 1).search("\n") + 1 + startIndex + 1; //start of a new line

            i++;
        }
        return prereqList;
    }
    buildCourseList(text) {
        var courseList = {}
        var startIndex = 0;
        var i = 0;
        while (text[startIndex] == "1" || text[startIndex] == "2" || text[startIndex] == "3" || text[startIndex] == "4") { //check if end of file is not reached
            var id = text.slice(startIndex, startIndex + 4);
            var name = text.slice(text.slice(startIndex).search("\"") + startIndex + 1, text.slice(text.slice(startIndex).search("\"") + startIndex + 1).search("\"") + text.slice(startIndex).search("\"") + startIndex + 1);
            //console.log("hello");
            //console.log(text.slice(startIndex).search("\""));
            //console.log(text.slice(text.slice(startIndex).search("\"") + startIndex + 1).search("\""));

            startIndex = text.slice(text.slice(startIndex).search("\"") + startIndex + 1).search("\"") + text.slice(startIndex).search("\"") + startIndex+1;

            var description = text.slice(startIndex + 2, text.slice(startIndex + 1).search("]") + 1 + startIndex + 1);
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
}



let graph = new Graph();
let courseInfo = graph.courseInfo;

function getDisplay() {
    var result = [];
    result.push([]);
    var layer = 0;
    let classes = graph.availableClasses();
    for (let i = 0; i < classes.length; ++i) {
        if (layer != parseInt(classes[i].substr(0, 1))) {
            layer = parseInt(classes[i].substr(0, 1));
        }
        while (result.length < layer) {
            result.push([]);
        }
        let dictionary = {};
        dictionary["id"] = classes[i];
        dictionary["name"] = courseInfo[classes[i]][0];
        dictionary["isTaken"] = graph.taken.includes(classes[i]);
        dictionary["category"] = courseInfo[classes[i]][1];
        dictionary["description"] = courseInfo[classes[i]][2];
        dictionary["term"] = courseInfo[classes[i]][3];
        result[layer - 1].push(dictionary);
    }
    // add taken classes into result
    for (let i = 1; i < graph.taken.length; ++i) {
        let layer = graph.taken[i].substr(0, 1);
        while (result.length < layer)
            result.push([]);
        let dictionary = {};
        dictionary["id"] = graph.taken[i];
        dictionary["name"] = courseInfo[graph.taken[i]][0];
        dictionary["isTaken"] = true;
        dictionary["category"] = courseInfo[graph.taken[i]][1];
        dictionary["description"] = courseInfo[graph.taken[i]][2];
        dictionary["term"] = courseInfo[graph.taken[i]][3];
        let added = false;
        for (let j = 0; j < result[layer - 1].length; ++j) {
            var id = result[layer - 1][j]["id"];
            if (id == graph.taken[i]) {
                added = true;
                break;
            }
            if (parseInt(graph.taken[i]) < parseInt(id)) {
                result[layer - 1].splice(j, 0, dictionary);
                added = true;
                break;
            }
        }
        if (!added)
            result[layer - 1].push(dictionary);
    
    }
    return result;
}

function check(id) {
    if (graph.taken.includes(id)) {
        graph.unclick(id);
    }
    else {
        graph.addClass(id);
    }
    return getDisplay();
}

function getCourseDetails(id) {
    let dictionary = {};
    dictionary["id"] = id;
    dictionary["name"] = courseInfo[id][0];
    dictionary["description"] = courseInfo[id][2];
    dictionary["category"] = courseInfo[id][1];
    dictionary["term"] = courseInfo[id][3];
    return dictionary;
}

check("1101")
check("2201")
check("2212")
check("3250")
console.log(check("1101"))
module.exports = {
    getDisplay,
    check
}
