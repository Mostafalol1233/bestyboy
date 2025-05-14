import { useContext, useEffect } from "react";
import { VoucherContext } from "@/contexts/VoucherContext";
import { useQuery } from "@tanstack/react-query";
import { Voucher } from "@shared/schema";

export const useVouchers = (gameType: string) => {
  const { vouchers, setVouchers, setLoading, setError } = useContext(VoucherContext);
  
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<Voucher[]>({
    queryKey: ["/api/vouchers", gameType],
    queryFn: () => fetch(`/api/vouchers?gameType=${gameType}`).then(res => res.json()),
  });

  useEffect(() => {
    if (data) {
      setVouchers(gameType, data);
    }
  }, [data, gameType, setVouchers]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (isError && error) {
      setError(error.toString());
    }
  }, [isError, error, setError]);

  return {
    vouchers: vouchers[gameType] || [],
    isLoading,
    isError,
    refetch
  };
};
