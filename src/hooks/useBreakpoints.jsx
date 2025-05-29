import { useMediaQuery } from "@mantine/hooks";

export const useBreakpoints = () => {
     const xsDevice = useMediaQuery("(min-width: 480px)");
     const smDevice = useMediaQuery("(min-width: 576px)");
     const mdDevice = useMediaQuery("(min-width: 768px)");
     const lgDevice = useMediaQuery("(min-width: 992px)");
     const xlDevice = useMediaQuery("(min-width: 1200px)");
     const xxlDevice = useMediaQuery("(min-width: 1360px)");
     const xvlDevice = useMediaQuery("(min-width: 1400px)");
     const vvlDevice = useMediaQuery("(min-width: 1600px)");

     return { xsDevice, smDevice, mdDevice, lgDevice, xlDevice, xxlDevice, xvlDevice, vvlDevice };
};
