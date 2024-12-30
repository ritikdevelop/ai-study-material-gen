const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const courseOutlineAIModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a study material for JavaScript for Exam and level of difficulty will be Moderate with summary of course, List of Chapters along with summary  for each chapter, Topic list in each chapter all result in  JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "courseSummary": "This JavaScript study material covers moderate-level concepts essential for exam preparation.  It focuses on practical application and problem-solving, going beyond basic syntax to delve into intermediate-level topics.  The material is designed to equip students with a strong foundation for further JavaScript learning.",\n  "chapters": [\n    {\n      "chapterTitle": "Fundamentals of JavaScript",\n      "chapterSummary": "This chapter revisits the basics of JavaScript, focusing on essential concepts needed for more advanced topics. It covers data types, operators, control flow, and fundamental object manipulation.",\n      "topics": [\n        "Data Types (Number, String, Boolean, Null, Undefined, Symbol, BigInt)",\n        "Operators (Arithmetic, Comparison, Logical, Assignment)",\n        "Control Flow (if-else statements, switch statements, loops: for, while, do-while)",\n        "Functions (declarations, expressions, parameters, return values, arrow functions)",\n        "Objects (creation, accessing properties, methods, this keyword)",\n        "Arrays (creation, manipulation, methods)",\n        "Working with the DOM (basic document manipulation)"\n      ]\n    },\n    {\n      "chapterTitle": "Object-Oriented Programming (OOP) in JavaScript",\n      "chapterSummary": "This chapter introduces the concepts of OOP in JavaScript, covering classes, inheritance, and prototypes.  It emphasizes the practical application of these concepts in building more complex and maintainable code.",\n      "topics": [\n        "Classes and Constructors",\n        "Inheritance (extends keyword, super keyword)",\n        "Prototypes and Prototypal Inheritance",\n        "Encapsulation (private and public members)",\n        "Polymorphism",\n        "Common design patterns (brief overview)"\n      ]\n    },\n    {\n      "chapterTitle": "Working with Asynchronous JavaScript",\n      "chapterSummary": "This chapter delves into asynchronous programming, covering promises, async/await, and their importance in handling non-blocking operations. It emphasizes the importance of error handling in asynchronous code.",\n      "topics": [\n        "Callbacks",\n        "Promises (creation, chaining, error handling)",\n        "Async/Await",\n        "Fetch API (making network requests)",\n        "Error handling in asynchronous code",\n        "Understanding the event loop"\n      ]\n    },\n    {\n      "chapterTitle": "Advanced JavaScript Concepts",\n      "chapterSummary": "This chapter explores more advanced topics, including closures, scope, and functional programming paradigms.  It builds upon previous chapters to provide a more comprehensive understanding of JavaScript\'s capabilities.",\n      "topics": [\n        "Closures",\n        "Scope (lexical scoping, hoisting)",\n        "Higher-Order Functions",\n        "Functional Programming Concepts (map, filter, reduce)",\n        "Modules (import/export)",\n        "Regular Expressions (basic to intermediate usage)"\n      ]\n    },\n    {\n      "chapterTitle": "Testing and Debugging",\n      "chapterSummary": "This chapter covers essential techniques for writing testable and maintainable JavaScript code. It emphasizes the importance of debugging skills for efficient problem-solving.",\n      "topics": [\n        "Writing testable code",\n        "Unit testing (introduction and examples)",\n        "Debugging techniques (using browser developer tools)",\n        "Common JavaScript errors and how to avoid them",\n        "Linting and code style guidelines"\n      ]\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

export const generateNotesAIModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate exam material detail content for each chapter, Make sure to includes all topic point in the content, make sure to give content in HTML format (Do not ADD HTMLKL, Head, Body, title tag), the chapters: [\n{\n"chapterTitle": "Fundamentals of JavaScript",\n"chapterSummary": "This chapter revisits the basics of JavaScript, focusing on essential concepts needed for more advanced topics. It covers data types, operators, control flow, and fundamental object manipulation.",\n"topics": [\n"Data Types (Number, String, Boolean, Null, Undefined, Symbol, BigInt)",\n"Operators (Arithmetic, Comparison, Logical, Assignment)",\n"Control Flow (if-else statements, switch statements, loops: for, while, do-while)",\n"Functions (declarations, expressions, parameters, return values, arrow functions)",\n"Objects (creation, accessing properties, methods, this keyword)",\n"Arrays (creation, manipulation, methods)",\n"Working with the DOM (basic document manipulation)"\n]\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "```html\n<h3>Chapter 1: Fundamentals of JavaScript</h3>\n<p>This chapter reviews the essential JavaScript concepts necessary for understanding more advanced topics.  It covers data types, operators, control flow, functions, objects, arrays, and basic DOM manipulation.</p>\n\n<h4>1.1 Data Types</h4>\n<ul>\n  <li><strong>Number:</strong>  Represents numeric values (integers and floating-point numbers).</li>\n  <li><strong>String:</strong> Represents textual data enclosed in single (' ') or double (\" \") quotes.</li>\n  <li><strong>Boolean:</strong> Represents truth values (<code>true</code> or <code>false</code>).</li>\n  <li><strong>Null:</strong> Represents the intentional absence of a value.</li>\n  <li><strong>Undefined:</strong> Represents a variable that has been declared but has not been assigned a value.</li>\n  <li><strong>Symbol:</strong> Represents a unique and immutable value.</li>\n  <li><strong>BigInt:</strong> Represents integers of arbitrary precision.</li>\n</ul>\n\n<h4>1.2 Operators</h4>\n<ul>\n  <li><strong>Arithmetic Operators:</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code> (modulo), <code>**</code> (exponentiation), <code>++</code> (increment), <code>--</code> (decrement).</li>\n  <li><strong>Comparison Operators:</strong> <code>==</code> (loose equality), <code>===</code> (strict equality), <code>!=</code> (loose inequality), <code>!==</code> (strict inequality), <code>></code>, <code><</code>, <code>>=</code>, <code><=</code>.</li>\n  <li><strong>Logical Operators:</strong> <code>&&</code> (AND), <code>||</code> (OR), <code>!</code> (NOT).</li>\n  <li><strong>Assignment Operators:</strong> <code>=</code>, <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>%=</code>.</li>\n</ul>\n\n<h4>1.3 Control Flow</h4>\n<ul>\n  <li><strong><code>if-else</code> statements:</strong>  Conditional execution of code blocks.</li>\n  <li><strong><code>switch</code> statements:</strong>  Efficiently handling multiple conditional branches.</li>\n  <li><strong>Loops:</strong>\n    <ul>\n      <li><strong><code>for</code> loop:</strong>  Iterates a specific number of times.</li>\n      <li><strong><code>while</code> loop:</strong>  Repeats a block of code as long as a condition is true.</li>\n      <li><strong><code>do-while</code> loop:</strong>  Similar to <code>while</code>, but guarantees at least one execution.</li>\n    </ul>\n  </li>\n</ul>\n\n<h4>1.4 Functions</h4>\n<ul>\n  <li><strong>Function Declarations:</strong> Defining functions using the <code>function</code> keyword.</li>\n  <li><strong>Function Expressions:</strong> Assigning functions to variables.</li>\n  <li><strong>Parameters and Arguments:</strong> Passing data to functions.</li>\n  <li><strong>Return Values:</strong> Returning data from functions.</li>\n  <li><strong>Arrow Functions:</strong> Concise syntax for defining functions.</li>\n</ul>\n\n<h4>1.5 Objects</h4>\n<ul>\n  <li><strong>Object Creation:</strong> Using object literals <code>{}</code> or constructors.</li>\n  <li><strong>Accessing Properties:</strong> Using dot notation (<code>object.property</code>) or bracket notation (<code>object['property']</code>).</li>\n  <li><strong>Methods:</strong> Functions within objects.</li>\n  <li><strong><code>this</code> keyword:</strong> Refers to the current object.</li>\n</ul>\n\n<h4>1.6 Arrays</h4>\n<ul>\n  <li><strong>Array Creation:</strong> Using array literals <code>[]</code>.</li>\n  <li><strong>Array Manipulation:</strong> Adding, removing, and modifying elements.</li>\n  <li><strong>Array Methods:</strong>  <code>push()</code>, <code>pop()</code>, <code>shift()</code>, <code>unshift()</code>, <code>splice()</code>, <code>slice()</code>, <code>map()</code>, <code>filter()</code>, <code>reduce()</code>, etc.</li>\n</ul>\n\n<h4>1.7 Working with the DOM</h4>\n<ul>\n  <li>Basic manipulation of HTML elements using JavaScript (e.g., changing content, styles, attributes).</li>\n  <li>Selecting elements using methods like <code>getElementById()</code>, <code>querySelector()</code>, and <code>querySelectorAll()</code>.</li>\n</ul>\n```\n",
        },
      ],
    },
  ],
});
