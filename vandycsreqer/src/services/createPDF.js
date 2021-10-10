const { jsPDF } = require("jspdf"); // will automatically load the node version
let courses = [
  [
    {
      id: '1000',
      name: 'The Beauty and Joy of Computing',
      isTaken: true,
      category: 'none\r',
      description: '"Fundamental concepts of computing including abstraction, algorithms, design, and distributed computation. Hands-on curriculum focusing on translating ideas into working computer programs and developing a mastery of practical computational literacy. The relevance and societal impact of computer science are emphasized. Students in the School of Engineering may only receive open elective credit for CS 1000. FALL, SPRING. [3]',
      term: 'FALL/SPRING'
    },
    {
      id: '1100',
      name: 'Applied Programming and Problem Solving with Python',
      isTaken: false,
      category: 'none\r',
      description: '"Foundations of computing using Python. Programming fundamentals. Designing, debugging, running programs. Scalar, vector, and matrix computations for scientific computing and data science. Numeric and text processing. Basic data visualization techniques. Intended for students other than computer science and computer engineering majors. Not open to students who have earned credit for CS 1104 or 2204 without permission. Total credit for CS/DS 1100 and CS 1104 will not exceed 4 credit hours. Total credit for CS/DS 1100 and CS 2204 will not exceed 5 hours. Credit hours reduced from second course taken (or from test or transfer credit) as appropriate. FALL, SPRING. [3]',
      term: 'FALL/SPRING'
    },
    {
      id: '1101',
      name: 'Programming and Problem Solving',
      isTaken: true,
      category: 'core\r',
      description: '"An intensive introduction to algorithm development and problem solving on the computer. Structured problem definition, top down and modular algorithm design. Running, debugging, and testing programs. Program documentation. Not open to students who have earned credit for CS 1104 without permission. Total credit for this course and CS 1104 will not exceed 3 credit hours. Credit hours reduced from second course taken (or from test or transfer credit) as appropriate. FALL, SPRING. [3]',
      term: 'FALL/SPRING'
    },
    {
      id: '1103',
      name: 'Introductory Programming for Engineers and Scientists',
      isTaken: false,
      category: 'none\r',
      description: '"Problem solving on the computer. Inte    g MATLAB. Generic programming concepts. FALL, SPRING. [3]',
      term: 'FALL/SPRING'
    },
    {
      id: '1104',
      name: 'Programming and Problem Solving with Python',
      isTaken: false,
      category: 'core\r',
      description: '"An intensive introduction to algorithm development and problem solving using the Python programming language. Structured problem definition, top down and modular algorithm design. Running, debugging, and testing programs. Program documentation. Not open to students who have earned credit for CS 1100, DS 1100, or CS 1101 without permission. Total credit for this course and CS 1100 will not exceed 4 credit hours. Total credit for this course and DS 1100 will not exceed 4 credit hours. Total credit for this course and CS 1101 will not exceed 3 credit hours. Credit hours reduced from second course taken (or from test or transfer credit) as appropriate. FALL, SPRING. [3]',
      term: 'FALL/SPRING'
    },
    {
      id: '1151',
      name: 'Computers and Ethics',
      isTaken: false,
      category: 'core\r',
      description: '"Analysis and discussion of problems created for society by computers, and how these problems pose ethical dilemmas to both computer professionals and computer users. Topics include: computer crime, viruses, software theft, ethical implications of life-critical systems. FALL, SPRING. [3]',
      term: 'FALL/SPRING'
    }
  ],
  [
    {
      id: '2201',
      name: 'Program Design and Data Structures',
      isTaken: true,
      category: 'core\r',
      description: '"Continuation of CS 1101/1104. The study of elementary data structures, their associated algorithms and their application in problems; rigorous development of programming techniques and style; design and implementation of programs with multiple modules, using good data structures and good programming style. Prerequisite: CS 1101 or 1104. FALL, SPRING. [3]',
      term: 'FALL/SPRING'
    },
    {
      id: '2212',
      name: 'Discrete Structures',
      isTaken: false,
      category: 'core\r',
      description: '"Survey of the mathematical tools necessary for an understanding of computer science. Sets, relations, functions, basic counting techniques, permutations, combinations, graphs, recurrence relations, simple analysis of algorithms, O-notation, Boolean algebra, propositional calculus, and numeric representation. Prerequisite: A course in computer science or two semesters of calculus. FALL, SPRING. [3]',
      term: 'FALL/SPRING'
    },
    {
      id: '2231',
      name: 'Computer Organization',
      isTaken: false,
      category: 'hardware\r',
      description: '"The entire hierarchical structure of computer architecture, beginning at the lowest level with a simple machine model (e.g., a simple von Neumann machine). Processors, process handling, IO handling, and assembler concepts. Graduate credit not given for computer science majors. Prerequisite: CS 2201. Corequisite: EECE 2116, EECE 2116L. FALL, SPRING. [3]',
      term: 'FALL/SPRING'
    }
  ],
  [
    {
      id: '3250',
      name: 'Algorithms',
      isTaken: true,
      category: 'core\r',
      description: '"Advanced data structures, systematic study and analysis of important algorithms for searching; sorting; string processing; mathematical, geometrical, and graph algorithms, classes of P and NP, NP-complete and intractable problems. Prerequisite: CS 2201, CS 2212. FALL, SPRING. [3]',
      term: 'FALL/SPRING'
    },
    {
      id: '3251',
      name: 'Intermediate Software Design',
      isTaken: false,
      category: 'core\r',
      description: '"High quality development and reuse of architectural patterns, design patterns, and software components. Theoretical and practical aspects of developing, documenting, testing, and applying reusable class libraries and object-oriented frameworks using object-oriented and component-based programming languages and tools. Prerequisite: CS 2201. FALL, SPRING [3]',
      term: 'FALL/SPRING'
    },
    {
      id: '3259',
      name: 'Project in Computer Animation Design and Technology',
      isTaken: false,
      category: 'gavr\r',
      description: '"Principles and techniques of computer animation. Topics include storyboarding, camera control, skeletons, inverse kinematics, splines, keyframing, motion capture, dynamic simulation, particle systems, facial animation, and motion perception. Students work in groups on the design, modeling, animation, and rendering of a computer animation project. Prerequisite: MATH 2400, 2410, 2501, or 2600; CS 2201. FALL. [3]',
      term: 'FALL'
    },
    {
      id: '3262',
      name: 'Applied Machine Learning',
      isTaken: false,
      category: 'mlai\r',
      description: '"Fundamentals of machine learning with emphasis on practical applications to data science problems. Supervised learning (linear and logistic regression, decision trees, support vector machines, neural networks, and deep learning), unsupervised learning (feature selection, data clustering, dimensionality reduction); ethical principles and social implications of machine learning. Intended for students other than computer science majors. Prerequisite: One of CS 1100, 2201, or 2204; one of BME 3200, BSCI 3270, CE 3300, DS 2100, ECON 1500 or 1510, MATH 2810 or 2820 or 2821, PSY 2100, PSY-PC 2110, or SOC 2100. FALL, SPRING. [3]',
      term: 'FALL/SPRING'
    },
    {
      id: '3265',
      name: 'Database Management Systems',
      isTaken: false,
      category: 'data\r',
      description: '"Logical and physical organization of databases. Data models and query languages, with emphasis on the relational model and its semantics. Data independence, security, integrity, concurrency. Prerequisite: CS 2201. [3]',
      term: 'FALL/SPRING'
    },
    {
      id: '3274',
      name: 'Modeling and Simulation',
      isTaken: false,
      category: 'softwareED\r',
      description: '"General theory of modeling and simulation of a variety of systems: physical processes, computer systems, biological systems, and manufacturing processes. Principles of discrete-event, continuous, and hybrid system modeling, simulation algorithms for the different modeling paradigms, methodologies for constructing models of a number of realistic systems, and analysis of system behavior. Computational issues in modeling and analysis of systems. Stochastic simulations. Prerequisite: CS 2201. [3]',
      term: 'FALL/SPRING'
    },
    {
      id: '3860',
      name: 'Undergraduate Research',
      isTaken: false,
      category: 'research\r',
      description: '"Open to qualified majors with consent of instructor and adviser. No more than 6 hours may be counted towards the computer science major. Prerequisite: CS 2201. [1-3 each semester]',
      term: 'FALL/SPRING'
    },
    {
      id: '3861',
      name: 'Undergraduate Research',
      isTaken: false,
      category: 'research\r',
      description: '"Open to qualified majors with consent of instructor and adviser. No more than 6 hours may be counted towards the computer science major. Prerequisite: CS 2201. [1-3 each semester]',
      term: 'FALL/SPRING'
    }
  ]
]
console.log(courses.length)


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
