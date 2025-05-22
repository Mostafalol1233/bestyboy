import { useContext } from "react";
import { VoucherContext } from "@/contexts/VoucherContext";

// This hook is now just a wrapper around the VoucherContext
// It exists for backward compatibility with components that expect this hook
export const useVouchers = (gameType: string) => {
  const context = useContext(VoucherContext);
  
  if (!context) {
    throw new Error('useVouchers must be used within a VoucherProvider');
  }
  
  return {
    vouchers: context.getVouchersByGameType(gameType),
    isLoading: false,
    isError: false,
    refetch: () => {} // Empty function as we no longer need to fetch data
  };
};
