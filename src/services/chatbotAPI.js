export const askQuestion = async (question) => {
  const res = await fetch(
    "https://novatalk-backend.onrender.com/api/chatbot/ask",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    },
  );
  return res.json();
};
