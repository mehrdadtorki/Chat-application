export async function POST(req) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const userMessage = messages[messages.length - 1]?.content || "Hello!";

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `User: ${userMessage}\nAssistant:`,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
          },
        }),
      }
    );

    const textResponse = await response.json();
    console.log("🟢 Full API Response:", textResponse);

    if (!response.ok || !textResponse || !textResponse[0]?.generated_text) {
      return Response.json({ error: "AI model error" }, { status: 500 });
    }

    // ✅ Extract only the AI's latest response (remove "You are a helpful AI assistant...")
    let aiResponse = textResponse[0].generated_text;
    aiResponse = aiResponse.split("Assistant:").pop().trim(); // Get only the assistant's response

    return Response.json({
      messages: [{ role: "assistant", content: aiResponse }],
    });
  } catch (error) {
    console.error("🔴 Server Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
