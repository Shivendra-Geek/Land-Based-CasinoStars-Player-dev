import { useFonts } from "@/hooks/useFont";
import {
	ColorSchemeScript,
	MantineProvider,
	mantineHtmlProps,
} from "@mantine/core";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import clsx from "clsx";
import { themeProvider } from "@/lib/utils/theme";
import Script from "next/script";
import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import "@/styles/variables.scss";
import "@mantine/dates/styles.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "@mantine/notifications/styles.css";
import "@/styles/globals.scss";
import StoreProvider from "./StoreProvider";
import { Notifications } from "@mantine/notifications";
import AuthSession from '@/components/common/auth-session';

export const metadata = {
	title: "Casino Stars - Your Gateway to Ultimate Gaming Thrills",
	description:
		"Experience the ultimate casino excitement with games, rewards, and endless fun!",
};

export default function RootLayout({ children }) {
	const fonts = useFonts();
	
	return (
		<StoreProvider>
            <AuthSession />
			<html lang="en" {...mantineHtmlProps}>
				<head>
					<ColorSchemeScript />
				</head>
				<body className={clsx(fonts)}>
					<MantineProvider
						defaultColorScheme="dark"
						theme={{
							...themeProvider,
						}}
					>
						<LayoutWrapper>{children}</LayoutWrapper>
						<Notifications position="top-right" autoClose={3000} />
					</MantineProvider>

					{/* Talk.to Scripts  */}
					{/* <Script
						type="text/javascript"
						id="tawk-to-script"
						strategy="lazyOnload"
						dangerouslySetInnerHTML={{
							__html: `
                              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                              (function(){
                              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                              s1.async=true;
                              s1.src='https://embed.tawk.to/678dfe5d3a84273260718150/1ii1aj7jf';
                              s1.charset='UTF-8';
                              s1.setAttribute('crossorigin','*');
                              s0.parentNode.insertBefore(s1,s0);
                              })();
            `,
						}}
					/> */}
				</body>
			</html>
		</StoreProvider>
	);
}
