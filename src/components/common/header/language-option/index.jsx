"use client";
import { Icon } from "@iconify/react";
import { Menu } from "@mantine/core";
import style from "./language-option.module.scss";
import clsx from "clsx";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { languageData } from "@/lib/utils/languageData";
import { useEffect, useState } from "react";
import { getDictionary } from "@/app/dictionaries";
import { setLanguageData } from "@/lib/features/language/languageSlice";
import { useDispatch } from "react-redux";

function detectLocale() {
	const cookie = document.cookie;
	const lang = navigator.language || "en";
	const match = cookie.match(/(?:^|;\s*)locale=([^;]+)/);

	if (match) {
		return match[1];
	}
	return lang.slice(0, 2);
}
const LanguageOption = () => {
	const { smDevice } = useBreakpoints();
	const [locale, setLocale] = useState("en");
	const dispatch = useDispatch();

	useEffect(() => {
		const detected = detectLocale();
		setLocale(detected);
		loadTranslations(detected);
	}, [locale]);

	const loadTranslations = async (lang) => {
		const data = await getDictionary(lang, false);
		dispatch(setLanguageData(data));
	};

	const handleLanguageChange = (lang) => {
		setLocale(lang);
		document.cookie = `locale=${lang}; path=/; max-age=31536000`;
	};

	const localeObj = languageData.find((item) => item.locale === locale);

	return (
		<>
			<Menu
				width={150}
				arrowOffset={50}
				arrowSize={10}
				withArrow
				position="bottom"
				className={style.language_option}
			>
				<Menu.Target>
					<button
						className="header_btn language_btn scale-effect"
						type="button"
					>
						<div className="btn_avatar">
							{/* <Image src="/images/flags/usa.svg" alt="USA" width={40} height={40} /> */}
							<Icon
								icon={`${localeObj?.flag}-1x1`}
								width="40"
								height="40"
								className={clsx("btn_dropdown_icon")}
							/>
						</div>
						<div className="btn_content">
							<span className={clsx("btn_text", style.btn_text)}>
								{smDevice && locale.toUpperCase()}
								<Icon
									icon="mingcute:down-fill"
									width="18"
									height="18"
									className={clsx("btn_dropdown_icon")}
								/>
							</span>
						</div>
					</button>
				</Menu.Target>
				<Menu.Dropdown>
					{languageData?.map((item, index) => (
						<Menu.Item
							leftSection={
								<Icon icon={`${item?.flag}-4x3`} width="24" height="24" />
							}
							onClick={() => handleLanguageChange(item.locale)}
							key={index}
						>
							{item.language}
						</Menu.Item>
					))}
				</Menu.Dropdown>
			</Menu>
		</>
	);
};

export default LanguageOption;
