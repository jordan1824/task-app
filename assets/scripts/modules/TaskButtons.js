export default class TaskButtons {
  constructor() {
    this.taskList = document.querySelector(".task-list")
    this.events()
  }

  // Events
  events() {
    document.addEventListener("click", event => {
      this.deleteBtnAction(event)
      this.checkBtnAction(event)
      this.editBtnAction(event)
    })
  }

  // Models
  deleteBtnAction(event) {
    if (event.target.classList.contains("delete-btn")) {
      event.preventDefault()
      let result = confirm("Are you sure you want to delete this item?")
      if (result) {
        let id = event.target.getAttribute("data-id")
        // Sends post request to delete task from database
        fetch(`/delete/${id}`)
        .then(() => {
          // Removes element from frontend
          let taskItem = event.target.parentElement.parentElement
          taskItem.classList.add("animation")
          taskItem.addEventListener("animationend", () => {
            taskItem.remove()
            this.checkIfTasks()
          })
        })
        .catch(function() {
          this.errorAlert("Please try again later.")
        })
      }
    }
  }

  checkBtnAction(event) {
    // This is neccessary because the a link partly extends past checkmark
    if (event.target.classList.contains("check-link")) {
      event.preventDefault();
    }
    // Handles click event on checkmark
    if (event.target.classList.contains("check-btn")) {
      event.preventDefault()
      let id = event.target.getAttribute("data-id")
      // Sends post request to delete task from database
      fetch(`/delete/${id}`)
      .then(() => {
        // Removes element from frontend
        let taskItem = event.target.parentElement.parentElement.parentElement
        taskItem.classList.add("animation")
        taskItem.addEventListener("animationend", () => {
          taskItem.remove()
          this.checkIfTasks()
        })
      })
      .catch(function() {
        this.errorAlert("Please try again later.")
      })
    }
  }

  editBtnAction(event) {
    if (event.target.classList.contains("edit-btn")) {
      event.preventDefault()
      let input = event.target.parentElement.parentElement.querySelector(".task-text").innerHTML
      let result = prompt("Edit Your Task", input)
      if (result) {
        let id = event.target.getAttribute("data-id")
        const data = { task: result };
        // Sends post request to update task in database
        fetch(`/edit/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(function() {
          // Updates task text in frontend
          event.target.parentElement.parentElement.querySelector(".task-text").innerHTML = result
        })
        .catch(function() {
          this.errorAlert("Please try again later.")
        })
      }
    }
  }

  checkIfTasks() {
    if (!document.querySelector(".task")) {
      this.taskList.insertAdjacentHTML('beforeend', this.emptyTaskHTML())
      document.querySelector(".empty-task").classList.add("empty-task--visible");
    }
  }

  emptyTaskHTML() {
    return `<li class='task empty-task'>
    <h3 class='empty-task-title'>You do not have any tasks.</h3>
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