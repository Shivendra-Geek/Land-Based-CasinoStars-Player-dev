"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Spotlight } from "@mantine/spotlight";
import { Badge, Center, Group, Text } from "@mantine/core";
import { Icon } from "@iconify/react";
import Image from "next/image";
import style from "./game-search.module.scss";
import { providerIds } from "@/lib/utils/provider-id-data";
import axios from "axios";
import { generateUrlSearchParams } from "@/lib/utils/generate-url-params";
import { useSelector } from "react-redux";
import GameModal from "../game-modal";
import { useDisclosure } from "@mantine/hooks";

const GameSearch = ({
	searchedGames,
	query,
	setQuery,
	handleChange,
	loading,
}) => {
	const [gameUrl, setGameUrl] = useState("");
	const { languageData } = useSelector((state) => state.language);
	const { remoteId , userId} = useSelector((state) => state.session);
	const [opened, { open, close }] = useDisclosure(false);
	const [selectGameData, setSelectedGameData] = useState({})
	const [error, setError] = useState({ message: '', variant: '' });
    const [isLoading, setIsLoading] = useState(false);

	const getGameUrl = async (data, currency) => {
		let isAdditionalParams = true;
		let gameUrl = "";
		let gamePlayUrl = "";
		setIsLoading(true)
		const gameId =
			Number.parseInt(data.providerId) === 1 ? data?.providerGameId : data?.id;
		const baseUrl = data?.serverUrl;

		//    if (mode === 'offline') {
		//        setLoading({ [id]: true });
		//    } else {
		//        setLoadingMoney({ [id]: true });
		//    }
		// Common query params
		const params = generateUrlSearchParams({
			action: "gameLoad",
			token: process.env.NEXT_PUBLIC_TOKEN,
			casino: process.env.NEXT_PUBLIC_CASINO,
			game_id: gameId,
			currency: currency,
			language: "en",
			mode: "online",
			redirectUrl: window?.location?.href,
			depositUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/my-account/deposit`,
			remote_id: userId,
		});

		try {
			if (providerIds?.includes(Number(data?.providerId))) {
				const url = `${baseUrl}?${params}`;
				const response = await axios.get(url);
				if (response?.data?.isSetAdditionalParams === false) {
					isAdditionalParams = response?.data?.isSetAdditionalParams;
				}

				if (response.data?.status === 200) {
					gameUrl = response.data?.result;
					if (response.data?.resultScript) {
						gameUrl = response.data?.resultScript;
						//     renderScript(gameUrl, screen);
					} else if (!gameUrl) {
						//     settingErrorMessage('Missing game launch URL');
						setError({ message: 'Missing game launch URL', variant: 'danger' });
					}
					// setTimeout(() => {
					//     updateBalanceData();
					// }, 10000);
				} else {
					const errorMsg = response.data?.response || response.data?.message;
					// if (settingErrorMessage) settingErrorMessage(errorMsg, id);
					setError({ message: errorMsg, variant: 'danger' });
				}
			} else {
				const url = `${baseUrl}?${params.toString()}`;
				const response = await axios.get(url);
				if (response.data?.status) {
					const token = response.data?.result;
					const serverUrl = response.data?.serverUrl;
					const gameParams = generateUrlSearchParams({
						token: data?.providerSecret,
						casino: data?.partnerClientId,
						language: "en",
						currency: currency,
						session_id: token,
						game_id: data?.providerGameId,
						server: serverUrl,
						remote_id: remoteId,
					});
					gameUrl = `${data?.gameUrl}?${gameParams}`;
					// setTimeout(() => {
					//     updateBalanceData();
					// }, 10000);
				} else {
					const errorMsg = response.data?.response;
					// if (settingErrorMessage) settingErrorMessage(errorMsg, id);
					setError({ message: errorMsg, variant: 'danger' });
				}
			}
		} catch (error) {
			const errorMsg = error.message;
			//   if (settingErrorMessage) settingErrorMessage(errorMsg);
			setError({ message: errorMsg, variant: 'danger' });
		} finally {
			//   setLoading({ [id]: false });
			//   setLoadingMoney({ [id]: false });
			setIsLoading(false)
		}

		if (gameUrl && !gameUrl?.gameScript) {
			const depositParam = !isAdditionalParams
				? ""
				: `deposit=${process.env.NEXT_PUBLIC_SITE_URL}/my-account/deposit/`;
			gamePlayUrl = gameUrl.includes("?")
				? `${gameUrl}&${depositParam}`
				: `${gameUrl}?${depositParam}`;
		}
		if (gameUrl?.gameScript) {
			return gameUrl;
		}
		return gamePlayUrl;
	};

	const playGame = async (data) => {
		//    if (!isLoggedIn && !reduxLoading) {
		//        setModalShow(true);
		//        return;
		//    } else if (data[screen]?.providerName?.toLowerCase() === 'fortune panda' && !playFortunePandaGame) {
		//        setWalletModal(true);
		//        await getGameBalance(data[screen]?.id);
		//        setFortunePandaBalance((prev) => ({ ...prev, ...data[screen] }));
		//        return;
		//    }
		setSelectedGameData(data)
		const url = await getGameUrl(data, "USD");
		setGameUrl(url);
		if (data?.[screen]?.providerId === 333) {
			window.open(url, "_blank");
		}
		
	};

	const filteredGames = useMemo(() => {
		return searchedGames.filter((item) =>
			item.name.toLowerCase().includes(query.toLowerCase().trim()),
		);
	}, [query, searchedGames]);

	const items = filteredGames.map((item) => (
		<Spotlight.Action
			key={item.id}
			onClick={() => {
				playGame(item);
				open();
			}}
		>
			<Group wrap="nowrap" w="100%">
				{item.gameIcon && (
					<Center>
						<Image
							src={item.gameIcon}
							alt={item.name}
							width={80}
							height={50}
							quality={100}
							style={{ objectFit: "cover", borderRadius: "5px" }}
						/>
					</Center>
				)}

				<div style={{ flex: 1 }}>
					<Text fz="base">{item.name}</Text>
					{item.providerName && (
						<Text opacity={0.6} size="xs">
							{item.providerName}
						</Text>
					)}
				</div>
				{item.new && <Badge variant="default">New</Badge>}
			</Group>
		</Spotlight.Action>
	));

	return gameUrl ? (
		<GameModal modalOpened={opened} modalClose={close} gameData={selectGameData} loading={isLoading} error={error}>
			<iframe
				src={gameUrl}
				height={"100%"}
				width={"100%"}
				title="Game Iframe"
			/>
		</GameModal>
	) : (
		<Spotlight.Root
			query={query}
			onQueryChange={setQuery}
			className={style.game_search_box}
		>
			<Spotlight.Search
				className={style.game_search}
				placeholder={`${languageData?.text?.header?.search_placeholder?.value || "Search Games..."}`}
				leftSection={<Icon icon="lucide:search" width="24" height="24" />}
				value={query}
				onChange={handleChange}
			/>
			{query && (
				<Spotlight.ActionsList className={style.game_list}>
					{loading ? (
						<Spotlight.Empty>
							<Text fz="base">Loading, please wait...</Text>
						</Spotlight.Empty>
					) : items.length > 0 ? (
						items
					) : (
						<Spotlight.Empty>
							<Text fz="base">No games match your search criteria</Text>
						</Spotlight.Empty>
					)}
				</Spotlight.ActionsList>
			)}
		</Spotlight.Root>
	);
};

export default GameSearch;
