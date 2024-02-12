let hourTxt = document.getElementById("hour");
let minuteTxt = document.getElementById("minute");
let secondTxt = document.getElementById("second");
let periodTxt = document.getElementById("period");
let alarmHourTxt = document.getElementById("alarmHour");
let alarmMinuteTxt = document.getElementById("alarmMinute");
let alarmSecondTxt = document.getElementById("alarmSecond");
let alarmPeriodTxt = document.getElementById("alarmPeriod");
let hourPlus = document.getElementById("hourPlus");
let hourMinus = document.getElementById("hourMinus");
let minutePlus = document.getElementById("minutePlus");
let minuteMinus = document.getElementById("minuteMinus");
let secondPlus = document.getElementById("secondPlus");
let secondMinus = document.getElementById("secondMinus");
let periodUpArrow = document.getElementById("upArrow");
let periodDownArrow = document.getElementById("downArrow");
let alarmSetBtn = document.getElementById("alarmSetBtn");
let alarmSound = new Audio("alarm.wav");
let arrowBtn = document.querySelectorAll(".arrow");
let inputs = document.querySelectorAll(".input");
let resetBtn = document.getElementById("resetBtn");
let stopBtn = document.getElementById("stopBtn");
let mainBody = document.getElementById("mainDiv");
let txt = document.querySelectorAll(".txt");
function update() {
  document.querySelectorAll(".input").forEach((box) => {
    if (box.value.toString().length === 1) {
      box.value = "0" + box.value;
    }
  });
}
update();

let hourValue = 0;
let minuteValue = 0;
let secondValue = 0;
let periodValue = "AM";

periodUpArrow.addEventListener("click", () => {
  if (alarmPeriodTxt.value === "AM") {
    alarmPeriodTxt.value = "PM";
  } else {
    alarmPeriodTxt.value = "AM";
  }
});

periodDownArrow.addEventListener("click", () => {
  if (alarmPeriodTxt.value === "AM") {
    alarmPeriodTxt.value = "PM";
  } else {
    alarmPeriodTxt.value = "AM";
  }
});

hourPlus.addEventListener("click", () => {
  hourValue = hourValue + 1;
  if (hourValue > 12) {
    hourValue = 0;
    alarmHourTxt.value = hourValue;
    update();
  } else {
    alarmHourTxt.value = hourValue;
    update();
  }
});

hourMinus.addEventListener("click", () => {
  hourValue = hourValue - 1;
  if (hourValue < 0) {
    hourValue = 12;
    alarmHourTxt.value = hourValue;
    update();
  } else {
    alarmHourTxt.value = hourValue;
    update();
  }
});

minutePlus.addEventListener("click", () => {
  minuteValue = minuteValue + 1;
  if (minuteValue > 59) {
    minuteValue = 0;
    alarmMinuteTxt.value = minuteValue;
    update();
  } else {
    alarmMinuteTxt.value = minuteValue;
    update();
  }
});

minuteMinus.addEventListener("click", () => {
  minuteValue = minuteValue - 1;
  if (minuteValue < 0) {
    minuteValue = 59;
    alarmMinuteTxt.value = minuteValue;
    update();
  } else {
    alarmMinuteTxt.value = minuteValue;
    update();
  }
});

secondPlus.addEventListener("click", () => {
  secondValue = secondValue + 1;
  if (secondValue > 59) {
    secondValue = 0;
    alarmSecondTxt.value = secondValue;
    update();
  } else {
    alarmSecondTxt.value = secondValue;
    update();
  }
});

secondMinus.addEventListener("click", () => {
  secondValue = secondValue - 1;
  if (secondValue < 0) {
    secondValue = 59;
    alarmSecondTxt.value = secondValue;
    update();
  } else {
    alarmSecondTxt.value = secondValue;
    update();
  }
});

setInterval(() => {
  let timeData = new Date();
  let h = timeData.getHours();
  let m = timeData.getMinutes();
  let s = timeData.getSeconds();
  let period;
  if (h >= 12) {
    period = "PM";
  } else {
    period = "AM";
  }
  if (h > 12) {
    h = h - 12;
  }
  if (h.toString().length == 1) {
    h = "0" + h;
  }
  if (m.toString().length == 1) {
    m = "0" + m;
  }
  if (s.toString().length == 1) {
    s = "0" + s;
  }
  hourTxt.textContent = h;
  minuteTxt.textContent = m;
  secondTxt.textContent = s;
  periodTxt.textContent = period;
}, 500);

function setAlarm() {
  let prom = new Promise((resolve, reject) => {
    arrowBtn.forEach((btn) => {
      btn.classList.add("disabled");
    });
    inputs.forEach((input) => {
      input.classList.add("disabled");
    });
    txt.forEach((txt) => {
      txt.classList.add("txtDisabled");
    });
    alarmSetBtn.classList.add("disabled");
    resetBtn.classList.remove("hide");
    setInterval(() => {
      let setHour = document.getElementById("alarmHour").value;
      let setMinute = document.getElementById("alarmMinute").value;
      let setSecond = document.getElementById("alarmSecond").value;
      let setPeriod = document.getElementById("alarmPeriod").value;
      let realHour = new Date().getHours();
      let realMinute = new Date().getMinutes();
      let realSecond = new Date().getSeconds();
      if (setHour[0] == 0) {
        setHour = setHour.toString().slice(1);
      }
      if (setMinute[0] == 0) {
        setMinute = setMinute.toString().slice(1);
      }
      if (setSecond[0] == 0) {
        setSecond = setSecond.toString().slice(1);
      }
      let realPeriod;
      if (realHour >= 12) {
        realPeriod = "PM";
      } else {
        realPeriod = "AM";
      }
      if (realHour > 12) {
        realHour = realHour - 12;
      }
      // console.log(`${setHour} : ${setMinute} : ${setSecond}`);
      // console.log(`${realHour} : ${realMinute} : ${realSecond}`);
      if (
        setHour == realHour &&
        setMinute == realMinute &&
        setSecond == realSecond &&
        setPeriod == realPeriod
      ) {
        resolve();
      }
      resetBtn.addEventListener("click", () => {
        reject();
      });
    }, 500);
  });
  prom.then(() => {
    alarmSound.play();
    let alarmSoundDuration = alarmSound.duration;
    arrowBtn.forEach((btn) => {
      btn.classList.remove("disabled");
    });
    alarmSetBtn.classList.remove("disabled");
    inputs.forEach((input) => {
      input.classList.remove("disabled");
    });
    txt.forEach((txt) => {
      txt.classList.remove("txtDisabled");
    });
    resetBtn.classList.add("hide");
    stopBtn.classList.remove("hide");
    setTimeout(() => {
      stopBtn.classList.add("hide");
      mainBody.classList.remove("vibrate");
    }, alarmSoundDuration * 1000);
    mainBody.classList.add("vibrate");
  });
  stopBtn.addEventListener("click", () => {
    alarmSound.pause();
    stopBtn.classList.add("hide");
    mainBody.classList.remove("vibrate");
  });
  resetBtn.addEventListener("click", () => {
    arrowBtn.forEach((btn) => {
      btn.classList.remove("disabled");
    });
    alarmSetBtn.classList.remove("disabled");
    inputs.forEach((input) => {
      input.classList.remove("disabled");
    });
    txt.forEach((txt) => {
      txt.classList.remove("txtDisabled");
    });
    resetBtn.classList.add("hide");
    document.getElementById("alarmHour").value =
      document.getElementById("alarmHour").value;
    document.getElementById("alarmMinute").value =
      document.getElementById("alarmMinute").value;
    document.getElementById("alarmSecond").value =
      document.getElementById("alarmSecond").value;
  });
}

alarmSetBtn.addEventListener("click", () => {
  setAlarm();
});
