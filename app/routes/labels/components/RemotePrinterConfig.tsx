import { ChangeEvent } from "react";
import { usePrinterContext } from "~/contexts/PrinterContext";

export default function RemotePrinterConfig() {
  const { remotePrinterConfig, setRemotePrinterConfig } = usePrinterContext();

  function handleChangeIP(event: ChangeEvent<HTMLInputElement>) {
    setRemotePrinterConfig((current) => ({
      ...current,
      host: event.target.value,
    }));
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">IP Servidor Remoto</span>
        </div>
        <input
          type="text"
          className="input input-bordered"
          placeholder="ej: 192.168.1.10:3000"
          value={remotePrinterConfig.host}
          onChange={handleChangeIP}
        />
      </label>
    </div>
  );
}
