const questions = [
    { question: "What is the purpose of the &ltdatalist&gt tag in HTML?", 
    answer: "The &ltdatalist&gt tag is used to provide a list of predefined options to an &ltinput&gt element, typically used to offer autocomplete suggestions. When the user starts typing in the input field, the browser will display the options defined in the <datalist> that match the current input."},
    { question: " What is the purpose of the &ltnoscript&gt tag in HTML?",
     answer: "The &ltnoscript&gt tag defines alternative content to be displayed if the user’s browser does not support JavaScript or if JavaScript is disabled."},
    { question: "Can you explain the purpose of &ltmeta&gt tags in HTML?",
     answer: "Meta tags provide metadata about a web page through information invisible to visitors but essential for search engines, social media, and other web technology. This metadata includes details such as the page's title, keywords, and description."},
    { question: " What is a marquee in HTML?",
     answer: "Marquee is used for scrolling text on a web page. It automatically scrolls the image or text up, down, left, or right. You must use </marquee> tags to apply for a marquee."},
    { question: "What are HTML Entities?",
     answer: "HTML Entities are special characters used to represent characters that cannot be typed on a keyboard. They are often used to display special symbols and foreign characters."},
    { question: "How do you display a table in an HTML webpage?",
     answer: "The HTML &lttable&gt tag displays data in a tabular format. It is also used to manage the layout of the page, for example, the header section, navigation bar, body content, and footer section. Given below is the list of HTML tags used for displaying a table on an HTML webpage"},
    { question: " How do you create a hyperlink in HTML?",
     answer: "We use the anchor tag &lta&gt to create a hyperlink in HTML that links one page to another. The hyperlink can be added to images, too."},
    { question: "How do you create nested web pages in HTML?",
    answer: "Nested web pages mean a webpage within a webpage. We can create nested web pages in HTML using the built-in iframe tag. The HTML &ltiframe&gt tag defines an inline frame."},
    { question: "What hierarchy do the style sheets follow?",
     answer: "If a single selector includes three different style definitions, the definition closest to the actual tag takes precedence. Inline style takes priority over embedded style sheets, which take priority over external style sheets."},
    { question: "What is the difference between HTML and XHTML?",
     answer: "HTML and XHTML are both markup languages used to create web pages. However, XHTML is stricter than HTML and requires developers to write well-formed code that adheres to specific rules and guidelines. XHTML also requires all tags to be closed and all attributes to be quoted."}
];

let viewedQuestions = JSON.parse(localStorage.getItem('viewedQuestions')) || [];

function saveViewedQuestion(questionIndex) {
    if (!viewedQuestions.includes(questionIndex)) {
        viewedQuestions.push(questionIndex);
        localStorage.setItem('viewedQuestions', JSON.stringify(viewedQuestions));
        updateProgressBar();
    }
}
function resetProgress() {
    localStorage.removeItem('viewedQuestions');
    viewedQuestions = [];
    questions.forEach((item, index) => {
        const completed = document.getElementById(`completed-${index}`);
        if (completed) {
            completed.style.display = 'none';
        }
        const answer = document.getElementById(`answer-${index}`);
        if (answer) {
            answer.style.display = 'none';
        }
    });
    updateProgressBar();
}
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progress = (viewedQuestions.length / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
    progressBar.innerText = `${Math.round(progress)}%`;
}

const questionsDiv = document.getElementById('questions');

questions.map((item, index) => {
    if (index % 2 === 0) {
        row = document.createElement('div');
        row.className = "row justify-content-center mb-3 mt-3";
        questionsDiv.appendChild(row);
    }

    const card = document.createElement('div');
    card.className ="col-md-6";

    card.innerHTML = `
    <div class="card text-center">
        <div class="card-header" data-index="${index}">
        ${item.question}
        <span id="completed-${index}" class="float-right"
        style="display: none;">&#10004;</span>
        </div>
        <div class="card-body" id="answer-${index}" style="display: none;">
        <p class="text-primary">${item.answer}</p>
    </div>
    </div>
  `;
  
  row.appendChild(card);
  questionsDiv.appendChild(row);
});

questions.forEach((item, index) => {
    const header = document.querySelector(`.card-header[data-index="${index}"]`);
    const answer = document.getElementById(`answer-${index}`);
    const completed = document.getElementById(`completed-${index}`);

    if (viewedQuestions.includes(index)) {
        completed.style.display = 'inline';

    }

    header.addEventListener('click', () => {
    questions.forEach((otherItem, otherIndex) => {
            if (otherIndex !== index) {
                const otherAnswer = document.getElementById(`answer-${otherIndex}`);
                if (otherAnswer) {
                    otherAnswer.style.display  = 'none';
                }
            }
        
     });


answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
saveViewedQuestion(index);
completed.style.display = 'inline';

     });
});

document.getElementById('resetButton').addEventListener('click', resetProgress);
updateProgressBar(); 

