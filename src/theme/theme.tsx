import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#fbd24d",
      },
      p: {
        fontSize: { base: "md", md: "lg" },
        lineHeight: "tall",
      },
    },
  },
});

export default theme;
