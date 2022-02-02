
document.addEventListener('DOMContentLoaded', () => {
    const btnOpenModal = document.querySelector('#btnOpenModal')
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal')
    const questionTitle = document.querySelector('#question')
    const formAnswers = document.querySelector('#formAnswers')
    const nextButton = document.querySelector('#next')
    const prevButton = document.querySelector('#prev')

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
  
    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block')
        playTest();
    })

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block')
    })

    const playTest = () => {
        let numberQuestion = 0

        const createAnswer = ({ title, url, type }) => `
            <div class="answers-item d-flex flex-column" >
                <input type=${type} id=${title} name="answer" class="d-none">
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

            prevButton.style.display = numberQuestion === 0 ? 'none' : 'block'
            nextButton.style.display = numberQuestion === questions.length - 1 ? 'none' : 'block'

            questionTitle.textContent = questions[number].question;

            renderAnswers(number)
        }

        renderQuestions(numberQuestion);

        nextButton.onclick = () => {
            numberQuestion++;
            renderQuestions(numberQuestion)
        }

        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion)
        }
    }
})