const { jsPDF } = require("jspdf"); // will automatically load the node version




export function printPDF(courses, doc) {
  var gap = 0;
  var count = 0;
  var tmp = '';
  doc.setFontSize(26);
  doc.setFont(undefined, "bold").text("Recommended Courses", 10, 15 + 10 * gap);
  doc.setFontSize(16);
  for (let i = 0; i < courses.length; i++) {
    for (let j = 0; j < courses[i].length; j++) {
      if (!courses[i][j].isTaken) {
        tmp = textWrapper(courses[i][j].description);
        doc.setFont(undefined, "bold").text("CS" + courses[i][j].id + ": " + courses[i][j].name, 10, 30 + 10 * gap);
        doc.setFont(undefined, "normal").text(tmp[0], 10, 30 + 10 * (gap + 1));
        gap = gap + 3 + tmp[1] / 2;
        count++;
        if (count % 4 == 0) {
          doc.addPage();
          gap = 0;
        }
      }

    }

  }
  const date = new Date();
  doc.save("report " + date + ".pdf"); // will save the file in the current working directory
}

export function printTakenPDF(courses, doc) {
  var gap = 0;
  var count = 0;
  var tmp = '';
  doc.setFontSize(26);
  doc.setFont(undefined, "bold").text("Recommended Courses", 10, 15 + 10 * gap);
  doc.setFontSize(16);
  for (let i = 0; i < courses.length; i++) {
    for (let j = 0; j < courses[i].length; j++) {
      if (courses[i][j].isTaken) {
        tmp = textWrapper(courses[i][j].description);
        doc.setFont(undefined, "bold").text("CS" + courses[i][j].id + ": " + courses[i][j].name, 10, 30 + 10 * gap);
        doc.setFont(undefined, "normal").text(tmp[0], 10, 30 + 10 * (gap + 1));
        gap = gap + 3 + tmp[1] / 2;
        count++;
        if (count % 4 == 0) {
          doc.addPage();
          gap = 0;
        }
      }

    }

  }
  const date = new Date();
  doc.save("report " + date + ".pdf"); // will save the file in the current working directory
}

function textWrapper(text) {
  var tmp = ""
  var start = 0;
  var index = 65;
  var count = 0;
  while (index < text.length) {
    tmp += text.slice(start, text.slice(index).search(" ") + index);
    tmp = tmp + "\n";
    start = tmp.length - 1;
    index = start + 65;
    count = count + 1;
  }
  return [tmp, count];
}
