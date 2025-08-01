let draggedItem = null;

/*Load tasks from Storage Logic here*/
window.addEventListener('DOMContentLoaded', function() {
   const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
   tasks.forEach(addTaskToList);
});
/*End of Load tasks from Storage Logic here*/

/* Add task List-Item Logic here*/
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
    const input = document.getElementById('taskInput');

    li.textContent = task;
    li.className = "list-group-item custom-task";

    /*Drag and Drop Logic here*/
    {
        li.setAttribute('draggable', 'true');

        li.addEventListener('dragstart', function () {
            draggedItem = li;
            setTimeout(function () {
                li.style.display = 'none';
            }, 0);
        });

        li.addEventListener('dragend', function () {
            setTimeout(function () {
                draggedItem.style.display = 'block';
                draggedItem = null;
                updateStorageFromDOM();
            }, 0);
        });

        li.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        li.addEventListener('drop', function (e) {
            e.preventDefault();
            if (li !== draggedItem) {
                const ul = document.getElementById('taskList');
                ul.insertBefore(draggedItem, li);
            }
        });
    }
    /*End of Drag and Drop Logic here*/


    /*Delete task button logic here*/
    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.className = 'btn btn-sm btn-danger float-end';

    /*Handle delete from Storage Logic here*/
    delBtn.addEventListener('click', function() {
       ul.removeChild(li);
       removeTaskFromStorage(task);
       input.focus();
    });
    /*End of Handle delete from Storage Logic here*/


    li.appendChild(delBtn);
    /*End of Delete task button here*/

    ul.appendChild(li);
}
function saveTaskToStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
/* End of Add task List-Item Logic here*/

/*Remove task from localstorage Logic here*/
function removeTaskFromStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Remove first matching in case of duplicates
    const index = tasks.indexOf(taskToRemove);
    if (index !== -1) {
        tasks.splice(index, 1);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
/*End of Remove task from localstorage Logic here*/

/*Update Storage From DOM Logic here*/
function updateStorageFromDOM() {
    const tasks = [];
    const lis = document.querySelectorAll("#taskList li");

    lis.forEach(li => {
        // Extract just the task text, ignoring the delete button
        const taskText = li.childNodes[0].textContent.trim();
        tasks.push(taskText);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
/*End of Update Storage From DOM Logic here*/


