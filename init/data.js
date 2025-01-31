let data = [
    {
      title: 'Java Programming Course',
      tutor: 'Kunal Kushwaha',
      image: 'https://i.ytimg.com/vi/rZ41y93P2Qo/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCVLdFTYGBOx_XHYIv_sHrVY9shRw',
      tutorlink: 'https://www.youtube.com/@KunalKushwaha',
      syllabus: [
        {
          chapter: 'Introduction to Programming',
          lectureurl: 'wn49bJOYAZM',
          notes: 'This is the sample notes for introduction to programming..!\r\n' +
            'By tutor Kunal Kushwaha\r\n',
          quiz: [
            {
              qno: 1,
              qname: 'What is programming?',
              options: [
                {option: 'Writing algorithms'}, 
                {option: 'Debugging errors'}, 
                {option: 'Solving problems with code'}, 
                {option: 'All of the above'},
              ],
              answer: 'All of the above',
            },
            {
              qno: 2,
              qname: 'Which language is used for Android app development?',
              options: [
                {option: 'Java'}, 
                {option: 'Python'}, 
                {option: 'C++'}, 
                {option: 'Ruby'},
              ],
              answer: 'Java',
            },
            {
              qno: 3,
              qname: 'Which is an example of a high-level programming language?',
              options: [
                {option: 'Assembly'}, 
                {option: 'C'}, 
                {option: 'Python'}, 
                {option: 'Machine Code'},
              ],
              answer: 'Python',
            },
          ],
        },
        {
          chapter: 'Flow of Program - Flowcharts & Pseudocode',
          lectureurl: 'lhELGQAV4gg',
          notes: 'this is the notes for flow chart',
          quiz: [
            {
              qno: 1,
              qname: 'What is a flowchart?',
              options: [
                {option: 'A graphical representation of steps'}, 
                {option: 'Code for a program'}, 
                {option: 'Debugging tool'}, 
                {option: 'None'},
              ],
              answer: 'A graphical representation of steps',
            },
            {
              qno: 2,
              qname: 'What shape represents a decision in a flowchart?',
              options: [
                {option: 'Rectangle'}, 
                {option: 'Diamond'}, 
                {option: 'Circle'}, 
                {option: 'Arrow'},
              ],
              answer: 'Diamond',
            },
            {
              qno: 3,
              qname: 'What does pseudocode represent?',
              options: [
                {option: 'Code syntax'}, 
                {option: 'Programming logic'}, 
                {option: 'Errors in code'}, 
                {option: 'Machine language'},
              ],
              answer: 'Programming logic',
            },
          ],
        },
        {
          chapter: 'Introduction to Java - Architecture & Installation',
          lectureurl: '4EP8YzcN0hQ',
          notes: 'Your Notes..!',
          quiz: [
            {
              qno: 1,
              qname: 'What is the Java Virtual Machine (JVM) responsible for?',
              options: [
                { option: 'Running Java programs directly' },
                { option: 'Translating Java bytecode into machine code' },
                { option: 'Creating Java programs' },
                { option: 'Managing database connections' }
              ],
              answer: 'Translating Java bytecode into machine code'
            },
            {
              qno: 2,
              qname: 'Which of the following is NOT part of the Java Runtime Environment (JRE)?',
              options: [
                { option: 'JVM' },
                { option: 'JDK' },
                { option: 'Java class libraries' },
                { option: 'Java plugins' }
              ],
              answer: 'JDK'
            },
            {
              qno: 3,
              qname: 'Which Java installation is required to compile Java programs?',
              options: [
                { option: 'JVM' },
                { option: 'JRE' },
                { option: 'JDK' },
                { option: 'JRE and JVM' }
              ],
              answer: 'JDK'
            },
          ],          
        },
        {
          chapter: 'First Java Program - Input/Output, Debugging and Datatypes',
          lectureurl: 'TAtrPoaJ7gc',
          notes: 'Your Notes..!',
          quiz: [
            {
              qno: 1,
              qname: 'Which method is used to print output to the console in Java?',
              options: [
                { option: 'System.out.println()' },
                { option: 'Console.write()' },
                { option: 'System.print()' },
                { option: 'Print.console()' }
              ],
              answer: 'System.out.println()'
            },
            {
              qno: 2,
              qname: 'Which of the following is the correct way to declare a variable in Java?',
              options: [
                { option: 'int num = 10;' },
                { option: 'integer num = 10;' },
                { option: 'var num = 10;' },
                { option: 'number num = 10;' }
              ],
              answer: 'int num = 10;'
            },
            {
              qno: 3,
              qname: 'What will be the output of the following Java code?\n' +
                     'int a = 5;\n' +
                     'int b = 10;\n' +
                     'System.out.println(a + b);',
              options: [
                { option: '15' },
                { option: '510' },
                { option: 'Error' },
                { option: 'None of the above' }
              ],
              answer: '15'
            },
          ],          
        },
        {
          chapter: 'Conditionals and Loops + Calculator Program',
          lectureurl: 'ldYLYRNaucM',
          notes: 'Your Notes..!',
          quiz: [
            {
              qno: 1,
              qname: 'Which of the following is the correct syntax for an if statement in Java?',
              options: [
                { option: 'if (condition) { }' },
                { option: 'if (condition) []' },
                { option: 'if (condition) ()' },
                { option: 'if condition { }' }
              ],
              answer: 'if (condition) { }'
            },
            {
              qno: 2,
              qname: 'Which keyword is used to exit a loop in Java?',
              options: [
                { option: 'break' },
                { option: 'stop' },
                { option: 'exit' },
                { option: 'end' }
              ],
              answer: 'break'
            },
            {
              qno: 3,
              qname: 'What will be the output of the following Java code?\n' +
                     'int i = 0;\n' +
                     'while (i < 3) {\n' +
                     '  System.out.println(i);\n' +
                     '  i++;\n' +
                     '}',
              options: [
                { option: '0\n1\n2' },
                { option: '0\n2\n3' },
                { option: '1\n2\n3' },
                { option: 'Infinite loop' }
              ],
              answer: '0\n1\n2'
            },
            {
              qno: 4,
              qname: 'Which loop is best when the number of iterations is known beforehand?',
              options: [
                { option: 'for loop' },
                { option: 'while loop' },
                { option: 'do-while loop' },
                { option: 'None of the above' }
              ],
              answer: 'for loop'
            },
            {
              qno: 5,
              qname: 'What will the following code output?\n' +
                     'int num1 = 5;\n' +
                     'int num2 = 10;\n' +
                     'if (num1 < num2) {\n' +
                     '  System.out.println("num1 is less than num2");\n' +
                     '} else {\n' +
                     '  System.out.println("num1 is not less than num2");\n' +
                     '}',
              options: [
                { option: 'num1 is less than num2' },
                { option: 'num1 is not less than num2' },
                { option: 'Error' },
                { option: 'None of the above' }
              ],
              answer: 'num1 is less than num2'
            },
          ],          
        },
        {
          chapter: 'Switch Statements + Nested Case in Java',
          lectureurl: 'mA23x39DjbI',
          notes: 'Your Notes..!',
          quiz: [
            {
              qno: 1,
              qname: 'Which of the following is the correct syntax for a switch statement in Java?',
              options: [
                { option: 'switch (expression) { case value: break; }' },
                { option: 'switch expression { case value break; }' },
                { option: 'switch { expression case value break; }' },
                { option: 'switch (expression) { value case break; }' }
              ],
              answer: 'switch (expression) { case value: break; }'
            },
            {
              qno: 2,
              qname: 'What will happen if you forget to include the break statement in a switch case?',
              options: [
                { option: 'The program will skip to the next case' },
                { option: 'The program will give an error' },
                { option: 'The program will stop executing' },
                { option: 'Nothing happens' }
              ],
              answer: 'The program will skip to the next case'
            },
            {
              qno: 3,
              qname: 'Which of the following is true about a nested switch statement in Java?',
              options: [
                { option: 'A switch statement can be used inside a case of another switch statement' },
                { option: 'Nested switch statements are not allowed in Java' },
                { option: 'Only if statements can be nested, not switch statements' },
                { option: 'Nested switch statements are only allowed in methods' }
              ],
              answer: 'A switch statement can be used inside a case of another switch statement'
            },
            {
              qno: 4,
              qname: 'What will be the output of the following code?\n' +
                     'int day = 3;\n' +
                     'switch (day) {\n' +
                     '  case 1:\n' +
                     '    System.out.println("Monday");\n' +
                     '    break;\n' +
                     '  case 2:\n' +
                     '    System.out.println("Tuesday");\n' +
                     '    break;\n' +
                     '  case 3:\n' +
                     '    System.out.println("Wednesday");\n' +
                     '    break;\n' +
                     '  default:\n' +
                     '    System.out.println("Invalid day");\n' +
                     '}',
              options: [
                { option: 'Monday' },
                { option: 'Tuesday' },
                { option: 'Wednesday' },
                { option: 'Invalid day' }
              ],
              answer: 'Wednesday'
            },
            {
              qno: 5,
              qname: 'What will the following nested switch statement output?\n' +
                     'int x = 2, y = 3;\n' +
                     'switch (x) {\n' +
                     '  case 1:\n' +
                     '    switch (y) {\n' +
                     '      case 1:\n' +
                     '        System.out.println("Case 1-1");\n' +
                     '        break;\n' +
                     '      case 2:\n' +
                     '        System.out.println("Case 1-2");\n' +
                     '        break;\n' +
                     '    }\n' +
                     '    break;\n' +
                     '  case 2:\n' +
                     '    switch (y) {\n' +
                     '      case 1:\n' +
                     '        System.out.println("Case 2-1");\n' +
                     '        break;\n' +
                     '      case 2:\n' +
                     '        System.out.println("Case 2-2");\n' +
                     '        break;\n' +
                     '    }\n' +
                     '    break;\n' +
                     '}',
              options: [
                { option: 'Case 1-1' },
                { option: 'Case 2-1' },
                { option: 'Case 1-2' },
                { option: 'Case 2-2' }
              ],
              answer: 'Case 2-2'
            },
          ],          
        },
        {
          chapter: 'Functions / Methods in Java',
          lectureurl: 'vvanI8NRlSI',
          notes: 'This is my saved notes',
          quiz: [
            {
              qno: 1,
              qname: 'Which of the following is the correct way to declare a method in Java?',
              options: [
                { option: 'public void myMethod() {}' },
                { option: 'void public myMethod() {}' },
                { option: 'method void myMethod() {}' },
                { option: 'public void {myMethod()} {}' }
              ],
              answer: 'public void myMethod() {}'
            },
            {
              qno: 2,
              qname: 'What is the default return type of a method in Java if no return type is specified?',
              options: [
                { option: 'void' },
                { option: 'null' },
                { option: 'int' },
                { option: 'Object' }
              ],
              answer: 'void'
            },
            {
              qno: 3,
              qname: 'Which of the following is true about method overloading in Java?',
              options: [
                { option: 'It allows methods to have the same name but different parameter lists' },
                { option: 'It requires methods to have different names' },
                { option: 'It can be used to change the return type of a method' },
                { option: 'It is not allowed in Java' }
              ],
              answer: 'It allows methods to have the same name but different parameter lists'
            },
            {
              qno: 4,
              qname: 'What will be the output of the following code?\n' +
                     'public class Main {\n' +
                     '  public static void main(String[] args) {\n' +
                     '    System.out.println(sum(5, 10));\n' +
                     '  }\n' +
                     '  public static int sum(int a, int b) {\n' +
                     '    return a + b;\n' +
                     '  }\n' +
                     '}',
              options: [
                { option: '15' },
                { option: '50' },
                { option: '510' },
                { option: 'Error' }
              ],
              answer: '15'
            },
            {
              qno: 5,
              qname: 'What is the purpose of the "return" statement in a method?',
              options: [
                { option: 'To stop the method execution and pass back a result' },
                { option: 'To execute the method again' },
                { option: 'To declare the return type of the method' },
                { option: 'To call another method' }
              ],
              answer: 'To stop the method execution and pass back a result'
            },
          ],          
        },
        {
          chapter: 'Introduction to Arrays and ArrayList in Java',
          lectureurl: 'n60Dn0UsbEk',
          notes: 'Switch Statements + Nested Case in Java\r\n',
          quiz: [
            {
              qno: 1,
              qname: 'What is the index of the first element in an array in Java?',
              options: [
                { option: '0' },
                { option: '1' },
                { option: '-1' },
                { option: 'Depends on the size of the array' }
              ],
              answer: '0'
            },
            {
              qno: 2,
              qname: 'Which of the following is the correct way to declare an array of integers in Java?',
              options: [
                { option: 'int[] arr;' },
                { option: 'int arr[];' },
                { option: 'Array<int> arr;' },
                { option: 'Both a and b' }
              ],
              answer: 'Both a and b'
            },
            {
              qno: 3,
              qname: 'Which method is used to add an element to an ArrayList in Java?',
              options: [
                { option: 'add()' },
                { option: 'append()' },
                { option: 'insert()' },
                { option: 'put()' }
              ],
              answer: 'add()'
            },
            {
              qno: 4,
              qname: 'What will happen if you try to access an index that is out of bounds in an array?',
              options: [
                { option: 'It will return null' },
                { option: 'It will throw an ArrayIndexOutOfBoundsException' },
                { option: 'It will return 0' },
                { option: 'It will cause an infinite loop' }
              ],
              answer: 'It will throw an ArrayIndexOutOfBoundsException'
            },
            {
              qno: 5,
              qname: 'Which of the following is true about ArrayList in Java?',
              options: [
                { option: 'ArrayList can hold only primitive types' },
                { option: 'ArrayList can dynamically resize' },
                { option: 'ArrayList is a fixed size collection' },
                { option: 'ArrayList cannot hold objects' }
              ],
              answer: 'ArrayList can dynamically resize'
            },
          ],          
        },
      ],
    },
    {
      title: 'Web Development Course',
      tutor: 'Apna College',
      image: 'https://i.ytimg.com/vi/l1EssrLxt7E/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBeHsL0IAwmp4nDP4YTVkzvG9Z2OA',
      tutorlink: 'https://www.youtube.com/@ApnaCollegeOfficial',
      syllabus: [
        {
          chapter: 'HTML Tutorial for Beginners',
          lectureurl: 'HcOc7P5BMi4',
          notes: 'Your Notes..!jhuu\r\n\r\nthis is the sample notes',
          quiz: [
            {
              qno: 1,
              qname: 'What is the full form of HTML?',
              options: [
                {option: 'HyperText Markup Language'}, 
                {option: 'High Text Machine Learning'}, 
                {option: 'Hyperlinks Text Markup Language'}, 
                {option: 'Hyper Type Making Language'},
              ],
              answer: 'HyperText Markup Language',
            },
            {
              qno: 2,
              qname: 'Which tag is used to create a hyperlink in HTML?',
              options: [
                {option: '<a>'}, 
                {option: '<link>'}, 
                {option: '<href>'}, 
                {option: '<url>'},
              ],
              answer: '<a>',
            },
            {
              qno: 3,
              qname: 'Which tag is used to create a table?',
              options: [
                {option: '<table>'}, 
                {option: '<tbl>'}, 
                {option: '<tab>'}, 
                {option: '<tr>'},
              ],
              answer: '<table>',
            },
          ],
        },
        {
          chapter: 'CSS Tutorial for Beginners',
          lectureurl: 'ESnrn1kAD4E',
          notes: 'Your Notes..!',
          quiz: [
            {
              qno: 1,
              qname: 'What does CSS stand for?',
              options: [
                {option: 'Creative Style Sheets'}, 
                {option: 'Cascading Style Sheets'}, 
                {option: 'Computer Style Sheets'}, 
                {option: 'Colorful Style Sheets'},
              ],
              answer: 'Cascading Style Sheets',
            },
            {
              qno: 2,
              qname: 'Which property is used to change text color?',
              options: [
                {option: 'color'}, 
                {option: 'background-color'}, 
                {option: 'text-color'}, 
                {option: 'font-color'},
              ],
              answer: 'color',
            },
            {
              qno: 3,
              qname: 'Which CSS property is used to set the font size?',
              options: [
                {option: 'font-size'}, 
                {option: 'size'}, 
                {option: 'text-size'}, 
                {option: 'font'},
              ],
              answer: 'font-size',
            },
          ],
        },
        {
          chapter: 'JavaScript Tutorial',
          lectureurl: 'VlPiVmYuoqw',
          notes: 'Your ',
          quiz: [
            {
              qno: 1,
              qname: 'What is JavaScript primarily used for?',
              options: [
                { option: 'Making coffee' },
                { option: 'Styling HTML' },
                { option: 'Adding interactivity to web pages' },
                { option: 'Database management' }
              ],
              answer: 'Adding interactivity to web pages'
            },
            {
              qno: 2,
              qname: 'Which of the following is a correct syntax to create a function in JavaScript?',
              options: [
                { option: 'function myFunction() {}' },
                { option: 'function:myFunction()' },
                { option: 'function = myFunction() {}' },
                { option: 'function => myFunction() {}' }
              ],
              answer: 'function myFunction() {}'
            },
            {
              qno: 3,
              qname: 'Which keyword is used to define a constant in JavaScript?',
              options: [
                { option: 'const' },
                { option: 'let' },
                { option: 'var' },
                { option: 'static' }
              ],
              answer: 'const'
            }
          ],          
        },
      ],
    },
    {
      title: 'Python for Beginners',
      tutor: 'Telusko',
      image: 'https://i.ytimg.com/vi/YfO28Ihehbk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCqmWkLQL0HmrsMlt7HW-WzTW5W2w',
      tutorlink: 'https://www.youtube.com/@Telusko',
      syllabus: [
        {
          chapter: 'Python Tutorial',
          lectureurl: 'YfO28Ihehbk',
          notes: 'The python is the easy to understand language\r\n' +
            "Which is widely used in today's Technologies like..\r\n" +
            'Machine Learning and Artificial Learning..\r\n' +
            '\r\n',
          quiz: [
            {
              qno: 1,
              qname: 'What is Python?',
              options: [
                {option: 'Programming language'}, 
                {option: 'Operating System'}, 
                {option: 'Database'}, 
                {option: 'Web framework'},
              ],
              answer: 'Programming language',
            },
            {
              qno: 2,
              qname: 'What is the extension for Python files?',
              options: [
                {option: '.py'}, 
                {option: '.java'}, 
                {option: '.html'}, 
                {option: '.txt'},
              ],
              answer: '.py',
            },
            {
              qno: 3,
              qname: 'Which company developed Python?',
              options: [
                {option: 'Microsoft'}, 
                {option: 'Google'}, 
                {option: 'Apple'}, 
                {option: 'None of the above'},
              ],
              answer: 'None of the above',
            },
          ],
        },
      ],
    },
     // New Course 2 - Machine Learning
    {
      title: 'Machine Learning Crash Course',
      tutor: 'Edureka',
      image: 'https://i.ytimg.com/vi/GwIo3gDZCVQ/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDTvg67I9otESt8qGBe-zlcgKXIEg',
      tutorlink: 'https://www.youtube.com/@edurekaIN',
      syllabus: [
          {
            chapter: 'Introduction to Machine Learning',
            lectureurl: 'GwIo3gDZCVQ',
            notes: 'Machine Learning enables computers to learn from data.',
            quiz: [
              {
                qno: 1,
                qname: 'Which library is commonly used for ML in Python?',
                options: [
                  { option: 'Pandas' },
                  { option: 'NumPy' },
                  { option: 'Matplotlib' },
                  { option: 'Scikit-learn' }
                ],
                answer: 'Scikit-learn'
              },
              {
                qno: 2,
                qname: 'What is Machine Learning?',
                options: [
                  { option: 'A programming language' },
                  { option: 'A subset of AI' },
                  { option: 'A new database system' },
                  { option: 'An operating system' }
                ],
                answer: 'A subset of AI'
              },
              {
                qno: 3,
                qname: 'Which type of learning requires labeled data?',
                options: [
                  { option: 'Supervised Learning' },
                  { option: 'Unsupervised Learning' },
                  { option: 'Reinforcement Learning' },
                  { option: 'Self-Supervised Learning' }
                ],
                answer: 'Supervised Learning'
              }
            ]
          },
          {
            chapter: 'Supervised Learning',
            lectureurl: '7eh4d6sabA0',
            notes: 'Supervised Learning uses labeled data.',
            quiz: [
              {
                qno: 1,
                qname: 'Which algorithm is best for classification?',
                options: [
                  { option: 'Linear Regression' },
                  { option: 'K-Nearest Neighbors' },
                  { option: 'K-Means Clustering' },
                  { option: 'Principal Component Analysis' }
                ],
                answer: 'K-Nearest Neighbors'
              },
              {
                qno: 2,
                qname: 'Which of these is a supervised learning algorithm?',
                options: [
                  { option: 'Decision Trees' },
                  { option: 'K-Means Clustering' },
                  { option: 'Apriori Algorithm' },
                  { option: 'DBSCAN' }
                ],
                answer: 'Decision Trees'
              },
              {
                qno: 3,
                qname: 'What is the main goal of supervised learning?',
                options: [
                  { option: 'To classify data or make predictions' },
                  { option: 'To find hidden patterns in data' },
                  { option: 'To let an agent learn from rewards' },
                  { option: 'To sort unstructured data' }
                ],
                answer: 'To classify data or make predictions'
              }
            ]
          },
          {
            chapter: 'Unsupervised Learning',
            lectureurl: 'D6gtZrsYi6c',
            notes: 'Unsupervised Learning works with unlabeled data.',
            quiz: [
              {
              qno: 1,
              qname: 'Which algorithm is used for clustering?',
              options: [
                { option: 'K-Means' },
                { option: 'Decision Trees' },
                { option: 'Linear Regression' },
                { option: 'Support Vector Machines' }
              ],
              answer: 'K-Means'
            },
          {
            qno: 2,
            qname: 'Which of these is an application of unsupervised learning?',
            options: [
              { option: 'Spam filtering' },
              { option: 'Customer segmentation' },
              { option: 'Predicting house prices' },
              { option: 'Fraud detection' }
            ],
            answer: 'Customer segmentation'
          },
          {
            qno: 3,
            qname: 'Which technique is commonly used for dimensionality reduction?',
            options: [
              { option: 'PCA (Principal Component Analysis)' },
              { option: 'Naïve Bayes' },
              { option: 'K-Nearest Neighbors' },
              { option: 'Random Forest' }
            ],
            answer: 'PCA (Principal Component Analysis)'
          }
        ]
      },
      {
        chapter: 'Reinforcement Learning',
        lectureurl: 'ELE2_Mftqoc',
        notes: 'Reinforcement Learning is based on rewards and punishments.',
        quiz: [
          {
            qno: 1,
            qname: 'What is Reinforcement Learning?',
            options: [
              { option: 'A type of unsupervised learning' },
              { option: 'A learning approach based on rewards and punishments' },
              { option: 'A supervised learning technique' },
              { option: 'A way to train neural networks' }
            ],
            answer: 'A learning approach based on rewards and punishments'
          },
          {
            qno: 2,
            qname: 'What does Q-learning stand for?',
            options: [
              { option: 'Quantum Learning' },
              { option: 'Quality Learning' },
              { option: 'Queue-based Learning' },
              { option: 'Value-based Learning' }
            ],
            answer: 'Value-based Learning'
          },
          {
            qno: 3,
            qname: 'Which of these is a reinforcement learning algorithm?',
            options: [
              { option: 'Deep Q-Networks' },
              { option: 'Naïve Bayes' },
              { option: 'K-Means' },
              { option: 'Gradient Boosting' }
            ],
            answer: 'Deep Q-Networks'
          }
        ]
      },
      {
        chapter: 'Deep Learning & Neural Networks',
        lectureurl: 'aircAruvnKk',
        notes: 'Deep Learning is based on artificial neural networks.',
        quiz: [
          {
            qno: 1,
            qname: 'Which neural network is best for image recognition?',
            options: [
              { option: 'CNN (Convolutional Neural Network)' },
              { option: 'RNN (Recurrent Neural Network)' },
              { option: 'ANN (Artificial Neural Network)' },
              { option: 'DNN (Deep Neural Network)' }
            ],
            answer: 'CNN (Convolutional Neural Network)'
          },
          {
            qno: 2,
            qname: 'Which activation function is commonly used in hidden layers of deep learning?',
            options: [
              { option: 'ReLU' },
              { option: 'Softmax' },
              { option: 'Sigmoid' },
              { option: 'Tanh' }
            ],
            answer: 'ReLU'
          },
          {
            qno: 3,
            qname: 'Which optimizer is commonly used in deep learning?',
            options: [
              { option: 'Gradient Descent' },
              { option: 'Adam' },
              { option: 'RMSProp' },
              { option: 'All of the above' }
            ],
            answer: 'All of the above'
          },
        ],
      },
    ],
  },
  

  {
    title: 'Cyber Security Essentials',
    tutor: 'Simplilearn',
    image: 'https://i.ytimg.com/vi/_l1is1krZw4/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLANra-mwQvefYqMaqxRW22OgpVoTw',
    tutorlink: 'https://www.youtube.com/@SimplilearnOfficial',
    syllabus: [
        {
            chapter: 'Introduction to Cyber Security',
            lectureurl: 'inWWhr5tnEA',
            notes: 'Cyber Security is crucial in today’s digital world. It involves protecting systems, networks, and data from cyber threats.',
            quiz: [
                {
                    qno: 1,
                    qname: 'What is the main goal of Cyber Security?',
                    options: [
                        { option: 'Data Integrity' },
                        { option: 'Confidentiality' },
                        { option: 'Availability' },
                        { option: 'All of the above' }
                    ],
                    answer: 'All of the above'
                },
                {
                    qno: 2,
                    qname: 'Which of the following is NOT a Cyber Security measure?',
                    options: [
                        { option: 'Using firewalls' },
                        { option: 'Keeping software up to date' },
                        { option: 'Using weak passwords' },
                        { option: 'Encrypting sensitive data' }
                    ],
                    answer: 'Using weak passwords'
                },
                {
                    qno: 3,
                    qname: 'Which is an example of Multi-Factor Authentication (MFA)?',
                    options: [
                        { option: 'Username & password' },
                        { option: 'Biometric scan & password' },
                        { option: 'Remembering complex passwords' },
                        { option: 'Using a single security question' }
                    ],
                    answer: 'Biometric scan & password'
                }
            ]
        },
        {
            chapter: 'Types of Cyber Attacks',
            lectureurl: 'nG9v3RSSXTo', // Fixed and replaced with a relevant lecture
            notes: 'Common cyber threats include malware, phishing, ransomware, and social engineering attacks.',
            quiz: [
                {
                    qno: 1,
                    qname: 'Which is an example of a phishing attack?',
                    options: [
                        { option: 'Brute Force Attack' },
                        { option: 'Fake email asking for credentials' },
                        { option: 'DoS Attack' },
                        { option: 'Keylogger' }
                    ],
                    answer: 'Fake email asking for credentials'
                },
                {
                    qno: 2,
                    qname: 'What is ransomware?',
                    options: [
                        { option: 'A type of firewall' },
                        { option: 'A software that encrypts user files and demands payment' },
                        { option: 'A phishing email' },
                        { option: 'A type of antivirus program' }
                    ],
                    answer: 'A software that encrypts user files and demands payment'
                },
                {
                    qno: 3,
                    qname: 'What does a DoS attack do?',
                    options: [
                        { option: 'Steals data from a server' },
                        { option: 'Shuts down a network by overwhelming it with traffic' },
                        { option: 'Encrypts a user’s files' },
                        { option: 'Detects malware' }
                    ],
                    answer: 'Shuts down a network by overwhelming it with traffic'
                }
            ]
        },
        {
            chapter: 'Cyber Security Best Practices',
            lectureurl: 'njPY7pQTRWg',
            notes: 'Cyber Security best practices include using strong passwords, enabling MFA, avoiding suspicious emails, and keeping software updated.',
            quiz: [
                {
                    qno: 1,
                    qname: 'Which of these is a strong password?',
                    options: [
                        { option: '123456' },
                        { option: 'P@ssw0rd123!' },
                        { option: 'password' },
                        { option: 'qwerty' }
                    ],
                    answer: 'P@ssw0rd123!'
                },
                {
                    qno: 2,
                    qname: 'Why should you avoid using public Wi-Fi for sensitive activities?',
                    options: [
                        { option: 'It is too slow' },
                        { option: 'It is usually encrypted' },
                        { option: 'Hackers can intercept data' },
                        { option: 'It costs too much' }
                    ],
                    answer: 'Hackers can intercept data'
                },
                {
                    qno: 3,
                    qname: 'Which of these is NOT a recommended security practice?',
                    options: [
                        { option: 'Using the same password for multiple accounts' },
                        { option: 'Enabling Multi-Factor Authentication' },
                        { option: 'Regularly updating software and security patches' },
                        { option: 'Backing up important data' }
                    ],
                    answer: 'Using the same password for multiple accounts'
                }
            ]
        },
        {
            chapter: 'Ethical Hacking & Penetration Testing',
            lectureurl: 'co5CY74lMQM',
            notes: 'Ethical hacking involves testing security systems to identify vulnerabilities before hackers do.',
            quiz: [
                {
                    qno: 1,
                    qname: 'What is the purpose of ethical hacking?',
                    options: [
                        { option: 'To steal data' },
                        { option: 'To improve security by finding vulnerabilities' },
                        { option: 'To create viruses' },
                        { option: 'To hack personal accounts' }
                    ],
                    answer: 'To improve security by finding vulnerabilities'
                },
                {
                    qno: 2,
                    qname: 'What is penetration testing?',
                    options: [
                        { option: 'A method to scan for vulnerabilities' },
                        { option: 'A test to check a network’s security by simulating an attack' },
                        { option: 'A process to install firewalls' },
                        { option: 'A method to encrypt sensitive files' }
                    ],
                    answer: 'A test to check a network’s security by simulating an attack'
                },
                {
                    qno: 3,
                    qname: 'Which tool is commonly used in penetration testing?',
                    options: [
                        { option: 'Photoshop' },
                        { option: 'Wireshark' },
                        { option: 'Kali Linux' },
                        { option: 'Notepad' }
                    ],
                    answer: 'Kali Linux'
                },
            ],
        },
    ],
  },
  {
    title: 'Full-Stack Web Development',
    tutor: 'freeCodeCamp',
    image: 'https://i.ytimg.com/vi/O3BUHwfHf84/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD8h9LaMKX5Mgc6T7lai59xgsYeEQ', 
    tutorlink: 'https://www.youtube.com/@freeCodeCamp',
    rating: 4.8,
    syllabus: [
      {
        chapter: 'Introduction to MERN Stack',
        lectureurl: '7CqJlxBYj-M',
        notes: 'MERN Stack includes MongoDB, Express.js, React, and Node.js to build full-stack applications.',
        quiz: [
          {
            qno: 1,
            qname: 'What does MERN stand for?',
            options: [
              { option: 'MongoDB, Express.js, React, Node.js' },
              { option: 'MySQL, Express.js, React, Node.js' },
              { option: 'MongoDB, Ember.js, React, Node.js' },
              { option: 'MongoDB, Express.js, Redux, Node.js' }
            ],
            answer: 'MongoDB, Express.js, React, Node.js'
          },
          {
            qno: 2,
            qname: 'Which of the following is a backend framework in MERN?',
            options: [
              { option: 'React' },
              { option: 'MongoDB' },
              { option: 'Express.js' },
              { option: 'Redux' }
            ],
            answer: 'Express.js'
          }
        ]
      },
      {
        chapter: 'Frontend Development with React',
        lectureurl: 'bMknfKXIFA8',
        notes: 'React.js is a JavaScript library used for building dynamic user interfaces.',
        quiz: [
          {
            qno: 1,
            qname: 'Which command is used to create a new React app?',
            options: [
              { option: 'npm create react-app my-app' },
              { option: 'npx create-react-app my-app' },
              { option: 'npm start react-app' },
              { option: 'node create-react-app my-app' }
            ],
            answer: 'npx create-react-app my-app'
          },
          {
            qno: 2,
            qname: 'What is the primary purpose of React components?',
            options: [
              { option: 'To define the structure of the database' },
              { option: 'To create reusable UI elements' },
              { option: 'To manage backend logic' },
              { option: 'To handle HTTP requests' }
            ],
            answer: 'To create reusable UI elements'
          },
        ],
        },
        {
          chapter: 'Backend Development with Node.js and Express',
          lectureurl: 'Oe421EPjeBE',
          notes: 'Express.js is a lightweight framework for building web servers with Node.js.',
          quiz: [
            {
              qno: 1,
              qname: 'Which package is used in Express.js to handle HTTP requests?',
              options: [
                { option: 'body-parser' },
                { option: 'mongoose' },
                { option: 'cors' },
                { option: 'jsonwebtoken' }
              ],
              answer: 'body-parser'
            },
            {
              qno: 2,
              qname: 'Which command is used to install Express.js?',
              options: [
                { option: 'npm install express' },
                { option: 'npm create express' },
                { option: 'npx install express' },
                { option: 'node install express' }
              ],
              answer: 'npm install express'
            }
          ]
        },
        {
          chapter: 'Database Management with MongoDB',
          lectureurl: 'oSIv-E60NiU',
          notes: 'MongoDB is a NoSQL database used in MERN applications to store and manage data.',
          quiz: [
            {
              qno: 1,
              qname: 'Which command is used to start MongoDB?',
              options: [
                { option: 'mongod' },
                { option: 'mongo start' },
                { option: 'start mongo' },
                { option: 'mongodb' }
              ],
              answer: 'mongod'
            },
            {
              qno: 2,
              qname: 'What is Mongoose used for?',
              options: [
                { option: 'To create MongoDB databases' },
                { option: 'To connect MongoDB with Express.js' },
                { option: 'To perform frontend operations' },
                { option: 'To write CSS for React' }
              ],
              answer: 'To connect MongoDB with Express.js'
            }
          ]
        },
        {
          chapter: 'Deploying a MERN Stack Application',
          lectureurl: 'O3BUHwfHf84',
          notes: 'Learn how to deploy a MERN application using platforms like Heroku or Vercel.',
          quiz: [
            {
              qno: 1,
              qname: 'Which platform is commonly used to deploy MERN applications?',
              options: [
                { option: 'Heroku' },
                { option: 'Jenkins' },
                { option: 'Postman' },
                { option: 'PyCharm' }
              ],
              answer: 'Heroku'
            },
            {
              qno: 2,
              qname: 'Which file is required for deployment in a MERN app?',
              options: [
                { option: 'package.json' },
                { option: 'app.js' },
                { option: '.env' },
                { option: 'server.js' }
              ],
              answer: 'package.json'
            }
          ]
        }
      ]
    },
];

  module.exports = data;