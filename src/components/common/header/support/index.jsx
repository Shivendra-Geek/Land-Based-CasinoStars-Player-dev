"use client";
import clsx from "clsx";
import style from "./support.module.scss";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import Image from "next/image";
import { useState } from "react";
import ThemeModal from "@/components/common/modal/theme-modal";
import SupportContent from "./support-content";

const Support = () => {
     const { xsDevice } = useBreakpoints();
     const [isModalOpen, setModalOpen] = useState(false);

     const buttonSetting = {
          onClick: () => setModalOpen(true),
     };
     return (
          <>
               {xsDevice ? (
                    <button
                         {...buttonSetting}
                         className={clsx(style.support_btn, "theme_btn gradient_bg scale-effect")}>
                         <span>Support</span>
                    </button>
               ) : (
                    <button {...buttonSetting} className={style.support_btn}>
                         <Image src='/images/icons/support.svg' height={26} width={26} alt='Live chat icon' />
                    </button>
               )}

               <ThemeModal
                    opened={isModalOpen}
                    onModalClose={() => setModalOpen(false)}
                    onClose={() => setModalOpen(false)}
                    modalMaxWidth='fit-content'>
                    <SupportContent />
               </ThemeModal>
          </>
     );
};

export default Support;
