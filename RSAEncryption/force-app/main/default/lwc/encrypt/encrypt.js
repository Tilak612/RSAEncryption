import { LightningElement } from 'lwc';
import encryption from '@salesforce/resourceUrl/Encryption';
import { loadScript } from 'lightning/platformResourceLoader';
import { encryptUtil } from './encryptUtil';

export default class Encrypt extends LightningElement {
    isErrorScreen = false
    privateKey = `MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCVtoENv65KdnWEwzhe1xr0D5SZvDfXJl2JPc4AhAgCxfNt6UkNL9fn8sSzkO8lYkv4LX5JRbQkouK2sedJGscGjNdGlWRkbic3KgQ7NZxPv5S1mMGt0lWsrZqP4/aQJT/uQB6q44201/d/bc/rBAcKapxGQ++T/79HnWcoUnsldei7JZiugE1uBEFZIIjtIFqJQTHiYkRo4qNl9xAt0IaR6U1vspu9oGBXpMGL/ElP5iw3TjN5ZrQJLkS4I0vmFvcsqQiR6yddC/uxbjP8QbLNylCwwQCGJkBWOXpbHpY9ZDiG17lYpujP3GybnA54Tv3jJRj8gDzkI/6wq4e/u8OxAgMBAAECggEAUjAwxOV3vzUs6sdpSNd52oY7I/KqDRjovJELaEkTRMJ7EtnA2tZrBtDFn3Zvcux1nDcNXxg+/uXU5EriF8X1gOkMvZkB1giKysPsMr0JpNYdw1uq58vScMuVUGzrTNLGN/tHWrU1dBQjsPcN74z0eIlyZTiia3M5BQ2qNf6h0DwFgNnNxOHNJnVVUiBy5xl1AxqYXGx5wP72c3F+k27QOK8HSVbu9YuGgnY/MdtlZYpRsoCG+951SPhIvUm1y6ewnt2H65LhhPrvuySomBW2roOCJxRefJFKlllssRh3+Ru4K/7JgyXLOw4jLQa63WbfIhwwrVXStd8QBSIblRGqYQKBgQDLKpg8kitiex0PKq3UF01g68TBlMWHQXQpM7b7rwTrwzLaUYpMV2QwEOQlC3ihkfuH+f29aXLOEX7K29uTB33PwttSXUG8uzuRfeZA3oUrb1uwLGFrWfZcDBIbdXWyQugGP+R+dSceTOJASqR53ZK+7EzanC8TWcPEmnwuh6JDFQKBgQC8pVk2m3lKsU8yeEtAPpqTvwueqQaWUlUqGg7iNfrlglc3ceekih8+FJjlMVuSchxI0HI4d9QDSYt1qlc2P5mQj8VEaEzSiHONlCuitMf+UtF/qv4MDRDNn1NkzJrk2XxfTklUogNwSBR4X0xee7pgvc/eymBjlzMWUq3/pDBVLQKBgEFRSmx+2e/pgOg1YnmDnF8CrdlGyVK42m28sKGuHTjnItxJxtrQZeeGJrM6Qug/FM0ctFVHJ5/UxBzYHnnguLQpA3YxgUb6MyaNgY9tewcB4Ep9mjx3SdtCDjhBxTswg4Qu2nlFlPQK59qfpM2BTQKQ2gyWlhP0khoNSMt009gZAoGBAKvBTAG4+mz0FKxZ9AGxPiHo3lZ9hF7W5W1ovkZdaWsPCgOUNJiNnTZzoGWEU+B4/qGZD3W0PBcmHdBq3+6nZ1TEYZIP+GnzDGpKDpScTj6S/uVjNNyaBMOCHXZ4B0r3bRKE/6ULwV+4cNLLyYd41U+BYkJxNeNW5Y+chYls3widAoGARZanNu2Hv40gQ0jTy1i2uHO1bipqZ3IpZOSnqIzeGfBJTdx+3FW3A7myNMixH6M/VUMghGw/u/nOnRw/afP0CFJQxy6iauTtpllqSOZ5Nie0b6Ei2yeq1HkPO/R2vYwveJGoVym+8bN2jtFuSWdFxL4JXqq/0lzoa9/0OQypCdI=`

    publickey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlbaBDb+uSnZ1hMM4Xtca9A+Umbw31yZdiT3OAIQIAsXzbelJDS/X5/LEs5DvJWJL+C1+SUW0JKLitrHnSRrHBozXRpVkZG4nNyoEOzWcT7+UtZjBrdJVrK2aj+P2kCU/7kAequONtNf3f23P6wQHCmqcRkPvk/+/R51nKFJ7JXXouyWYroBNbgRBWSCI7SBaiUEx4mJEaOKjZfcQLdCGkelNb7KbvaBgV6TBi/xJT+YsN04zeWa0CS5EuCNL5hb3LKkIkesnXQv7sW4z/EGyzcpQsMEAhiZAVjl6Wx6WPWQ4hte5WKboz9xsm5wOeE794yUY/IA85CP+sKuHv7vDsQIDAQAB`

    util = new encryptUtil()
    encryptStaticREsource
    connectedCallback() {
        loadScript(this, encryption).then(() => {
            this.encryptStaticREsource = new JSEncrypt();
        }).catch(error => {
            this.isErrorScreen = true;
            this.util.showNotification(this, "Error", error.message, 'error')
        });
    }
    handleEncryption() {
        try {
            let plainText = this.template.querySelector(".input")?.value
            if (!plainText || plainText == '') {
                this.util.showNotification(this, "Error", 'PLease enter "Text to encrypt"', 'error')
                return;
            }
            if (!this.publickey || this.publickey == '') {
                this.util.showNotification(this, "Error", 'PLease enter "Public Key"', 'error')
                return;
            }
            this.template.querySelector(".encrypted").value = this.util.Encryption(this.encryptStaticREsource, plainText, this.publickey);
        } catch (e) {

            this.util.showNotification(this, "Error", e.message, 'error')
        }
    }
    handleDecryption() {
        try {
            let cipherText = this.template.querySelector(".encrypted")?.value
            if (!cipherText && cipherText == '') {
                this.util.showNotification(this, "Error", 'PLease enter "Encryption Text"', 'error')
                return;
            }
            if (!this.privateKey && this.privateKey == '') {
                this.util.showNotification(this, "Error", 'PLease enter "Private Key"', 'error')
                return;
            }
            this.template.querySelector(".decrypted").value = this.util.Decryption(this.encryptStaticREsource, cipherText, this.privateKey);
        } catch (e) {
            console.log(e)
            this.util.showNotification(this, "Error", e.message, 'error')
        }
    }
    handlePrivatekey(event) {
        try{
        this.privateKey = event.detail.value
        }catch(e){
            console.log(e.message)
        }
    }
    handlePublickey(event) {
        this.publickey = event.detail.value
    }


}