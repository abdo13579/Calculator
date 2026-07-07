// Theme
const themesToggleElement = document.querySelector('.themes__toggle')

function switchTheme() {
  themesToggleElement.classList.toggle('themes__toggle--isActive')
}

themesToggleElement.addEventListener('click', switchTheme)
themesToggleElement.addEventListener('keydown', (event) => (event.key === 'Enter') && switchTheme())

// Logic
const resultElement = document.querySelector('.calc__result')
const keyElements = document.querySelectorAll('[data-type]')
let currentNumber = ''
let storedNumber = ''
let operation = ''

function updateScreen(value) {
  resultElement.innerText = !value ? '0' : value
}

function numberButtonHandler(value) {
    if (value === '.' && currentNumber.includes('.')) return
    if (value === '0' && !currentNumber) return
    currentNumber += value
    updateScreen(currentNumber)
}

function resetButtonHandler() {
  currentNumber = ''
  storedNumber = ''
  operation = ''
  updateScreen(currentNumber)
}

function delButtonHandler() {
  if (!currentNumber || currentNumber === '0') return
  if (currentNumber.length === 1) {
    currentNumber = ''
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1)
  }
  updateScreen(currentNumber)
}

function excuteOperation() {
  if (currentNumber && storedNumber && operation) {
    switch(operation) {
      case '+':
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber)
        currentNumber = ''
        updateScreen(storedNumber)
        break
      case '-':
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber)
        currentNumber = ''
        updateScreen(storedNumber)
        break
      case '*':
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber)
        currentNumber = ''
        updateScreen(storedNumber)
        break
      case '/':
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber)
        currentNumber = ''
        updateScreen(storedNumber)
        break
    }
  }
}

function operationButtonHandler(value) {
  if (!storedNumber && !currentNumber) return
  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber
    currentNumber = ''
    operation = value
  } else if (storedNumber) {
    operation = value
    if (currentNumber) excuteOperation()
  }
}

function keyElementsHandler(element) {
  element.addEventListener('click', () => {
    const type = element.dataset.type
    if (type === 'number') {
      numberButtonHandler(element.dataset.value)
    } else if (type === 'operation') {
      switch (element.dataset.value) {
        case 'c':
          resetButtonHandler()
          break
        case 'Backspace':
          delButtonHandler()
          break
        case 'Enter':
          excuteOperation()
          break
        default:
          operationButtonHandler(element.dataset.value)
          break
      }
    }
  })
}

keyElements.forEach(keyElementsHandler)

// keyboard usage
const availableNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',]
const availableOperations = ['+', '-', '*', '/']
const availableKeys = [...availableNumbers, ...availableOperations, 'Enter', 'Backspace', 'c']

function keyboardhover(key) {
  if (availableKeys.includes(key)) {
    const elem = document.querySelector(`[data-value="${key}"]`)
    elem.classList.add('hover')
    elem.click()
    setTimeout(() => elem.classList.remove('hover'), 100)
  }
}

window.addEventListener('keydown', (event) => {
  keyboardhover(event.key)
})