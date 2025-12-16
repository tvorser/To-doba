const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const counter = document.getElementById("counter");
const clearDone = document.getElementById("clearDone");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
  const done = tasks.filter(t => t.done).length;
  counter.textContent = `${done} / ${tasks.length}`;
}

function render() {
  list.innerHTML = "";

  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");

    li.onclick = () => {
      task.done = !task.done;
      save();
      render();
    };

    const del = document.createElement("button");
    del.textContent = "✖";
    del.onclick = (e) => {
      e.stopPropagation();
      tasks.splice(i, 1);
      save();
      render();
    };

    li.appendChild(del);
    list.appendChild(li);
  });

  updateCounter();
}

addBtn.onclick = () => {
  if (!input.value.trim()) return;
  tasks.push({ text: input.value.trim(), done: false });
  input.value = "";
  save();
  render();
};

clearDone.onclick = () => {
  tasks = tasks.filter(t => !t.done);
  save();
  render();
};

render();
