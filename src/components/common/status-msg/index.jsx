import React from "react";
import { Alert } from "@mantine/core";
import { Icon } from "@iconify/react";

const variantConfig = {
	danger: {
		color: "red",
		icon: "material-symbols:error",
	},
	info: {
		color: "gray",
		icon: "material-symbols:info",
	},
	success: {
		color: "green",
		icon: "material-symbols:check-circle",
	},
	warning: {
		color: "yellow",
		icon: "material-symbols:warning",
	},
};

const StatusMsg = ({ variant, title, message }) => {
	const { color, icon } = variantConfig[variant] || variantConfig.info;

	return (
		<Alert
			icon={<Icon icon={icon} width={20} />}
			color={color}
			title={title}
			radius="md"
			variant="light"
		>
			{message}
		</Alert>
	);
};

export default StatusMsg;
