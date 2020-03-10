// Constructor for Note
function Note(task, targetDate, targetTime, currentTime) {
  this.id = currentTime.getTime();
  this.task = task;
  this.targetDate = targetDate;
  this.targetTime = targetTime;
  this.currentTime = currentTime;
}
