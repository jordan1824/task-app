export default class FormErrorMessage {
  constructor() {
    this.registerFormFields = document.querySelectorAll(".register-field")
    this.taskFormField = document.querySelector(".task-input")
    this.usernameCounter = 0
    this.emailCounter = 0
    this.passwordCounter = 0
    if (this.registerFormFields) {this.events()}
    if (this.taskFormField) {this.indexEvents()}
  }

  // Events
  events() {
    this.registerFormFields.forEach(field => field.addEventListener("keyup", () => {
      if (field.classList.contains("username")) {
        this.usernameFieldHandler(field)
      }
      if (field.classList.contains("email")) {
        this.emailFieldHandler(field)
      }
      if (field.classList.contains("password")) {
        this.passwordFieldHandler(field)
      }
    }))
  }

  indexEvents() {
    this.taskFormField.addEventListener("keyup", () => {
      if (event.keyCode != 13) {
        this.taskFieldHandler()
      }
    })
    // For when users hold down backspace
    this.taskFormField.addEventListener("keydown", (event) => {
      if (event.keyCode != 13) {
        this.removeTaskAlert()
      }
    })
  }

  // Models
  taskFieldHandler() {
    let errors = 0;
    if (this.taskFormField.value.length > 100) {errors = this.insertAlert(this.taskFormField, "Task must not exceed 100 characters.", errors)}
    if (!errors) {
      this.removeAlert(this.taskFormField)
    }
  }

  removeTaskAlert() {
    if (this.taskFormField.value.length < 100 && document.querySelector(".alert")) {
      this.taskFormField.parentElement.querySelector(".alert").classList.add("reverse-error-popup-animation")
      this.taskFormField.parentElement.querySelector(".alert").addEventListener("animationend", function() {
        this.remove()
      })
    }
  }

  usernameFieldHandler(field) {
    let errors = 0;
    clearTimeout(this.usernameCounter)
    if (field.value.length > 50) {errors = this.insertAlert(field, "Your username cannot exceed 50 characters.", errors)}
    if (field.value.match(/[$&+,:;=?@#|'<>.^*()%!_-]+/)) {errors = this.insertAlert(field, "Your username cannot contain special characters.", errors)}
    this.usernameTimedChecks(field, errors)
    if (!errors) {
      this.removeAlert(field)
    }
  }

  usernameTimedChecks(field, errors) {
    if (field.value.length > 0 && field.value.length < 4) {
      this.usernameCounter = setTimeout(() => errors = this.insertAlert(field, "Your username must be atleast 4 characters long.", errors), 2000)
    }
    if (field.value.length == 0) {
      this.usernameCounter = setTimeout(() => errors = this.insertAlert(field, "You must enter a valid username.", errors), 2000)
    }
  }

  emailFieldHandler(field) {
    let errors = 0;
    clearTimeout(this.emailCounter)
    if (field.value.length > 200) {errors = this.insertAlert(field, "Your email cannot exceed 200 characters.", errors)}
    this.emailTimedChecks(field, errors)
    if (!errors) {
      this.removeAlert(field)
    }
  }

  emailTimedChecks(field, errors) {
    if (field.value.length == 0) {
      this.emailCounter = setTimeout(() => errors = this.insertAlert(field, "You must enter a valid email address.", errors), 2000)
    }
    if (!field.value.match(/[A-Za-z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/)) {
      this.emailCounter = setTimeout(() => errors = this.insertAlert(field, "You must provide a valid email address.", errors), 2000)
    }
  }

  passwordFieldHandler(field) {
    let errors = 0;
    clearTimeout(this.passwordCounter)
    if (field.value.length > 50) {errors = this.insertAlert(field, "Your password cannot exceed 50 characters.", errors)}
    this.passwordTimedChecks(field, errors)
    if (!errors) {
      this.removeAlert(field)
    }
  }

  passwordTimedChecks(field, errors) {
    if (field.value.length > 0 && field.value.length < 8) {
      this.passwordCounter = setTimeout(() => errors = this.insertAlert(field, "Your password must be atleast 8 characters long.", errors), 2000)
    }
    if (field.value.length == 0) {
      this.passwordCounter = setTimeout(() => errors = this.insertAlert(field, "You must enter a valid password.", errors), 2000)
    }
  }

  insertAlert(field, message, errors) {
    errors += 1;
    if (!field.parentElement.querySelector(".alert")) {
      field.parentElement.insertAdjacentHTML("afterbegin", this.alertHTML(message))
      field.parentElement.querySelector(".alert").addEventListener("animationend", function() {
        this.classList.remove("error-popup-animation")
    })
    }
    return errors
  }

  alertHTML(error) {
    return `<div class='alert error-popup-animation'>
      <p class='error-message'>${error}</p>
    </div>`
  }

  removeAlert(field) {
    if (field.parentElement.querySelector(".alert")) {
      let currentFieldAlert = field.parentElement.querySelector(".alert")
      currentFieldAlert.classList.add("reverse-error-popup-animation")
      currentFieldAlert.addEventListener("animationend", function() {
        currentFieldAlert.remove()
      })
    }
  }

}