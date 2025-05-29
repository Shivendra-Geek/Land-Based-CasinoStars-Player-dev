import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
const SECRET_KEY = 'trdtS:mK9X:[V[.U_"uIOUERV)a%<I'; // Keep this secret and strong

export const encryptSession = (data) => {
    const ciphertext = AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return ciphertext;
};

export const decryptSession = (ciphertext) => {
    try {
        const bytes = AES.decrypt(ciphertext, SECRET_KEY);
        const decryptedData = bytes.toString(Utf8);
        return JSON.parse(decryptedData);
    } catch (err) {
        return '';
    }
};
