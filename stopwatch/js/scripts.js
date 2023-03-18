window.onload = function () {
  var stopwatches = document.getElementsByClassName('stopwatch');
  for (var i = 0; i < stopwatches.length; i++) {
    stopwatches[i]
      .querySelectorAll('input[id^="start"]')[0]
      .addEventListener('click', startTimer);
    stopwatches[i]
      .querySelectorAll('input[id^="lap"]')[0]
      .addEventListener('click', markTimer);
    stopwatches[i]
      .querySelectorAll('input[id^="pause"]')[0]
      .addEventListener('click', markTimer);
    stopwatches[i]
      .querySelectorAll('input[id^="reset"]')[0]
      .addEventListener('click', resetTimer);
  }
}

// Start or Resume clicked
function startTimer(ev) {}

// Reset clicked
function resetTimer(ev) {
  var stopwatch = this.parentNode;
  var logs = stopwatch.getElementsByClassName('logs')[0];
  var log = logs.firstElementChild;
  if (log.getElementsByTagName('tbody')[0].firstElementChild == null)
    return;
  var id = Date.now();
  var newLabel = document.createElement('label');
  newLabel.setAttribute('for', id);
  newLabel.innerHTML = '<div>&#x276f;</div>';
  log.insertBefore(newLabel, log.firstElementChild);
  var newInput = document.createElement('input');
  newInput.setAttribute('type', 'checkbox');
  newInput.setAttribute('id', id);
  log.insertBefore(newInput, log.firstElementChild);
  var newDiv = document.createElement('div');
  newDiv.dataset.markCount = 0;
  newDiv.dataset.timeElapsed = '00:00:00.00';
  newDiv.innerHTML = '<div><table><tbody></tbody></table></div>';
  logs.insertBefore(newDiv, logs.firstElementChild);
}

// click on Lap button or Pause button 
function markTimer(ev) {
  var stopwatch = this.parentNode;
  var log = stopwatch.getElementsByClassName('logs')[0].firstElementChild;
  var tbody = log.getElementsByTagName('tbody')[0];
  var markCount = log.dataset.markCount;
  var timeElapsed = getTimer(stopwatch);
  var lastTimeElapsed = log.dataset.timeElapsed;
  var lapTime = computeLapTime(timeElapsed, lastTimeElapsed);
  markCount++;
  var newTr = document.createElement('tr');
  newTr.className = 'lap';
  newTr.innerHTML = '<td class="type">' + ev.target.dataset.action + '</td>' +
    '<td class="count">' + markCount + '</td>' +
    '<td class="timeElapsed">' + timeElapsed + '</td>' +
    '<td class="laptime">+' + lapTime + '</td>';
  tbody.insertBefore(newTr, tbody.firstElementChild);
  log.dataset.markCount = markCount;
  log.dataset.timeElapsed = timeElapsed;
}

function getTopNumerical(el) {
  return window
    .getComputedStyle(el)
    .getPropertyValue('top')
    .match(/\d+/);
}

function getTimer(stopwatch) {
  var digits = stopwatch
    .getElementsByClassName('digits');
  return '' +
    getTopNumerical(digits[0]) / 40 +
    getTopNumerical(digits[1]) / 40 +
    ':' +
    getTopNumerical(digits[3]) / 40 +
    getTopNumerical(digits[4]) / 40 +
    ':' +
    getTopNumerical(digits[6]) / 40 +
    getTopNumerical(digits[7]) / 40 +
    '.' +
    getTopNumerical(digits[9]) / 40 +
    getTopNumerical(digits[10]) / 40;
}

function padZero(i) {
  if (i < 10) return '0' + i;
  return '' + i;
}

function computeLapTime(timeElapsed, lastTimeElapsed) {
  var to = timeElapsed.split(/[:.]/);
  var from = lastTimeElapsed.split(/[:.]/);
  diff = (((parseInt(to[0]) * 60 + parseInt(to[1])) * 60 + parseInt(to[2])) * 100 + parseInt(to[3])) -
    (((parseInt(from[0]) * 60 + parseInt(from[1])) * 60 + parseInt(from[2])) * 100 + parseInt(from[3]))
  str = padZero(diff % 100);
  diff = Math.floor(diff / 100);
  str = padZero(diff % 60) + '.' + str;
  diff = Math.floor(diff / 60);
  str = padZero(diff % 60) + ':' + str;
  diff = Math.floor(diff / 60);
  str = padZero(diff % 60) + ':' + str;
  return str;
}