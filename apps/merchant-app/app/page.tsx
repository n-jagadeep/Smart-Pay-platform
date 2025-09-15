"use client";

import { useBalance } from "@repo/store/balance";

export default function Page(): JSX.Element {
  const balance = useBalance();
  return <div>hi there {balance}</div>;
}
