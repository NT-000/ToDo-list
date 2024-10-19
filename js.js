let isDone = false;

let tasks = [
    { description: 'Handle til middag', isDone: false, person: 'Birgir', deadline: '2024-10.27'},
    { description: 'Kaste søppel', isDone: false, person: 'Arne', deadline: '2024-12.13', },
    { description: 'Lage middag', isDone: false, person: 'Britt', deadline: '2024-11.13' },
    { description: 'Gå tur med hunden', isDone: false, person: 'Ronny', deadline: '2024-10.23' },
    { description: 'Hente unga i barnehagen', isDone: false, person: 'Trine', deadline: '2024-10.21' },
]
function updateView() {
    let createTaskTable = '';
    createTaskTable = /*HTML*/`
<table>
<tr>
<th>Oppgave</th>
<th>Person</th>
<th>Frist</th>
<th>Ferdig</th>
<th>Dato fullført</th>
<th>Slett oppgave</th>
</tr>

${createTask()}
</table>
<input type="text" placeholder="Navn på oppgave..." />
<input type="text" placeholder="Navn på person..."/>
<input type="date" placeholder="Frist..."/>
<button onclick="addTask(this)">Legg til frist</button>`;


    document.getElementById('app').innerHTML = createTaskTable;
}


function addTask(button) {
    let deadlineInput = button.previousElementSibling;
    let personInput = deadlineInput.previousElementSibling;
    let taskInput = personInput.previousElementSibling;

    let taskValue = taskInput.value;
    let personValue = personInput.value;
    let deadlineValue = deadlineInput.value;

    let taskObject =
    {
        description: taskValue,
        isDone: false,
        person: personValue,
        deadline: deadlineValue || 'Ingen frist',
        dateCompleted: null,
    }

    if (taskValue === '') {
        taskInput.placeholder = "Fyll inn oppgave";
        return;
    }
    if (personValue === '') {
        personInput.placeholder = "Fyll inn Navn";
        return;
    }



    tasks.push(taskObject);
    console.log("oppgaveObjekt:", taskObject);
    taskValue = '';
    personValue = '';
    deadlineValue = '';
    updateView();

}

function createTask() {
    let createTaskHtml = '';
    for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {

        createTaskHtml += /*HTML*/`
    <tr>
    <td>${tasks[taskIndex].description}</td>
    <td>${tasks[taskIndex].person || 'Ukjent'}</td>
    <td>${tasks[taskIndex].deadline || 'Ingen frist'}</td>
    <td><input type="checkbox" onchange="changeIsDone(this, ${taskIndex})" ${tasks[taskIndex].isDone ? 'checked' : ''}></td>
    <td>${tasks[taskIndex].dateCompleted || 'Ikke fullført'}</td>
    <td><button onclick="deleteX()">X</button></td>
    `
    }

    return createTaskHtml;

}

function changeIsDone(checkbox, taskIndex) {
    let task = tasks[taskIndex];
    task.isDone = checkbox.checked;
    if (task.isDone) {
        task.dateCompleted = new Date().toISOString().substr(0, 10);
    }
    else {
        task.dateCompleted = null
    }
    updateView();
}

function deleteX(index){
    tasks.splice(index, 1);
    console.log("Bye:", tasks)
    updateView();
}

updateView();