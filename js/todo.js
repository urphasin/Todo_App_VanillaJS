/* Add-task Logic here*/
document.getElementById("taskInput").addEventListener('keydown', function(e) {
    if(e.key === 'Enter') {
        checkAndRenderUI();
    }
})
document.getElementById('addTask').addEventListener('click', checkAndRenderUI);
function checkAndRenderUI() {
    const ul = document.getElementById('taskList');
    const input = document.getElementById('taskInput');
    const li = document.createElement('li');

    const task = input.value.trim();

    if (task) {
        li.innerHTML = task;
        li.className = "list-group-item custom-task";
        ul.appendChild(li);
        input.value = "";
    }

}
/* End of Add-task Logic here*/


/*Remove-task Logic here*/

/*End of Remove-task Logic here*/
