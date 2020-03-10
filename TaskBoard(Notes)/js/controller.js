// Initial settings - Page load - set valus from first use / local storage (reuse)
var isPageRefresh = false;
var notesArray;
if (localStorage.getItem("notes") != null) {
  notesArray = JSON.parse(localStorage.getItem("notes"));
} else {
  notesArray = [];
}

sortingValue = "0";

// create page notes after initial page
showAfterRefresh();

// Validate user inputs then addnote/create alerts
function formValidation(task, targetDate, targetTime, currentTime) {
  if (task.value == "") {
    createFormAlerts(task, task.id, targetDate.id);
    return false;
  } else if (targetDate.value == "") {
    createFormAlerts(targetDate, task.id, targetDate.id);
    return false;
  }
  var targetDateForCheck = new Date(targetDate.value);
  var combinedDateAndTime = combiningDateAndTime(targetDate.value, targetTime.value);
  if (combinedDateAndTime.getTime() < currentTime.getTime()) {
    if (targetDateForCheck.getFullYear() == currentTime.getFullYear() && targetDateForCheck.getMonth() == currentTime.getMonth() && targetDateForCheck.getDate() == currentTime.getDate()) {
      createFormAlerts(targetTime, task.id, targetDate.id);
    } else {
      createFormAlerts(targetDate, task.id, targetDate.id);
    }
    return false;
  }
  return true;
}

// If pass validation adding notes for noteArray
function addNote() {
  var task = elementById("taskinput");
  var targetDate = elementById("dateinput");
  var targetTime = elementById("timeinput");
  var currentTime = new Date();
  if (formValidation(task, targetDate, targetTime, currentTime)) {
    {
      notesArray.push(new Note(task.value, targetDate.value, targetTime.value, currentTime));
      addNoteToDom(notesArray.length - 1, isPageRefresh);
    }
    localStorage.setItem("notes", JSON.stringify(notesArray));
    resetFormInputsAndStyle();
  }
}

// By clicking on 'X' remove note from page and from notesArray - 1 second delay for fade-out effect act properly
function removeNote(e) {
  var noteToRemove = e.path[1];
  for (var i = 0; i < notesArray.length; i++) {
    if (notesArray[i].id == noteToRemove.id) {
      styleControl(noteToRemove, "opacity", "0");
      setTimeout(function() {
        removeNoteFromDom(notesArray[i].id);
        notesArray.splice(i, 1);
        localStorage.setItem("notes", JSON.stringify(notesArray));
      }, 1000);
      break;
    }
  }
}
