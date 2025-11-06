export const askQuestion = async (question) => {
  const res = await fetch("http://localhost:4002/api/chatbot/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  return res.json();
};
