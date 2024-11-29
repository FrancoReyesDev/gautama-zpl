// app/routes/api/post-message.ts
import { ActionFunctionArgs, json } from "@remix-run/node";

export let subscribers: Function[] = []; // Guardar funciones de notificación (clientes SSE)

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.json();

  // Notifica a todos los clientes SSE conectados
  subscribers.forEach((notify) => notify(body));

  return json({ success: true });
}
