import { getPrinters } from "@/utils/getPrinters";
import { Home } from "@/components/Home/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZPL printer",
  description: "Genera etiquetas con ZPL",
};

const App = async () => {
  const printers = await getPrinters();
  return <Home printers={printers} />;
};
export default App;
