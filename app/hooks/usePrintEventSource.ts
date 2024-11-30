import { useEffect, useState } from "react";
import { LabelType } from "~/routes/labels/types/Label.type";

interface Props {
  eventSourceUrl: string;
}

export default function usePrintEventSource({ eventSourceUrl }: Props) {
  const [labels, setLabels] = useState<LabelType[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(eventSourceUrl);

    eventSource.onmessage = (event) => {
      const label: LabelType = JSON.parse(event.data);
      setLabels((currentLabels) => [...currentLabels, label]);
    };

    return () => {
      eventSource.close();
    };
  });

  return { labels };
}
