"use client";

import { useBreakpoints } from "@/hooks/useBreakpoints";
import { Icon } from "@iconify/react";
import { Menu, Tooltip } from "@mantine/core";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const UserProfile = () => {
	const { username } = useSelector((state) => state.session);
	const { xsDevice } = useBreakpoints();
	const usernameLength = username?.trim().length;
	const usernameMaxLength = xsDevice ? 14 : 6;
	const router = useRouter();

	const handleLogout = () => {
		Cookies.remove("player_session");
		router.push("/login");
	};
	const userProfile = (
		<button className="header_btn scale-effect" type="button">
			<div className="btn_avatar">V</div>
			<div className="btn_content">
				<span className="btn_label">Welcome</span>
				<span className="btn_text">
					{usernameLength > usernameMaxLength
						? `${username?.slice(0, usernameMaxLength)}...`
						: username}
					<Icon
						icon="mingcute:down-fill"
						width="18"
						height="18"
						className="btn_dropdown_icon"
					/>
				</span>
			</div>
		</button>
	);

	return (
		<>
			<Menu
				width={200}
				arrowOffset={50}
				arrowSize={10}
				withArrow
				position="bottom"
			>
				<Menu.Target>
					{usernameLength > usernameMaxLength ? (
						<Tooltip
							label={username}
							arrowOffset={50}
							arrowSize={10}
							withArrow
							position="right"
						>
							{userProfile}
						</Tooltip>
					) : (
						userProfile
					)}
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item
						onClick={handleLogout}
						leftSection={<Icon icon="ic:round-logout" width="20" height="20" />}
					>
						Logout
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</>
	);
};

export default UserProfile;
