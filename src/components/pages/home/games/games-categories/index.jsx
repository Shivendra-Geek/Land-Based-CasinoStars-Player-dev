"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./games-categories.module.scss";
import { sliderSettings } from "@/lib/utils/slider-setting";
import { Autoplay } from "swiper/modules";
import { useEffect, useState, useRef, useCallback } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useElementSize } from "@mantine/hooks";
import Image from "next/image";
import clsx from "clsx";
import GameSearch from "@/components/common/game-search";
import { spotlight } from "@mantine/spotlight";
import { Tooltip } from "@mantine/core";
import SliderBtns from "@/components/common/slider-btns";
import axios from "axios";
import { genresDataImg } from "@/lib/utils/genres-data-image";
import { useSelector } from "react-redux";

export const ElementBox = ({
	image = "/image",
	title = "Add new",
	className,
	onClick,
}) => {
	function addSpacesBeforeUppercase(str) {
		return str.replace(/([A-Z])/g, " $1").trim();
	}
	return (
		(title || image) && (
			<button
				type="button"
				className={clsx(style.element_box, className)}
				onClick={onClick}
			>
				<Image
					src={image}
					width={60}
					height={60}
					alt={title}
					className={style.element_img}
				/>
				<h6 className={style.element_title}>
					{addSpacesBeforeUppercase(title)}
				</h6>
			</button>
		)
	);
};

const GamesCategories = ({ setSelectedGameType, gameTypeData }) => {
	const { ref, width } = useElementSize();
	const swiperRef = useRef(null);
	const [allGameError, setAllGameError] = useState();
	const [searchedGames, setSearchedGames] = useState([]);
	const [loading, setLoading] = useState(false);
	const [debouncedValue, setValue] = useDebounceValue("", 750);
	const [query, setQuery] = useState("");
	const [slideWidth, setSlideWidth] = useState(0);
	const { remoteId } = useSelector((state) => state.session);

	useEffect(() => {
		const measureSlideWidth = () => {
			if (swiperRef.current && swiperRef.current.swiper) {
				const slideEl = swiperRef.current.swiper.slides[0];
				if (slideEl) {
					setSlideWidth(slideEl.offsetWidth);
				}
			}
		};

		const timer = setTimeout(() => {
			measureSlideWidth();

			if (slideWidth === 0) {
				setTimeout(measureSlideWidth, 500);
			}
		}, 100);

		window.addEventListener("resize", measureSlideWidth);

		return () => {
			clearTimeout(timer);
			window.removeEventListener("resize", measureSlideWidth);
		};
	}, [swiperRef.current, slideWidth]);

	const handleSearch = useCallback(
		async (value) => {
			if (value) {
				setLoading(true);
				setSearchedGames([]);
				try {
					let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/games/admin/getAllCombineAPI?action=available_games&token=${process.env.NEXT_PUBLIC_TOKEN}&casino=${
						process.env.NEXT_PUBLIC_CASINO
					}&page=1&limit=100&&gameSearch=${value}&isGlobal=true&provider=${/*providerId ? providerId : */ ""}&gameType=all`;
					if (remoteId) {
						url += `&remoteId=${remoteId}`;
					}
					const response = await axios.get(url);
					if (response.data?.status === 200) {
						setSearchedGames(response.data?.data?.currentGame || []);
					} else {
						setSearchedGames([]);
					}
				} catch (error) {
					setSearchedGames([]);
				}
				setLoading(false);
			}
		},
		[remoteId],
	);

	useEffect(() => {
		if (query) {
			handleSearch(debouncedValue);
		} else {
			setSearchedGames([]);
		}
	}, [debouncedValue, handleSearch]);

	const handleChange = useCallback(
		(event) => {
			setLoading(true);
			setQuery(event.target.value);
			setValue(event.target.value);
		},
		[setValue],
	);

	const searchWidth = slideWidth || width;

	if (gameTypeData.length === 0) return null;

	return (
		<div className={clsx(style.games_categories, "games_categories_slider")}>
			<SliderBtns ref={swiperRef} arrowWide={"-40px"}>
				<div className={style.slider}>
					<Swiper
						ref={swiperRef}
						breakpoints={{
							1600: {
								slidesPerView: 7,
							},
							1360: {
								slidesPerView: 6,
							},
							1200: {
								slidesPerView: 5,
							},
							768: {
								slidesPerView: 4,
							},
							575: {
								slidesPerView: 3,
							},
							320: {
								slidesPerView: 2,
							},
						}}
						spaceBetween={0}
						{...sliderSettings}
						modules={[Autoplay]}
						onInit={() => {
							if (swiperRef.current && swiperRef.current.swiper) {
								const slideEl = swiperRef.current.swiper.slides[0];
								if (slideEl) {
									setSlideWidth(slideEl.offsetWidth);
								}
							}
						}}
					>
						{gameTypeData?.map((v, i) => {
							const img = genresDataImg?.find((e) => e.name === v?.name)?.img;

							return (
								<SwiperSlide
									key={i}
									onClick={() => setSelectedGameType(v?.name)}
									ref={i === 0 ? ref : null}
								>
									<ElementBox
										image={img}
										title={v.name}
										className="swiper-box"
										error={allGameError}
									/>
								</SwiperSlide>
							);
						})}
					</Swiper>
					<div
						className={style.search}
						style={{ width: searchWidth > 0 ? searchWidth - 1 : "auto" }}
					>
						<Tooltip
							label={"Ctrl+K / Cmd+K to search."}
							arrowOffset={50}
							arrowSize={10}
							withArrow
							position="bottom"
						>
							<ElementBox
								image="/images/search.svg"
								title={"Search"}
								onClick={spotlight.open}
							/>
						</Tooltip>
						<GameSearch
							searchedGames={searchedGames}
							query={query}
							handleChange={handleChange}
							loading={loading}
						/>
					</div>
				</div>
			</SliderBtns>
		</div>
	);
};

export default GamesCategories;
