"use client";
import NextTopLoader from "nextjs-toploader";
import style from "./layout-wrapper.module.scss";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import clsx from "clsx";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import MobileBar from "@/components/common/mobile-bar";
import { useState, useEffect } from "react";
import PageLoader from "@/components/common/page-loader/page";
import ScrollToTop from "@/components/common/scroll-to-top";
import { setSession } from "@/lib/features/session/sessionSlice";
import { decryptSession } from "@/lib/utils/session";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";

const LayoutWrapper = ({ children }) => {
	const { xlDevice } = useBreakpoints();
	const [isLoading, setIsLoading] = useState(true);
	const pathname = usePathname();
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

    const session = decryptSession(Cookies.get('player_session'));
    useEffect(() => {
        if (pathname !== '/login' && !session) {
            router.push('/login');
        } else {
            dispatch(setSession(session));
        }
    }, [pathname, dispatch, router]);


	return (
		children && (
			<>
				{isLoading && <PageLoader />}
				<NextTopLoader
					color="#FFE69E"
					initialPosition={0.08}
					crawlSpeed={300}
					height={2}
					crawl={true}
					showSpinner={false}
					easing="ease"
					speed={100}
					shadow="0 0 10px #FFE69E ,0 0 5px #FFE69E"
					zIndex={1600}
					showAtBottom={false}
				/>
				{pathname === "/login" ? (
					children
				) : (
					<div className={clsx(style.layout_wp)}>
						<Header />
						{children}
						<Footer />
						{!xlDevice && <MobileBar />}
						<ScrollToTop />
					</div>
				)}
			</>
		)
	);
};

export default LayoutWrapper;
