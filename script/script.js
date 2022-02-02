document.addEventListener('DOMContentLoaded', () => {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question')
    const formAnswers = document.querySelector('#formAnswers')


    const a = {
        name:[
            {
                title:'Стандарт'
            },
            {
                title:'Черный'
            }
    ]}

    const b = {
        link:[
            {
                url:'./image/burger.png'
            },
            {
                url:'./image/burgerBlack.png'
            }
    ]}
    
    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block')
        playTest();
    })

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block')
    })

    const playTest = () => {
        const renderQuestions = () => {
        questionTitle.textContent = `Какого цвета бургер вы хотите?`;
        formAnswers.innerHTML =
        `<div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${b.link[0].url}" alt="burger">
                  <span>${a.name[0].title}</span>
                </label>
              </div>
              <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${b.link[1].url}" alt="burger">
                  <span>${a.name[1].title}</span>
                </label>
              </div>`
    }
    renderQuestions();
}
})