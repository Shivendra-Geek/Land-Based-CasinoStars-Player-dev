import { Modal, ScrollArea } from "@mantine/core";
import ModalClose from "@/components/common/modal/modal-close";
import clsx from "clsx";

const ThemeModal = ({
     children,
     opened,
     onClose,
     modalCloseButton = true,
     onModalClose,
     modalMaxWidth = "500px",
     contentClassName,
     className,
}) => {
     return (
          children && (
               <Modal
                    styles={{
                         content: {
                              maxWidth: modalMaxWidth,
                              width: "100%",
                         },
                    }}
                    opened={opened}
                    onClose={onClose}
                    className={clsx("theme_modal", className)}
                    classNames={{
                         content: contentClassName,
                    }}
                    withCloseButton={false}
                    size={"auto"}
                    //  scrollAreaComponent={ScrollArea.Autosize}
                    //  offsetscrollbars={"true"}
                    centered>
                    {modalCloseButton && <ModalClose onModalClose={onModalClose} />}
                    {children}
               </Modal>
          )
     );
};

export default ThemeModal;
