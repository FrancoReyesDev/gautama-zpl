import { ActionFunctionArgs } from "@remix-run/node";
import { LabelType } from "../labels/types/Label.type";
import { json } from "@remix-run/react";

export const subscribers: { [id: string]: (data: LabelType) => void } = {};

export async function action({ request }: ActionFunctionArgs) {
  const body = (await request.json()) as LabelType;

  Object.values(subscribers).forEach((notify) => notify(body));

  return json({ success: true });
}

export function loader() {
  return new Response(
    new ReadableStream({
      start(controller) {
        const notify = (data: LabelType) => {
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
        };

        const notifierId = "printer-messages";

        subscribers[notifierId] = notify;

        return () => {
          delete subscribers[notifierId];
        };
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
