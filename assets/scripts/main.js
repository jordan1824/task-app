import "../styles/main.css"

// Checks to see if there are tasks; if not, it inserts empty task block
function checkIfTasks() {
  if (!document.querySelector(".task")) {
    document.querySelector(".task-list").insertAdjacentHTML('beforeend', `<li class='task empty-task'>
    <h3 class='empty-task-title'>You do not have any tasks.</h3>
  </li>`)
  document.querySelector(".empty-task").classList.add("empty-task--visible");
  }
}

function insertTaskHTML(task) {
  let taskList = document.querySelector(".task-list")
  if (taskList.querySelector(".task-item")) {
    return taskList.insertAdjacentHTML("beforeend", `
    <li class='task'>
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
    </li>
    `)
  } else {
    return taskList.innerHTML = `
    <li class='task'>
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
    </li>
    `
  }
}

document.addEventListener("click", function(event) {
  // Delete Button
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
        taskItem.style.animationPlayState = "running"
        taskItem.addEventListener("animationend", function() {
          taskItem.remove()
          checkIfTasks()
        })
      })
      .catch(function() {
        console.log("There was an error")
      })
    }
  }
   
  // Check Button:
  // Prevents link from executing delete function
  // Note: This is neccessary because the a link partly extends past checkmark
  // Which, if clicked, will prevent the nice smooth animation, and cause a page refresh
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
      taskItem.style.animationPlayState = "running"
      taskItem.addEventListener("animationend", function() {
        taskItem.remove()
        checkIfTasks()
      })
    })
    .catch(function() {
      console.log("There was an error")
    })
  }

  // Edit Button
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
        console.log("Please try again later.")
      })
    }
  }
})

// Alert popup for task form
document.querySelector(".task-input").addEventListener('keyup', function() {
  const taskField = document.querySelector(".task-input")
  if (taskField.value.length > 75) {
    document.querySelector(".alert").classList.add("alert-show")
  } else {
    document.querySelector(".alert").classList.remove("alert-show")
  }
})
// Removes alert popup (this is for if the user holds down backspace)
document.querySelector(".task-input").addEventListener('keydown', function() {
  const taskField = document.querySelector(".task-input")
  if (taskField.value.length < 75) {
    document.querySelector(".alert").classList.remove("alert-show")
  }
})

// Add new post on form submit (make it so you can't submit when form is empty)
document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault()
  let taskField = document.querySelector(".task-input")
  let task = taskField.value
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
        taskField.value = ""
        taskField.focus()
        insertTaskHTML(data)
      } else {
        console.log(data)
        data.forEach(error => {
          alert(error)
        })
      }
    })
    .catch(function() {
      console.log("Please try again later.")
    })
  } else {
    console.log("You must provide input in the form field before submitting.")
  }
})