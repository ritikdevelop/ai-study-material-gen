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
            {text: "Generate a study material for JavaScript for Exam and level of difficulty will be Moderate with summary of course, List of Chapters along with summary  for each chapter, Topic list in each chapter all result in  JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"courseSummary\": \"This JavaScript study material covers moderate-level concepts essential for exam preparation.  It focuses on practical application and problem-solving, going beyond basic syntax to delve into intermediate-level topics.  The material is designed to equip students with a strong foundation for further JavaScript learning.\",\n  \"chapters\": [\n    {\n      \"chapterTitle\": \"Fundamentals of JavaScript\",\n      \"chapterSummary\": \"This chapter revisits the basics of JavaScript, focusing on essential concepts needed for more advanced topics. It covers data types, operators, control flow, and fundamental object manipulation.\",\n      \"topics\": [\n        \"Data Types (Number, String, Boolean, Null, Undefined, Symbol, BigInt)\",\n        \"Operators (Arithmetic, Comparison, Logical, Assignment)\",\n        \"Control Flow (if-else statements, switch statements, loops: for, while, do-while)\",\n        \"Functions (declarations, expressions, parameters, return values, arrow functions)\",\n        \"Objects (creation, accessing properties, methods, this keyword)\",\n        \"Arrays (creation, manipulation, methods)\",\n        \"Working with the DOM (basic document manipulation)\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Object-Oriented Programming (OOP) in JavaScript\",\n      \"chapterSummary\": \"This chapter introduces the concepts of OOP in JavaScript, covering classes, inheritance, and prototypes.  It emphasizes the practical application of these concepts in building more complex and maintainable code.\",\n      \"topics\": [\n        \"Classes and Constructors\",\n        \"Inheritance (extends keyword, super keyword)\",\n        \"Prototypes and Prototypal Inheritance\",\n        \"Encapsulation (private and public members)\",\n        \"Polymorphism\",\n        \"Common design patterns (brief overview)\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Working with Asynchronous JavaScript\",\n      \"chapterSummary\": \"This chapter delves into asynchronous programming, covering promises, async/await, and their importance in handling non-blocking operations. It emphasizes the importance of error handling in asynchronous code.\",\n      \"topics\": [\n        \"Callbacks\",\n        \"Promises (creation, chaining, error handling)\",\n        \"Async/Await\",\n        \"Fetch API (making network requests)\",\n        \"Error handling in asynchronous code\",\n        \"Understanding the event loop\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Advanced JavaScript Concepts\",\n      \"chapterSummary\": \"This chapter explores more advanced topics, including closures, scope, and functional programming paradigms.  It builds upon previous chapters to provide a more comprehensive understanding of JavaScript's capabilities.\",\n      \"topics\": [\n        \"Closures\",\n        \"Scope (lexical scoping, hoisting)\",\n        \"Higher-Order Functions\",\n        \"Functional Programming Concepts (map, filter, reduce)\",\n        \"Modules (import/export)\",\n        \"Regular Expressions (basic to intermediate usage)\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Testing and Debugging\",\n      \"chapterSummary\": \"This chapter covers essential techniques for writing testable and maintainable JavaScript code. It emphasizes the importance of debugging skills for efficient problem-solving.\",\n      \"topics\": [\n        \"Writing testable code\",\n        \"Unit testing (introduction and examples)\",\n        \"Debugging techniques (using browser developer tools)\",\n        \"Common JavaScript errors and how to avoid them\",\n        \"Linting and code style guidelines\"\n      ]\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
