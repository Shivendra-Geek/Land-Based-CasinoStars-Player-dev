import { Tooltip } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const ActionBtn = ({ icon, title = "", href = "#", onClick }) => {
    return (
        <Tooltip label={title} arrowOffset={50} arrowSize={10} arrowRadius={2} withArrow position="top">
            <Link style={{ display: "inline-block", lineHeight: 1 }} href={href} title={title} onClick={onClick}>
                <Image src={icon} height={26} width={26} alt={title} />
            </Link>
        </Tooltip>
    );
};

export default ActionBtn;
