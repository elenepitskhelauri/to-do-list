/* ========= ELEMENTS ========= */
/* ========= USER NAME ========= */

let userName = localStorage.getItem("username");

if(!userName){

  userName = prompt("What's your name?");

  if(!userName || userName.trim() === ""){
    userName = "User";
  }

  localStorage.setItem("username", userName);

}

/* ========= LANGUAGE ========= */

let currentLang = "en";

const enBtn = document.getElementById("enBtn");
const geoBtn = document.getElementById("geoBtn");

const title = document.getElementById("title");
const todayDate = document.getElementById("todayDate");

/* ========= TRANSLATIONS ========= */

const translations = {

  en:{

    title:"Todo List",

    add:"ADD",

    search:"Search tasks...",

    taskPlaceholder:"What do you need to do?",

    total:"Total",

    completed:"Completed",

    remaining:"Remaining",

    active:"ACTIVE TASKS",

    completedTasks:"COMPLETED TASKS"

  },

  ge:{

    title:"დავალებების სია",

    add:"დამატება",

    search:"მოძებნე დავალება...",

    taskPlaceholder:"რის გაკეთება გინდა?",

    total:"სულ",

    completed:"შესრულებული",

    remaining:"დარჩენილი",

    active:"აქტიური დავალებები",

    completedTasks:"შესრულებული დავალებები"

  }

};
const taskInput = document.getElementById("taskInput");
const taskTime = document.getElementById("taskTime");
const taskDate = document.getElementById("taskDate");

const priority = document.getElementById("priority");
const category = document.getElementById("category");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");
const completedList = document.getElementById("completedList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");

const progressBar = document.getElementById("progressBar");

const searchInput = document.getElementById("searchInput");

const calendarFilter = document.getElementById("calendarFilter");
/* ========= LANGUAGE UPDATE ========= */

function updateLanguage(){

  const lang = translations[currentLang];

  /* TITLE */

  title.textContent =
    `${userName}'s ${lang.title}`;

  /* INPUTS */

  taskInput.placeholder =
    lang.taskPlaceholder;

  searchInput.placeholder =
    lang.search;

  addBtn.textContent =
    lang.add;

  /* STATS */

  document.querySelectorAll(".stat-card p")[0]
    .textContent = lang.total;

  document.querySelectorAll(".stat-card p")[1]
    .textContent = lang.completed;

  document.querySelectorAll(".stat-card p")[2]
    .textContent = lang.remaining;

  /* TITLES */

  document.querySelectorAll(".section-title")[0]
    .textContent = lang.active;

  document.querySelectorAll(".section-title")[1]
    .textContent = lang.completedTasks;

  /* DATE */

const now = new Date();

const geDays = [
  "კვირა",
  "ორშაბათი",
  "სამშაბათი",
  "ოთხშაბათი",
  "ხუთშაბათი",
  "პარასკევი",
  "შაბათი"
];

const enDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const geMonths = [
  "იანვარი",
  "თებერვალი",
  "მარტი",
  "აპრილი",
  "მაისი",
  "ივნისი",
  "ივლისი",
  "აგვისტო",
  "სექტემბერი",
  "ოქტომბერი",
  "ნოემბერი",
  "დეკემბერი"
];

const enMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

if(currentLang === "ge"){

  todayDate.textContent =
  `${geDays[now.getDay()]}, 
  ${now.getDate()} 
  ${geMonths[now.getMonth()]} 
  ${now.getFullYear()}`;

}else{

  todayDate.textContent =
  `${enDays[now.getDay()]}, 
  ${enMonths[now.getMonth()]} 
  ${now.getDate()}, 
  ${now.getFullYear()}`;

}
  /* ACTIVE BUTTON */

  enBtn.classList.remove("active");
  geoBtn.classList.remove("active");

  if(currentLang === "en"){
    enBtn.classList.add("active");
  }else{
    geoBtn.classList.add("active");
  }

}
/* ========= STORAGE ========= */

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* ========= SAVE ========= */

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ========= STATS ========= */

function updateStats(){

  const total = tasks.length;

  const completed =
    tasks.filter(task => task.completed).length;

  const remaining = total - completed;

  totalTasks.textContent = total;
  completedTasks.textContent = completed;
  remainingTasks.textContent = remaining;

  const percent =
    total === 0
    ? 0
    : (completed / total) * 100;

  progressBar.style.width = percent + "%";
}

/* ========= CONFETTI ========= */

function confettiEffect(){

  for(let i = 0; i < 30; i++){

    const confetti =
      document.createElement("div");

    confetti.classList.add("confetti");

    confetti.style.left =
      Math.random() * 100 + "vw";

    confetti.style.background =
      `hsl(${Math.random()*360},100%,50%)`;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 3000);

  }

}

/* ========= NOTIFICATIONS ========= */

if(Notification.permission !== "granted"){
  Notification.requestPermission();
}

/* ========= RENDER ========= */

function renderTasks(){

  taskList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach((task,index) => {

    const taskDiv =
      document.createElement("div");

    taskDiv.classList.add(
      "task",
      task.priority
    );

    if(task.completed){
      taskDiv.classList.add("completed");
    }

    /* LEFT */

    const left =
      document.createElement("div");

    left.classList.add("left");

    const text =
      document.createElement("div");

    text.classList.add("task-text");

    text.textContent = task.text;

    const info =
      document.createElement("div");

    info.classList.add("task-info");

    info.innerHTML = `
      <span>📅 ${task.date}</span>
      <span>⏰ ${task.time}</span>
      <span class="category-pill">
        ${task.category}
      </span>
    `;

    left.appendChild(text);
    left.appendChild(info);

    /* RIGHT */

    const right =
      document.createElement("div");

    right.classList.add("right");

    /* DONE */

    const doneBtn =
      document.createElement("button");

    doneBtn.classList.add("done-btn");

    doneBtn.textContent =
      task.completed
      ? "UNDO"
      : "DONE";

    doneBtn.addEventListener("click", () => {

      tasks[index].completed =
        !tasks[index].completed;

      saveTasks();

      renderTasks();

      if(tasks[index].completed){

        confettiEffect();

        new Notification(
          "Task Completed 🎉"
        );

      }

    });

    /* EDIT */

    const editBtn =
      document.createElement("button");

    editBtn.classList.add("done-btn");

    editBtn.textContent = "EDIT";

    editBtn.addEventListener("click", () => {

      const newText =
        prompt(
          "Edit task",
          task.text
        );

      if(newText){

        tasks[index].text = newText;

        saveTasks();

        renderTasks();

      }

    });

    /* DELETE */

    const deleteBtn =
      document.createElement("button");

    deleteBtn.classList.add("delete-btn");

    deleteBtn.textContent = "DELETE";

    deleteBtn.addEventListener("click", () => {

      taskDiv.classList.add("removing");

      setTimeout(() => {

        tasks.splice(index,1);

        saveTasks();

        renderTasks();

      },300);

    });

    right.appendChild(doneBtn);
    right.appendChild(editBtn);
    right.appendChild(deleteBtn);

    taskDiv.appendChild(left);
    taskDiv.appendChild(right);

    if(task.completed){
      completedList.appendChild(taskDiv);
    }else{
      taskList.appendChild(taskDiv);
    }

  });

  updateStats();

}

/* ========= ADD TASK ========= */

function addTask(){

  if(taskInput.value.trim() === ""){
    return;
  }

  const task = {

    text:taskInput.value,

    time:
      taskTime.value || "No Time",

    date:
      taskDate.value || "No Date",

    priority:
      priority.value,

    category:
      category.value,

    completed:false

  };

  tasks.push(task);

  saveTasks();

  renderTasks();

  taskInput.value = "";
  taskTime.value = "";
  taskDate.value = "";

}

/* ========= SEARCH ========= */

searchInput.addEventListener("input", () => {

  const value =
    searchInput.value.toLowerCase();

  document
    .querySelectorAll(".task")
    .forEach(task => {

      const text =
        task.innerText.toLowerCase();

      task.style.display =
        text.includes(value)
        ? "flex"
        : "none";

    });

});

/* ========= CALENDAR FILTER ========= */

calendarFilter.addEventListener("change", () => {

  const value = calendarFilter.value;

  document
    .querySelectorAll(".task")
    .forEach(task => {

      const text = task.innerText;

      task.style.display =
        text.includes(value)
        ? "flex"
        : "none";

    });

});

/* ========= EVENTS ========= */

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress",(e)=>{

  if(e.key === "Enter"){
    addTask();
  }

});
/* ========= LANGUAGE EVENTS ========= */

enBtn.addEventListener("click", () => {

  currentLang = "en";

  updateLanguage();

});

geoBtn.addEventListener("click", () => {

  currentLang = "ge";

  updateLanguage();

});

/* ========= START ========= */

updateLanguage();
/* ========= START ========= */

renderTasks();
