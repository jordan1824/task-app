!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.registerFormFields=document.querySelectorAll(".register-field"),this.taskFormField=document.querySelector(".task-input"),this.usernameCounter=0,this.emailCounter=0,this.passwordCounter=0,this.registerFormFields&&this.events(),this.taskFormField&&this.indexEvents()}var t,n,r;return t=e,(n=[{key:"events",value:function(){var e=this;this.registerFormFields.forEach((function(t){return t.addEventListener("keyup",(function(){t.classList.contains("username")&&e.usernameFieldHandler(t),t.classList.contains("email")&&e.emailFieldHandler(t),t.classList.contains("password")&&e.passwordFieldHandler(t)}))}))}},{key:"indexEvents",value:function(){var e=this;this.taskFormField.addEventListener("keyup",(function(){13!=event.keyCode&&e.taskFieldHandler()})),this.taskFormField.addEventListener("keydown",(function(t){13!=t.keyCode&&e.removeTaskAlert()}))}},{key:"taskFieldHandler",value:function(){var e=0;this.taskFormField.value.length>100&&(e=this.insertAlert(this.taskFormField,"Task must not exceed 100 characters.",e)),e||this.removeAlert(this.taskFormField)}},{key:"removeTaskAlert",value:function(){this.taskFormField.value.length<100&&document.querySelector(".alert")&&(this.taskFormField.parentElement.querySelector(".alert").classList.add("reverse-error-popup-animation"),this.taskFormField.parentElement.querySelector(".alert").addEventListener("animationend",(function(){this.remove()})))}},{key:"usernameFieldHandler",value:function(e){var t=0;clearTimeout(this.usernameCounter),e.value.length>50&&(t=this.insertAlert(e,"Your username cannot exceed 50 characters.",t)),e.value.match(/[$&+,:;=?@#|'<>.^*()%!_-]+/)&&(t=this.insertAlert(e,"Your username cannot contain special characters.",t)),this.usernameTimedChecks(e,t),t||this.removeAlert(e)}},{key:"usernameTimedChecks",value:function(e,t){var n=this;e.value.length>0&&e.value.length<4&&(this.usernameCounter=setTimeout((function(){return t=n.insertAlert(e,"Your username must be atleast 4 characters long.",t)}),2e3)),0==e.value.length&&(this.usernameCounter=setTimeout((function(){return t=n.insertAlert(e,"You must enter a valid username.",t)}),2e3))}},{key:"emailFieldHandler",value:function(e){var t=0;clearTimeout(this.emailCounter),e.value.length>200&&(t=this.insertAlert(e,"Your email cannot exceed 200 characters.",t)),this.emailTimedChecks(e,t),t||this.removeAlert(e)}},{key:"emailTimedChecks",value:function(e,t){var n=this;e.value.match(/[A-Za-z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/)||(this.emailCounter=setTimeout((function(){return t=n.insertAlert(e,"You must provide a valid email address.",t)}),3e3))}},{key:"passwordFieldHandler",value:function(e){var t=0;clearTimeout(this.passwordCounter),e.value.length>50&&(t=this.insertAlert(e,"Your password cannot exceed 50 characters.",t)),this.passwordTimedChecks(e,t),t||this.removeAlert(e)}},{key:"passwordTimedChecks",value:function(e,t){var n=this;e.value.length>0&&e.value.length<8&&(this.passwordCounter=setTimeout((function(){return t=n.insertAlert(e,"Your password must be atleast 8 characters long.",t)}),2e3)),0==e.value.length&&(this.passwordCounter=setTimeout((function(){return t=n.insertAlert(e,"You must enter a valid password.",t)}),2e3))}},{key:"insertAlert",value:function(e,t,n){return n+=1,e.parentElement.querySelector(".alert")||(e.parentElement.insertAdjacentHTML("afterbegin",this.alertHTML(t)),e.parentElement.querySelector(".alert").addEventListener("animationend",(function(){this.classList.remove("error-popup-animation")}))),n}},{key:"alertHTML",value:function(e){return"<div class='alert error-popup-animation'>\n      <p class='error-message'>".concat(e,"</p>\n    </div>")}},{key:"removeAlert",value:function(e){if(e.parentElement.querySelector(".alert")){var t=e.parentElement.querySelector(".alert");t.classList.add("reverse-error-popup-animation"),t.addEventListener("animationend",(function(){t.remove()}))}}}])&&a(t.prototype,n),r&&a(t,r),e}();function i(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.taskList=document.querySelector(".task-list"),this.deleteModal=document.querySelector(".delete-modal"),this.editModal=document.querySelector(".edit-modal"),this.deleteAllModal=document.querySelector(".delete-all-modal"),this.taskList&&this.events()}var t,n,a;return t=e,(n=[{key:"events",value:function(){var e=this;document.addEventListener("click",(function(t){e.deleteBtnAction(t),e.checkBtnAction(t),e.editBtnAction(t),e.deleteAllBtnAction(t),e.modalExitBtnAction(t),e.modalCancelBtnAction(t),e.modalUpdateBtnAction(t),e.modalDeleteBtnAction(t),e.modalDeleteAllBtnAction(t)})),document.addEventListener("keyup",(function(e){27==e.keyCode&&document.querySelector(".modal--visible")&&document.querySelector(".modal--visible").classList.remove("modal--visible")}))}},{key:"deleteAllBtnAction",value:function(e){e.target.classList.contains("delete-all-btn")&&(e.preventDefault(),this.deleteAllModal.classList.add("modal--visible"))}},{key:"deleteBtnAction",value:function(e){if(e.target.classList.contains("delete-btn")){e.preventDefault();var t=e.target.getAttribute("data-id"),n=e.target.parentElement.parentElement.querySelector(".task-text").innerHTML;this.deleteModal.classList.add("modal--visible"),this.deleteModal.querySelector(".modal__button--delete").setAttribute("data-id",t),this.deleteModal.querySelector(".modal__text").value=n}}},{key:"checkBtnAction",value:function(e){var t=this;if(e.target.classList.contains("check-link")&&e.preventDefault(),e.target.classList.contains("check-btn")){e.preventDefault();var n=e.target.getAttribute("data-id");fetch("/delete/".concat(n)).then((function(){var n=e.target.parentElement.parentElement.parentElement;n.classList.add("animation"),n.addEventListener("animationend",(function(){n.remove(),t.checkIfTasks()}))})).catch((function(){this.errorAlert("Please try again later.")}))}}},{key:"editBtnAction",value:function(e){if(e.target.classList.contains("edit-btn")){e.preventDefault();var t=e.target.parentElement.parentElement.querySelector(".task-text").innerHTML,n=e.target.getAttribute("data-id");this.editModal.classList.add("modal--visible"),this.editModal.querySelector(".modal__text").value=t,this.editModal.querySelector(".modal__update-btn").setAttribute("data-id",n)}}},{key:"checkIfTasks",value:function(){var e=this;if(!document.querySelector(".task")){var t=document.querySelector(".delete-all-form");t.classList.add("delete-all-btn-animation"),t.addEventListener("animationend",(function(){t.remove(),e.taskList.insertAdjacentHTML("beforeend",e.emptyTaskHTML()),document.querySelector(".empty-task").classList.add("empty-task--visible")}))}}},{key:"emptyTaskHTML",value:function(){return"<li class='task empty-task'>\n    <h3 class='empty-task-title'>You do not have any tasks.</h3>\n  </li>"}},{key:"errorAlert",value:function(e){if(!document.querySelector(".error-alert"))return this.body.insertAdjacentHTML("afterbegin",this.alertHTML(e))}},{key:"alertHTML",value:function(e){return"<div class='error-alert'>\n      <h3 class='alert-heading'>Error:</h3>\n      <p class='alert-message'>".concat(e,"</p>\n      </div>")}},{key:"modalExitBtnAction",value:function(e){e.target.parentElement.classList.contains("modal__exit-btn")&&e.target.parentElement.parentElement.classList.remove("modal--visible")}},{key:"modalCancelBtnAction",value:function(e){(e.target.classList.contains("modal__button--cancel")||e.target.classList.contains("modal__cancel-btn"))&&e.target.parentElement.parentElement.classList.remove("modal--visible")}},{key:"modalUpdateBtnAction",value:function(e){var t=this;if(e.target.classList.contains("modal__update-btn")){var n=e.target.parentElement.querySelector(".modal__text").value;if(n&&n.length<=100){var a=e.target.getAttribute("data-id"),r={task:n};fetch("/edit/".concat(a),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then((function(e){return e.text()})).then((function(e){t.editModal.classList.remove("modal--visible"),t.editModal.querySelector(".modal__text").value="",document.querySelector("[data-id='".concat(a,"']")).parentElement.parentElement.parentElement.querySelector(".task-text").innerHTML=n})).catch((function(){this.editModal.classList.remove("modal--visible"),alert("Please try again later.")}))}else this.editModal.classList.remove("modal--visible")}}},{key:"modalDeleteBtnAction",value:function(e){var t=this;if(e.target.classList.contains("modal__button--delete")){var n=this.deleteModal.querySelector(".modal__text").value,a=e.target.getAttribute("data-id");n&&fetch("/delete/".concat(a)).then((function(){t.deleteModal.classList.remove("modal--visible");var e=document.querySelector('[data-id="'.concat(a,'"]')).parentElement.parentElement.parentElement;e.classList.add("animation"),e.addEventListener("animationend",(function(){e.remove(),t.checkIfTasks()}))})).catch((function(){this.errorAlert("Please try again later.")}))}}},{key:"modalDeleteAllBtnAction",value:function(e){var t=this;e.target.classList.contains("modal__button--delete-all")&&fetch("/delete-tasks",{method:"POST",headers:{"Content-Type":"application/json"}}).then((function(){t.deleteAllModal.classList.remove("modal--visible"),t.taskList.innerHTML=t.emptyTaskHTML(),document.querySelector(".empty-task").classList.add("empty-task--visible")})).catch((function(){alert("Error. Please try again later.")}))}}])&&i(t.prototype,n),a&&i(t,a),e}();function l(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.form=document.querySelector(".form"),this.taskField=document.querySelector(".task-input"),this.taskList=document.querySelector(".task-list"),this.body=document.querySelector("body"),this.form&&this.events()}var t,n,a;return t=e,(n=[{key:"events",value:function(){var e=this;this.form.addEventListener("submit",(function(t){return e.addTask(t)}))}},{key:"addTask",value:function(e){var t=this;e.preventDefault();var n=this.taskField.value;n?fetch("/add-task",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({task:n,sent:"async"})}).then((function(e){return e.json()})).then((function(e){e.task&&(t.taskField.value="",t.taskField.focus(),t.insertTaskHTML(e))})).catch((function(){this.errorAlert("Please try again later.")})):(new r).insertAlert(document.querySelector(".task-input"),"You must enter a valid task.",0)}},{key:"insertTaskHTML",value:function(e){this.taskList.querySelector(".task-item")?this.taskList.insertAdjacentHTML("beforeend",this.taskHTML(e)):(this.taskList.innerHTML=this.taskHTML(e),this.taskList.insertAdjacentHTML("afterbegin",this.deleteAllHTML())),this.taskList.lastChild.addEventListener("animationend",(function(){this.classList.remove("animation-reverse"),document.querySelector(".delete-all-form").classList.add("visible")}))}},{key:"taskHTML",value:function(e){return"<li class='task animation-reverse'>\n    <div class='link-container'>\n      <a class='check-link' href=\"/delete/".concat(e._id,'"><i class="fa check-btn fa-check" data-id="').concat(e._id,"\" aria-hidden=\"true\"></i></a>\n    </div>\n    <div class='task-item'>\n      <span class='task-text'>").concat(e.task,"</span>\n    </div>\n    <div class='btn-container'>\n      <a href=\"/edit/").concat(e._id,'" data-id="').concat(e._id,"\" class='edit-btn btn'>Edit</a>\n      <a href=\"/delete/").concat(e._id,'" data-id="').concat(e._id,"\" class='delete-btn btn'>Delete</a>\n    </div>\n    </li>")}},{key:"deleteAllHTML",value:function(){return'<form action="/delete-tasks" method="POST" class="delete-all-form hidden">\n    <button class="delete-all-btn" type="submit">Delete All Tasks</button>\n    </form>'}},{key:"errorAlert",value:function(e){if(!document.querySelector(".error-alert"))return this.body.insertAdjacentHTML("afterbegin",this.alertHTML(e))}},{key:"alertHTML",value:function(e){return"<div class='error-alert'>\n      <h3 class='alert-heading'>Error:</h3>\n      <p class='alert-message'>".concat(e,"</p>\n      </div>")}}])&&l(t.prototype,n),a&&l(t,a),e}();new r,new s,new o}]);