import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export class encryptUtil {
    showNotification(self, title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        self.dispatchEvent(evt);
    }
    Encryption(encrypt, plaintext,publickey) {
        encrypt.setPublicKey(publickey);
        return encrypt.encrypt(plaintext);
    }
    Decryption(decrypt, ciphertext,privatekey) {
        decrypt.setPrivateKey(privatekey);
        const text = decrypt.decrypt(ciphertext);
        return text;
    }
}