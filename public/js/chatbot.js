document.addEventListener("DOMContentLoaded", function () {
    const chatbotBtn = document.querySelector(".chatbot");
    const chatbotDiv = document.querySelector(".chatbot-div");
    const closeChatbot = document.querySelector(".close-chatbot");
    const chatbotMessages = document.querySelector(".chatbot-messages");
    const chatbotForm = document.querySelector(".chatbot-form");
    const chatbotInput = document.querySelector("#chatbot-input");

    chatbotBtn.addEventListener("click", () => chatbotDiv.classList.toggle("hidden"));
    closeChatbot.addEventListener("click", () => chatbotDiv.classList.add("hidden"));

    function appendMessage(sender, message) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("chatbot-msg", sender);
        
        // Convert newlines into <br> for better formatting
        msgDiv.innerHTML = message.replace(/\n/g, "<br>");
    
        chatbotMessages.appendChild(msgDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;  // Auto-scroll to latest message
    }
    

    chatbotForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const userMessage = chatbotInput.value.trim();
        if (!userMessage) return;

        appendMessage("user", userMessage);
        chatbotInput.value = "";

        try {
            const response = await fetch("/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })  // ✅ Correct request format
            });

            const data = await response.json();
            appendMessage("bot", data.reply);
        } catch (error) {
            console.error("Chatbot Error:", error);
            appendMessage("bot", "❌ Error: Unable to fetch response.");
        }
    });
});

