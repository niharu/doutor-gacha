import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#fbd24d",
        // backgroundColor: "yello",
        // color: "gray.800",
      },
      p: {
        fontSize: { base: "md", md: "lg" },
        lineHeight: "tall",
      },
    },
  },
  fonts: {
    // body: `"メイリオ"`,
    // heading: `cursive,"Hiragino Kaku Gothic ProN"`,
    // body: `cursive,"Hiragino Kaku Gothic ProN"`,
  },
});

export default theme;
