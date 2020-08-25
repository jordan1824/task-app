export default class AddTask {
  constructor() {
    this.form = document.querySelector('.form')
    this.taskField = document.querySelector(".task-input")
    this.taskList = document.querySelector(".task-list")
    this.body = document.querySelector("body")
    this.events()
  }

  // Events
  events() {
    this.form.addEventListener('submit', event => this.addTask(event))
  }

  // Models
  addTask(event) {
    event.preventDefault()
    let task = this.taskField.value
    if (task) {
      fetch("/add-task", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({task: task, sent: "async"})
      })
      .then(response => response.json())
      .then(data => {
        if (data.task) {
          this.taskField.value = ""
          this.taskField.focus()
          this.insertTaskHTML(data)
        }
      })
      .catch(function() {
        this.errorAlert("Please try again later.")
      })
    }
  }

  insertTaskHTML(task) {
    if (this.taskList.querySelector(".task-item")) {
      return this.taskList.insertAdjacentHTML("beforeend", this.taskHTML(task))
    } else {
      return this.taskList.innerHTML = this.taskHTML(task)
    }
  }

  taskHTML(task) {
    return `<li class='task'>
    <div class='link-container'>
      <a class='check-link' href="/delete/${task._id}"><i class="fa check-btn fa-check" data-id="${task._id}" aria-hidden="true"></i></a>
    </div>
    <div class='task-item'>
      <span class='task-text'>${task.task}</span>
    </div>
    <div class='btn-container'>
      <a href="/edit/${task._id}" data-id="${task._id}" class='edit-btn btn'>Edit</a>
      <a href="/delete/${task._id}" data-id="${task._id}" class='delete-btn btn'>Delete</a>
    </div>
    </li>`
  }

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