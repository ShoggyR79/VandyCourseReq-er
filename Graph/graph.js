class Graph {
    constructor(){
        this.prereqs = [
            ["1101", "-1"],
            ["1104", "-1"],
            ["2212", "1101/1104", "-1"],
            ["2201", "1101/1104", "-1"],
            ["3250", "2201/2212", "-1"]
        ];
        this.prereqsSize = 5;
        this.taken = [
        ];
    }
    getPrereqs(){
        return this.prereqs;
    }
    addClass(id){
        this.taken.push(id);
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


var graph = new Graph();

/*
for(var i = 0; i < graph.availableClasses().length; ++i){
    console.log(graph.availableClasses()[i]);
}
*/



graph.addClass("1101");


for(var i = 0; i < graph.availableClasses().length; ++i){
    console.log(graph.availableClasses()[i]);
}