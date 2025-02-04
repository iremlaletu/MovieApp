import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return <section className="p-1 flex-1 overflow-auto">{children}</section>;
}
