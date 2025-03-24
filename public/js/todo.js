function toggleTaskMenu(taskId) {
    const menu = document.getElementById(`task-menu-${taskId}`);
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        // Hide other menus before showing this one
        document.querySelectorAll(".task-menu").forEach(menu => menu.style.display = "none");
        menu.style.display = "block";
    }
}

// Update Task Status
async function updateTaskStatus(taskId, status) {
    try {
        const response = await fetch(`/todo/update/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        if (response.ok) {
            window.location.reload(); // Refresh page to reflect changes
        } else {
            alert("Error updating task!");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Delete Task
async function deleteTask(taskId) {
    try {
        const response = await fetch(`/todo/delete/${taskId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            window.location.reload();
        } else {
            alert("Error deleting task!");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
