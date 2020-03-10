// Get element by id - mainly created to help controler access element;
function elementById(id) {
  return document.getElementById(id);
}

// Set style attribute and value to element
function styleControl(element, key, value) {
  element.style[key] = value;
}

// Adding note to page on with all its information from its constructor
function addNoteToDom(i, isPageRefresh) {
  var container = elementById("notes-container");
  var newNote = document.createElement("div");
  newNote.setAttribute("class", "note");
  newNote.setAttribute("id", notesArray[i].id);
  if (isPageRefresh != true) {
    styleControl(newNote, "opacity", "0");
  }
  setTimeout(function() {
    styleControl(newNote, "opacity", "1");
  }, 10);

  var innerDivForText = document.createElement("div");
  innerDivForText.innerText = notesArray[i].task;
  innerDivForText.setAttribute("class", "innerDivForText");

  var innerDivForCurrentDate = document.createElement("div");
  innerDivForCurrentDate.innerText = dateConvertor(notesArray[i].currentTime);
  innerDivForCurrentDate.setAttribute("class", "innerDivForCurrentDate");

  var innerDivForTargetDate = document.createElement("div");
  innerDivForTargetDate.innerText = dateConvertor(notesArray[i].targetDate) + "  " + notesArray[i].targetTime;
  innerDivForTargetDate.setAttribute("class", "innerDivForTargetDate");

  var targetTextDiv = document.createElement("div");
  targetTextDiv.innerText = "Target Date: ";
  targetTextDiv.setAttribute("class", "targetTextDiv");

  var removeButton = document.createElement("div");
  removeButton.innerText = "X";
  removeButton.setAttribute("class", "removeButton");
  removeButton.setAttribute("onclick", "removeNote(event)");

  newNote.appendChild(innerDivForText);
  newNote.appendChild(innerDivForCurrentDate);
  newNote.appendChild(innerDivForTargetDate);
  newNote.appendChild(targetTextDiv);
  newNote.appendChild(removeButton);

  container.appendChild(newNote);
}

// Remove note from dom
function removeNoteFromDom(noteId) {
  var notePath = elementById(noteId);
  notePath.parentNode.removeChild(notePath);
}

// Create form alerts if not pass validation
function createFormAlerts(whereToCreateAlert, taskId, targetDateId) {
  var alertsDiv = elementById("alerts");
  switch (whereToCreateAlert.id) {
    case taskId:
      alertsDiv.innerText = "You must enter your task into the right place (Marked in red)";
      whereToCreateAlert.classList.add("not-pass-validation");
      break;
    case targetDateId:
      if (whereToCreateAlert.value == "") {
        alertsDiv.innerText = "You must enter your target date for mission into the right place (Marked in red) in the proper format: dd/mm/yyyy";
        whereToCreateAlert.classList.add("not-pass-validation");
      } else {
        alertsDiv.innerText = "The Date you entered already passed, please enter a new one";
        whereToCreateAlert.classList.add("not-pass-validation");
      }
      break;
    case "timeinput":
      alertsDiv.innerText = "You are creating task for today,Please check the 'hour' value";
      whereToCreateAlert.classList.add("not-pass-validation");
      break;
  }
  alertsDiv.classList.add("not-pass-validation");
  removeAlertsFromInputs(whereToCreateAlert, alertsDiv);
}

//Remove alerts after user changes input
function removeAlertsFromInputs(whereToRemoveAlert, alertsDiv) {
  whereToRemoveAlert.addEventListener("change", function(event) {
    event.target.classList.remove("not-pass-validation");
    alertsDiv.classList.remove("not-pass-validation");
    alertsDiv.innerText = "";
  });
}

// Reset all form inputs and alerts
function resetFormInputsAndStyle() {
  setTimeout(function() {
    var taskInput = elementById("taskinput");
    var dateInput = elementById("dateinput");
    var timeInput = elementById("timeinput");
    var alertsInput = elementById("alerts");
    taskInput.classList.remove("not-pass-validation");
    taskInput.value = "";
    dateInput.classList.remove("not-pass-validation");
    dateInput.value = "";
    timeInput.value = "00:00";
    timeInput.classList.remove("not-pass-validation");
    alertsInput.classList.remove("not-pass-validation");
    alertsInput.innerText = "";
  }, 10);
}

// Init after refresh (input from localstorage)
function showAfterRefresh() {
  for (var i = 0; i < notesArray.length; i++) {
    addNoteToDom(i, isPageRefresh, true);
  }
}
