export default class FormErrorMessage {
  constructor() {
    this.events()
  }

  // Events
  events() {
    
  }

  // Models
  
  errorAlert(message) {
    if (!document.querySelector('.error-alert')) {
      return this.body.insertAdjacentHTML("afterbegin", this.alertHTML(message))
    }
  }
  
  alertHTML(message) {
    return `<div class='error-alert'>
      <h3 class='alert-heading'>Error:</h3>
      <p class='alert-message'>${message}</p>
      </div>`
  }
}

// Alert popup for task form
document.querySelector(".task-input").addEventListener('keyup', function() {
  const taskField = document.querySelector(".task-input")
  if (taskField.value.length > 75) {
    // then insert the form, and make it slide up (position absolute with translateY)
  } else {
    // make it slide down and get removed
  }
})
// Removes alert popup (this is for if the user holds down backspace)
document.querySelector(".task-input").addEventListener('keydown', function() {
  const taskField = document.querySelector(".task-input")
  if (taskField.value.length < 75) {
    document.querySelector(".alert").classList.remove("alert-show")
  }
})