export default class TaskButtons {
  constructor() {
    this.taskList = document.querySelector(".task-list")
    this.deleteModal = document.querySelector(".delete-modal")
    this.editModal = document.querySelector(".edit-modal")
    this.deleteAllModal = document.querySelector(".delete-all-modal")
    if (this.taskList) {this.events()}
  }

  // Events
  events() {
    document.addEventListener("click", event => {
      this.deleteBtnAction(event)
      this.checkBtnAction(event)
      this.editBtnAction(event)
      this.deleteAllBtnAction(event)
      this.modalExitBtnAction(event)
      this.modalCancelBtnAction(event)
      this.modalUpdateBtnAction(event)
      this.modalDeleteBtnAction(event)
      this.modalDeleteAllBtnAction(event)
    })
    
    document.addEventListener("keyup", function(event) {
      if (event.keyCode == 27) {
        if (document.querySelector(".modal--visible")) {
          document.querySelector(".modal--visible").classList.remove("modal--visible")
        }
      }
    })
  }

  // Models
  deleteAllBtnAction(event) {
    if (event.target.classList.contains("delete-all-btn")) {
      event.preventDefault()
      this.deleteAllModal.classList.add("modal--visible")
    }
  }

  deleteBtnAction(event) {
    if (event.target.classList.contains("delete-btn")) {
      event.preventDefault()
      let id = event.target.getAttribute("data-id")
      let task = event.target.parentElement.parentElement.querySelector(".task-text").innerHTML
      this.deleteModal.classList.add("modal--visible")
      this.deleteModal.querySelector(".modal__button--delete").setAttribute("data-id", id)
      this.deleteModal.querySelector(".modal__text").value = task
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
      let id = event.target.getAttribute("data-id")
      this.editModal.classList.add("modal--visible")
      this.editModal.querySelector(".modal__text").value = input
      this.editModal.querySelector(".modal__update-btn").setAttribute("data-id", id)
    }
  }

  checkIfTasks() {
    if (!document.querySelector(".task")) {
      let deleteForm = document.querySelector(".delete-all-form")
      deleteForm.classList.add("delete-all-btn-animation")
      deleteForm.addEventListener("animationend", () => {
        deleteForm.remove()
        this.taskList.insertAdjacentHTML('beforeend', this.emptyTaskHTML())
        document.querySelector(".empty-task").classList.add("empty-task--visible");
      })
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

  // Modal Models:
  modalExitBtnAction(event) {
    if (event.target.parentElement.classList.contains("modal__exit-btn")) {
      event.target.parentElement.parentElement.classList.remove("modal--visible")
    }
  }

  modalCancelBtnAction(event) {
    if (event.target.classList.contains("modal__button--cancel") || event.target.classList.contains("modal__cancel-btn")) {
      event.target.parentElement.parentElement.classList.remove("modal--visible")
    }
  }

  modalUpdateBtnAction(event) {
    if (event.target.classList.contains("modal__update-btn")) {
      let result = event.target.parentElement.querySelector(".modal__text").value
      if (result && result.length <= 100) {
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
        .then(response => response.text())
        .then((text) => {
          // Updates task text in frontend
          this.editModal.classList.remove("modal--visible")
          this.editModal.querySelector(".modal__text").value = ""
          let task = document.querySelector(`[data-id='${id}']`).parentElement.parentElement.parentElement
          task.querySelector(".task-text").innerHTML = result
        })
        .catch(function() {
          this.editModal.classList.remove("modal--visible")
          alert("Please try again later.")
        })
      } else {
        this.editModal.classList.remove("modal--visible")
      }
    }
  }

  modalDeleteBtnAction(event) {
    if (event.target.classList.contains("modal__button--delete")) {
      let result = this.deleteModal.querySelector(".modal__text").value
      let id = event.target.getAttribute("data-id")
      if (result) {
        // Sends post request to delete task from database
        fetch(`/delete/${id}`)
        .then(() => {
          // Removes element from frontend
          this.deleteModal.classList.remove("modal--visible")
          let taskItem = document.querySelector(`[data-id="${id}"]`).parentElement.parentElement.parentElement
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

  modalDeleteAllBtnAction(event) {
    if (event.target.classList.contains("modal__button--delete-all")) {
      fetch("/delete-tasks", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(() => {
        this.deleteAllModal.classList.remove("modal--visible")
        this.taskList.innerHTML = this.emptyTaskHTML()
        document.querySelector(".empty-task").classList.add("empty-task--visible");
      })
      .catch(() => {
        alert("Error. Please try again later.")
      })
    }
  }

}