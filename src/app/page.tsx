// import { getPrinters } from "@/utils/getPrinters";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZPL printer",
  description: "Genera etiquetas con ZPL",
};

const Home = async () => {
  // const printers = await getPrinters();
  return <Home />;
  // return <HomePage printers={printers}/>
};
export default Home;
