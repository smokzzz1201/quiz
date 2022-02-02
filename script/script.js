import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getDatabase, ref, child, get, push } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";
document.addEventListener('DOMContentLoaded', () => {
    const btnOpenModal = document.querySelector('#btnOpenModal')
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal')
    const questionTitle = document.querySelector('#question')
    const formAnswers = document.querySelector('#formAnswers')
    const nextButton = document.querySelector('#next')
    const prevButton = document.querySelector('#prev')
    const sendButton = document.querySelector('#send')

    const questions = [
      {
          question: "Какого цвета бургер?",
          answers: [
              {
                  title: 'Стандарт',
                  url: './image/burger.png'
              },
              {
                  title: 'Черный',
                  url: './image/burgerBlack.png'
              }
          ],
          type: 'radio'
      },
      {
          question: "Из какого мяса котлета?",
          answers: [
              {
                  title: 'Курица',
                  url: './image/chickenMeat.png'
              },
              {
                  title: 'Говядина',
                  url: './image/beefMeat.png'
              },
              {
                  title: 'Свинина',
                  url: './image/porkMeat.png'
              }
          ],
          type: 'radio'
      },
      {
          question: "Дополнительные ингредиенты?",
          answers: [
              {
                  title: 'Помидор',
                  url: './image/tomato.png'
              },
              {
                  title: 'Огурец',
                  url: './image/cucumber.png'
              },
              {
                  title: 'Салат',
                  url: './image/salad.png'
              },
              {
                  title: 'Лук',
                  url: './image/onion.png'
              }
          ],
          type: 'checkbox'
      },
      {
          question: "Добавить соус?",
          answers: [
              {
                  title: 'Чесночный',
                  url: './image/sauce1.png'
              },
              {
                  title: 'Томатный',
                  url: './image/sauce2.png'
              },
              {
                  title: 'Горчичный',
                  url: './image/sauce3.png'
              }
          ],
          type: 'radio'
      }
  ];

  const firebaseConfig = {
    apiKey: "AIzaSyBEJGdfJC412pv1_MlAMhVMU-uiZKd1HUY",
    authDomain: "smokzzz-c5e4b.firebaseapp.com",
    databaseURL: "https://smokzzz-c5e4b-default-rtdb.firebaseio.com",
    projectId: "smokzzz-c5e4b",
    storageBucket: "smokzzz-c5e4b.appspot.com",
    messagingSenderId: "658545744465",
    appId: "1:658545744465:web:d39819672f23a390d07670",
    measurementId: "G-D3JK425Y9K"
  };
  
  // Initialize Firebase
  initializeApp(firebaseConfig);
  
  
  const getData = () => {
    nextButton.classList.add('d-none')
    prevButton.classList.add('d-none')
    
    formAnswers.textContent = 'LOAD';

    const dbRef = ref(getDatabase());
    get(child(dbRef, `questions`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                playTest(snapshot.val())
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
}

btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block')
    getData();
})

closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block')
})

const playTest = (questions) => {
    const finalAnswers = []

    let numberQuestion = 0

    const createAnswer = ({ title, url, type }) => `
        <div class="answers-item d-flex justify-content-center" >
            <input type=${type} id=${title} name="answer" class="d-none" value=${title}>
            <label for=${title} class="d-flex flex-column justify-content-between">
                <img class="answerImg" src=${url} alt="burger">
                <span>${title}</span>
            </label>
        </div>
    `

    const renderAnswers = (number) => {
        questions[number].answers.forEach((answer, index) => {
            formAnswers.insertAdjacentHTML('beforeend', createAnswer({ ...answer, type: questions[number].type }))
        })
    }

    const renderQuestions = (number) => {
        formAnswers.innerHTML = ''

        switch(true) {
            case (number >= 0 && number <= questions.length - 1):
                questionTitle.textContent = questions[number].question;
                renderAnswers(number)
                nextButton.classList.remove('d-none')
                prevButton.classList.remove('d-none')
                sendButton.classList.add('d-none')
            case (number === 0):
                prevButton.classList.add('d-none')
                break;
            case (number === questions.length):
                nextButton.classList.add('d-none')
                prevButton.classList.add('d-none')
                sendButton.classList.remove('d-none')
                questionTitle.textContent = ''
                formAnswers.innerHTML = `
                    <div>
                        <label for="numberPhone">Enter your number</label>
                        <input type="phone" class="form-control" id="numberPhone">
                    </div>
                `
                break;
            case (number === questions.length + 1):
                formAnswers.textContent = 'Спасибо за пройденный тест'
                setTimeout(() => {
                    modalBlock.classList.remove('d-block')
                }, 2000)
        }
    }

    renderQuestions(numberQuestion);

    const checkAnswer = () => {
        const obj = {};
        const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone')

        inputs.forEach((input, index) => {
            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                obj[`${index}_${questions[numberQuestion].question}`] = input.value
            }

            if (numberQuestion === questions.length) {
                obj['Номер телефона'] = input.value
            }
        })

        finalAnswers.push(obj)
    }

    nextButton.onclick = () => {
        checkAnswer()
        numberQuestion++;
        renderQuestions(numberQuestion)
    }

    prevButton.onclick = () => {
        checkAnswer()
        numberQuestion--;
        renderQuestions(numberQuestion)
    }

    sendButton.addEventListener('click', () => {
        checkAnswer()
        numberQuestion++;
        renderQuestions(numberQuestion)

        const db = getDatabase();
        push(ref(db, 'contacts'), finalAnswers);
    })
}
})