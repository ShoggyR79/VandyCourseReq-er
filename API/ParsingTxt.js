
const fs = require('fs');
let filename = "API/course_file.txt";
var text = fs.readFileSync(filename, "utf-8");
console.log(text);

