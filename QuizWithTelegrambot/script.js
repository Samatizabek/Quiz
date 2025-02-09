// Вопросы теста
const questions = [
    {
        type: "quiz",  // Викторина
        question: "Какой год основания JavaScript?",
        options: ["1990", "1995", "2000", "2005"],
        correct: "1995"
    },
    {
        type: "quiz",
        question: "Какое расширение у JavaScript-файлов?",
        options: [".java", ".js", ".jsx", ".ts"],
        correct: ".js"
    },
    {
        type: "open",  // Открытый вопрос
        question: "Что такое DOM в JavaScript?"
    }
];

// Контейнер для вопросов
const quizContainer = document.getElementById("quiz");

// Генерация вопросов
questions.forEach((q, index) => {
    const questionElem = document.createElement("div");
    questionElem.classList.add("question");

    questionElem.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

    if (q.type === "quiz") {
        // Варианты ответов для викторины
        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("options");

        q.options.forEach(option => {
            const label = document.createElement("label");
            label.innerHTML = `<input type="radio" name="q${index}" value="${option}"> ${option}`;
            optionsContainer.appendChild(label);
        });

        questionElem.appendChild(optionsContainer);
    } else if (q.type === "open") {
        // Поле для ввода ответа
        const input = document.createElement("textarea");
        input.setAttribute("name", `q${index}`);
        questionElem.appendChild(input);
    }

    quizContainer.appendChild(questionElem);
});

// Обработчик отправки результатов
document.getElementById("submit").addEventListener("click", () => {
    let results = [];
    let score = 0; // Количество правильных ответов

    questions.forEach((q, index) => {
        let userAnswer = "";

        if (q.type === "quiz") {
            const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
            if (selectedOption) {
                userAnswer = selectedOption.value;
                if (userAnswer === q.correct) score++; // Проверка правильности ответа
            } else {
                userAnswer = "Не отвечено";
            }
        } else if (q.type === "open") {
            userAnswer = document.querySelector(`textarea[name="q${index}"]`).value || "Не отвечено";
        }

        results.push(`${index + 1}. ${q.question}\nОтвет: ${userAnswer}`);
    });

    const resultMessage = `Тест завершен!\n\nПравильных ответов: ${score}/${questions.length}\n\n` + results.join("\n\n");

    sendToTelegram(resultMessage);
});

// Отправка результатов в Telegram
function sendToTelegram(message) {
    const TOKEN = "7795663534:AAGs_Sm1vBeqEXnepkk7innOoMqFEHqOtoI";  // Замените на свой токен бота
    const CHAT_ID = "6375287706";  // Замените на свой Chat ID

    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    }).then(response => {
        if (response.ok) {
            alert("Результаты отправлены в Telegram!");
        } else {
            alert("Ошибка при отправке!");
        }
    }).catch(error => {
        console.error("Ошибка:", error);
        alert("Ошибка при отправке в Telegram!");
    });
}
