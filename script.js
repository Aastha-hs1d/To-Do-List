document.addEventListener("DOMContentLoaded", function(){
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
        }

        // TASK COMPLETE
        let bullet = event.target.closest(".bullet");
        if(bullet){
            let taskInput = event.target.nextElementSibling; //i/p field next to the bullet

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

        }
    });

});
