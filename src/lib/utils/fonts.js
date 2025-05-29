import localFont from "next/font/local";

export const helveticaNeue = localFont({
     src: [
          {
               path: "../../../public/fonts/helvetica-neue/HelveticaNeueUltraLight.woff",
               style: "normal",
               weight: "100",
          },
            {
                 path: "../../../public/fonts/helvetica-neue/HelveticaNeueThin.woff",
                 style: "normal",
                 weight: "200",
            },
            {
                 path: "../../../public/fonts/helvetica-neue/HelveticaNeueLight.woff",
                 style: "normal",
                 weight: "300",
            },
            {
                 path: "../../../public/fonts/helvetica-neue/HelveticaNeueRoman.woff",
                 style: "normal",
                 weight: "400",
            },
            {
                 path: "../../../public/fonts/helvetica-neue/HelveticaNeueMedium.woff",
                 style: "normal",
                 weight: "500",
            },
            {
                 path: "../../../public/fonts/helvetica-neue/HelveticaNeueBold.woff",
                 style: "normal",
                 weight: "700",
            },
            {
                 path: "../../../public/fonts/helvetica-neue/HelveticaNeueHeavy.woff",
                 style: "normal",
                 weight: "800",
            },
            {
                 path: "../../../public/fonts/helvetica-neue/HelveticaNeueBlack.woff",
                 style: "normal",
                 weight: "900",
            },
     ],
     subsets: ["latin"],
     display: "swap",
     fallback: ["sans-serif"],
     variable: "--helvetica-neue-font",
});
