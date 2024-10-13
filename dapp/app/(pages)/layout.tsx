import { PropsWithChildren } from "react";
import DeformCanvas from "../components/ui/HoverCanvas";

export default function MainLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div>
      <div className="background" />
      <DeformCanvas />
      {children}
    </div>
  );
}
