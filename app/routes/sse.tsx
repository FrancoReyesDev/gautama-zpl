import { useEffect, useState } from "react";

export default function Sse() {
  const [messages, setMessages] = useState<string[]>([]);
  async function sendMessage(message: any) {
    await fetch("/api/post-messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
  }

  useEffect(() => {
    const eventSource = new EventSource("/api/sse");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Nuevo mensaje recibido:", data.message);
      setMessages((current) => [...current, String(data.message)]);
    };
  }, []);

  return (
    <div>
      <p>{messages.join(", ")}</p>
      <button
        onClick={() => {
          sendMessage("hola");
        }}
      >
        enviar mensaje
      </button>
    </div>
  );
}
