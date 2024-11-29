import { subscribers } from "../api.post-messages/route";

// app/routes/api/sse.ts
export function loader() {
  return new Response(
    new ReadableStream({
      start(controller) {
        const notify = (data: any) => {
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
        };

        // Agregar este cliente a los suscriptores
        subscribers.push(notify);

        // Limpiar al desconectarse
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }
  );
}
