// save tasks in local storage
function saveTasks(){
    let tasks = [];
    document.querySelectorAll(".inputTask li").forEach(li =>{
        let taskText = li.querySelector("input").value;
        let isCompleted = li.querySelector(".bullet").classList.contains("completed");
        tasks.push({text: taskText, completed: isCompleted});
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// retrieve tasks from local storage
function loadTasks(){
    let savedTasks = localStorage.getItem("tasks");
    let taskList = document.querySelector(".inputTask ul");
    taskList.innerHTML = ""
    if(savedTasks){
        savedTasks = JSON.parse(savedTasks);

        savedTasks.forEach(task => {
            // new <li>
            let newListitem = document.createElement("li");
    
            // new bullet
            let newBullet = document.createElement("span");
            newBullet.classList.add("bullet");
    
            //new inputfield
            let newInput = document.createElement("input");
            newInput.type = "text";
            newInput.value = task.text;
            newInput.size = 40;

            // NEW DELETE BUTTON
            let newDeleteButton = document.createElement("button");
            newDeleteButton.classList.add("delete-btn");
            newDeleteButton.textContent = "🗑️";

            // New edit button
            let newEditButton = document.createElement("button");
            newEditButton.classList.add("edit-btn");
            newEditButton.textContent = "✏️";
    
            // Checking if task was completed before
            if(task.completed){
                newBullet.classList.add("completed");
                newBullet.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.285 6.725a1 1 0 0 0-1.57-1.25l-9.042 11.362-4.161-4.01a1 1 0 1 0-1.394 1.436l5.126 4.939a1 1 0 0 0 1.479-.082l9.562-12.395z" **fill="white" stroke="white" stroke-width="2"**/>
</svg>
`;

                newInput.style.textDecoration = "line-through";
                newInput.style.color = "gray"; // fades text
            }

            // Append everything to li
            newListitem.appendChild(newBullet);
            newListitem.appendChild(newInput);
            newListitem.appendChild(newDeleteButton);
            newListitem.appendChild(newEditButton);

            // Append everything to papa ul
            document.querySelector(".inputTask ul").appendChild(newListitem);

            }

        );
     }
    }

document.addEventListener("DOMContentLoaded", function(){
    loadTasks();
    let addButton = document.querySelector(".inputTask button");
    let inputField = document.querySelector(".inputTask input");
    let listItem = document.querySelector(".inputTask li");
    let taskItem = document.querySelector(".inputTask ul")
    addButton.addEventListener("click", function(){
        addButton.style.display = "none";
         // Create a span for the bullet
         let bullet = document.createElement("span");
         bullet.classList.add("bullet"); // Add a class for styling

         // create a delete buton
         let DeleteButton = document.createElement("button");
            DeleteButton.classList.add("delete-btn");
            DeleteButton.textContent = "🗑️";

        // Create edit button
        let editButton = document.createElement("button");
        editButton.classList.add("edit-btn");
        editButton.textContent = "✏️";
         
         // Clear existing content inside the <li> and insert the bullet + input field
         listItem.innerHTML = ""; 
         listItem.appendChild(bullet);
         listItem.appendChild(inputField);
         listItem.appendChild(DeleteButton);
         listItem.appendChild(editButton);
 

        inputField.focus();
        saveTasks();
    });

    // adding new task
    taskItem.addEventListener("keydown", function(event){
        if(event.key == "Enter" && event.target.tagName === "INPUT" && event.target.value.trim() !== ""){
            event.preventDefault();
    
            // new <li>
            let newListitem = document.createElement("li");
    
            // new bullet
            let newBullet = document.createElement("span");
            newBullet.classList.add("bullet");
    
            //new inputfield
            let newInput = document.createElement("input");
            newInput.type = "text";
            newInput.placeholder = "Add Your Task...";
            newInput.size = 40;

            // NEW DELETE BUTTON
            let newDeleteButton = document.createElement("button");
            newDeleteButton.classList.add("delete-btn");
            newDeleteButton.textContent = "🗑️";

            // New edit button
            let newEditButton = document.createElement("button");
            newEditButton.classList.add("edit-btn");
            newEditButton.textContent = "✏️";
    
            //append everything to li
            newListitem.appendChild(newBullet);
            newListitem.appendChild(newInput);
            newListitem.appendChild(newDeleteButton);
            newListitem.appendChild(newEditButton);
    
            // append everything to ul the old papa of tasks container
            taskItem.appendChild(newListitem);
    
            // focus on new input
            newInput.focus();
            saveTasks();
        }
    });

    // edit, delete, task completed functionalities
    taskItem.addEventListener("click", function(event){

        // DELETE TASK
        if (event.target.classList.contains("delete-btn")) {
            let taskInput = event.target.parentElement.querySelector("input"); // Get the task input
            if (taskInput && taskInput.value.trim() === "") {
                return; // Do nothing if input is empty
            }
            event.target.parentElement.remove(); // Otherwise, delete task
            saveTasks();
        }

        // EDIT TASK
        if (event.target.classList.contains("edit-btn")){
            let taskInput = event.target.parentElement.querySelector("input");
            if(taskInput.disabled){
                taskInput.disabled = false
                taskInput.focus();
                event.target.textContent = "✔️";
            }
            else{
                taskInput.disabled = true;
                event.target.textContent = "✏️";
            }
            saveTasks();
        }

        // TASK COMPLETE
        let bullet = event.target.closest(".bullet");
        if(bullet){
            let taskInput = bullet.nextElementSibling; //i/p field next to the bullet

            // Toggle b/w completed and not completed
            if(!bullet.classList.contains("completed")){
                bullet.classList.add("completed");
                bullet.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.285 6.725a1 1 0 0 0-1.57-1.25l-9.042 11.362-4.161-4.01a1 1 0 1 0-1.394 1.436l5.126 4.939a1 1 0 0 0 1.479-.082l9.562-12.395z" **fill="white" stroke="white" stroke-width="2"**/>
</svg>
`;

                taskInput.style.textDecoration = "line-through";
                taskInput.style.color = "gray"; // fades text
            }
            else{
                bullet.classList.remove("completed");
                bullet.innerHTML = "";
                taskInput.style.textDecoration = "none";
                taskInput.style.color = "black"
            }
            saveTasks();

        }
    });

});
