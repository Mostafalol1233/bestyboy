import { createContext, ReactNode, useReducer, useCallback } from "react";
import { Voucher } from "@shared/schema";

interface VoucherState {
  vouchers: Record<string, Voucher[]>;
  isLoading: boolean;
  error: string | null;
}

type VoucherAction = 
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: { gameType: string; vouchers: Voucher[] } }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "UPDATE_VOUCHER"; payload: { gameType: string; voucher: Voucher } }
  | { type: "ADD_VOUCHER"; payload: { gameType: string; voucher: Voucher } }
  | { type: "DELETE_VOUCHER"; payload: { gameType: string; id: number } };

interface VoucherContextValue extends VoucherState {
  updateVoucher: (gameType: string, voucher: Voucher) => void;
  addVoucher: (gameType: string, voucher: Voucher) => void;
  deleteVoucher: (gameType: string, id: number) => void;
  setVouchers: (gameType: string, vouchers: Voucher[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialState: VoucherState = {
  vouchers: {
    crossfire: [],
    pubg: [],
    freefire: [],
  },
  isLoading: false,
  error: null,
};

export const VoucherContext = createContext<VoucherContextValue>({
  ...initialState,
  updateVoucher: () => {},
  addVoucher: () => {},
  deleteVoucher: () => {},
  setVouchers: () => {},
  setLoading: () => {},
  setError: () => {},
});

const voucherReducer = (state: VoucherState, action: VoucherAction): VoucherState => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
      
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        vouchers: {
          ...state.vouchers,
          [action.payload.gameType]: action.payload.vouchers,
        },
      };
      
    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      
    case "UPDATE_VOUCHER":
      return {
        ...state,
        vouchers: {
          ...state.vouchers,
          [action.payload.gameType]: state.vouchers[action.payload.gameType]?.map(v => 
            v.id === action.payload.voucher.id ? action.payload.voucher : v
          ) || [],
        },
      };
      
    case "ADD_VOUCHER":
      return {
        ...state,
        vouchers: {
          ...state.vouchers,
          [action.payload.gameType]: [
            ...(state.vouchers[action.payload.gameType] || []),
            action.payload.voucher,
          ],
        },
      };
      
    case "DELETE_VOUCHER":
      return {
        ...state,
        vouchers: {
          ...state.vouchers,
          [action.payload.gameType]: state.vouchers[action.payload.gameType]?.filter(
            v => v.id !== action.payload.id
          ) || [],
        },
      };
      
    default:
      return state;
  }
};

export const VoucherProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(voucherReducer, initialState);

  const updateVoucher = useCallback((gameType: string, voucher: Voucher) => {
    dispatch({ type: "UPDATE_VOUCHER", payload: { gameType, voucher } });
  }, []);

  const addVoucher = useCallback((gameType: string, voucher: Voucher) => {
    dispatch({ type: "ADD_VOUCHER", payload: { gameType, voucher } });
  }, []);

  const deleteVoucher = useCallback((gameType: string, id: number) => {
    dispatch({ type: "DELETE_VOUCHER", payload: { gameType, id } });
  }, []);

  const setVouchers = useCallback((gameType: string, vouchers: Voucher[]) => {
    dispatch({ type: "FETCH_SUCCESS", payload: { gameType, vouchers } });
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    if (isLoading) {
      dispatch({ type: "FETCH_START" });
    }
  }, []);

  const setError = useCallback((error: string | null) => {
    if (error) {
      dispatch({ type: "FETCH_ERROR", payload: error });
    }
  }, []);

  return (
    <VoucherContext.Provider
      value={{
        ...state,
        updateVoucher,
        addVoucher,
        deleteVoucher,
        setVouchers,
        setLoading,
        setError,
      }}
    >
      {children}
    </VoucherContext.Provider>
  );
};
