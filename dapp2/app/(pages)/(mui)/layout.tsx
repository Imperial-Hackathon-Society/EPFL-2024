import ThemeRegistry from "@/app/components/ThemeRegistry";
import { GlobalStyles } from "@mui/joy";
import { PropsWithChildren } from "react";

export default function MuiLayout({ children }: PropsWithChildren<{}>) {
  return (
    <ThemeRegistry options={{ key: "joy" }}>
      <GlobalStyles
        styles={{
          "& .lucide": {
            color: "var(--Icon-color)",
            margin: "var(--Icon-margin)",
            fontSize: "var(--Icon-fontSize, 20px)",
            width: "1em",
            height: "1em",
          },
        }}
      />
      {children}
    </ThemeRegistry>
  );
}
