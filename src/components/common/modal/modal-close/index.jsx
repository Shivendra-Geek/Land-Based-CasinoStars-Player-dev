import style from "./modal-close.module.scss";
import Image from "next/image";

const ModalClose = ({ onModalClose }) => {
     return (
          <>
               <button onClick={onModalClose} className={style.modal_close}>
                    <Image src='/images/icons/modal-close.svg' height={40} width={40} alt='modal close' />
               </button>
          </>
     );
};

export default ModalClose;
