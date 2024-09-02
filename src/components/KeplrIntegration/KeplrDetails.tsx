import React from "react";

export interface KeplrDetailsProps {
  nobleAddress: string | null;
  usdcBalance: string;
  error: string | null;
}

const KeplrDetails: React.FC<KeplrDetailsProps> = ({
  nobleAddress,
  usdcBalance,
  error,
}) => {
  // Fallback para la dirección
  const addressDisplay = nobleAddress || "Address not connected";

  // Mostrar el balance solo si hay una dirección válida
  const balanceDisplay = nobleAddress 
    ? error 
      ? error 
      : `${usdcBalance} USDC`
    : "Balance not available";

  return (
    <div className="border p-4 rounded-md mb-6">
      <p className="font-mono text-sm break-all">Address: {addressDisplay}</p>
      <p className="font-mono text-sm">Balance: {balanceDisplay}</p>
    </div>
  );
};

export default KeplrDetails;
