"use client";
import { useState, useEffect } from "react";
import { useWindowScroll } from "@mantine/hooks";

import Logo from "@/components/common/logo";
import style from "./header.module.scss";
import Links from "./links";
import SocialLinks from "./social-links";
import UserBalance from "./user-balance/user-balance";
import UserProfile from "./user-profile";
import LanguageOption from "./language-option";
import DateTime from "./date-time/date-time";
import { headerPageLinks } from "@/lib/utils/header";
import clsx from "clsx";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import LiveChat from "./live-chat";
import Support from "./support";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalanceApi } from "@/lib/features/balance/balanceSlice";
import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";

const Header = () => {
	const { vvlDevice, lgDevice, xlDevice } = useBreakpoints();
	const [scroll, scrollTo] = useWindowScroll();
	// const [isScrollingDown, setIsScrollingDown] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);

	const dispatch = useDispatch();
	const { remoteId } = useSelector((state) => state.session);

	useEffect(() => {
		if (!remoteId) return;
		dispatch(fetchBalanceApi(remoteId));
	}, [remoteId]);

	// useEffect(() => {
	//     const updateScrollDirection = () => {
	//         if (scroll.y < lastScrollY) {
	//             setIsScrollingDown(false);
	//         } else if (scroll.y > lastScrollY) {
	//             setIsScrollingDown(true);
	//         }
	//         setLastScrollY(scroll.y);
	//     };

	//     updateScrollDirection();
	// }, [scroll.y, lastScrollY]);

	return (
		// <header className={clsx(style.header, isScrollingDown && style.hidden)}>
		<header className={clsx(style.header)}>
			{!vvlDevice && (
				<div className={style.header_top}>
					<DateTime />
				</div>
			)}

			<div className={style.header_center}>
				<div className={style.left_content}>
					<Logo />
					{xlDevice && <Links links={headerPageLinks} />}
					{/* {lgDevice && <Support />} */}
					{/* {lgDevice && <LiveChat />} */}
				</div>
				<div className={style.right_content}>
					{/* {!lgDevice && <Support />} */}
					{/* {!lgDevice && <LiveChat />} */}
					{remoteId && (
						<>
							{lgDevice && <UserBalance />}
							{lgDevice && <UserProfile />}
						</>
					)}
					{/* // : (
					// 	<Button
					// 		className="theme_btn dark_blue_btn"
					// 		type="submit"
					// 		onClick={() => router.push("/login")}
					// 		title="Login"
					// 	>
					// 		Login
					// 	</Button>
					// )} */}
					{/* {!lgDevice && <SocialLinks links={headerSocialLinks} />} */}

					<LanguageOption />
					{vvlDevice && (
						<>
							<span className={style.divider} />
							<DateTime />
						</>
					)}
				</div>
			</div>

			{!lgDevice && remoteId && (
				<div className={style.header_bottom}>
					{!lgDevice && <UserBalance />}
					{!lgDevice && <UserProfile />}
				</div>
			)}
		</header>
	);
};

export default Header;
