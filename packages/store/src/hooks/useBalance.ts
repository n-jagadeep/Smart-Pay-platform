import { useRecoilValue } from "recoil";
import { balanceAtom } from "../atoms/balance";

export const useBalance = (): number => {
  const value = useRecoilValue(balanceAtom);
  return value;
};
