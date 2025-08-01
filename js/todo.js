/*Load tasks from Storage Logic here*/
window.addEventListener('DOMContentLoaded', function() {
   const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
   tasks.forEach(addTaskToList);
});
/*End of Load tasks from Storage Logic here*/

/* Add-task Logic here*/
document.getElementById("taskInput").addEventListener('keydown', function(e) {
    if(e.key === 'Enter') {
        checkAndRenderUI();
    }
})
document.getElementById('addTask').addEventListener('click', checkAndRenderUI);
function checkAndRenderUI() {
    // const ul = document.getElementById('taskList');
    const input = document.getElementById('taskInput');
    // const li = document.createElement('li');

    const task = input.value.trim();

    if (task) {
        addTaskToList(task);
        saveTaskToStorage(task);
        input.value = "";
        input.focus();
    }

}
function addTaskToList(task) {
    const ul = document.getElementById('taskList');
    const li = document.createElement('li');

    li.textContent = task;
    li.className = "list-group-item custom-task";

    ul.appendChild(li);
}
function saveTaskToStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
/* End of Add-task Logic here*/


/*Remove-task Logic here*/

/*End of Remove-task Logic here*/
