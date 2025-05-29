import style from "./links.module.scss";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { Menu } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const Links = ({ links }) => {
	const { xlDevice, lgDevice } = useBreakpoints();
	const router = useRouter();

	const commonAttributes = {
		className: clsx(xlDevice ? style.link : style.mobile_link, "scale-effect"),
	};

	return (
		links && (
			<nav className={style.navbar}>
				<ul className={style.nav_links}>
					{links.map((link, index) => {
						const icon = (
							<>
								<Image
									src={link.icon}
									height={20}
									width={20}
									alt={link.title}
								/>
								{!xlDevice && <span className={style.title}>{link.title}</span>}
							</>
						);

						return (
							<li key={index}>
								{link.type === "button" ? (
									<button
										{...commonAttributes}
										onClick={link.onClick}
										name={link.title}
										type="button"
									>
										{icon}
									</button>
								) : (
									<Link
										{...commonAttributes}
										href={link.url}
										title={link.title}
									>
										{icon}
									</Link>
								)}
							</li>
						);
					})}
					<li>
						<Menu
							width={220}
							arrowOffset={50}
							arrowSize={10}
							withArrow
							position="bottom"
						>
							<Menu.Target>
								<button {...commonAttributes} type="button">
									<Image
										src={"/images/icons/history.svg"}
										height={20}
										width={20}
										alt={"All history"}
									/>
									{!xlDevice && (
										<span className={style.title}>All history</span>
									)}
								</button>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item
									leftSection={
										<Icon
											icon="fluent:money-16-regular"
											width="24"
											height="24"
										/>
									}
									onClick={() => router.push("/transaction-problem")}
								>
									Transaction History
								</Menu.Item>
								<Menu.Item
									leftSection={
										<Icon
											icon="ion:game-controller-outline"
											width="24"
											height="24"
										/>
									}
									onClick={() => router.push("/game-problem")}
								>
									Game History
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</li>
				</ul>
			</nav>
		)
	);
};

export default Links;
