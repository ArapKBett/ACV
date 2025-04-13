#include <openssl/aes.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void encrypt_file(const char *input_file, const char *output_file, const unsigned char *key) {
    FILE *in = fopen(input_file, "rb");
    FILE *out = fopen(output_file, "wb");
    if (!in || !out) {
        printf("Error opening files\n");
        exit(1);
    }

    unsigned char inbuf[1024], outbuf[1024 + AES_BLOCK_SIZE];
    int inlen;

    AES_KEY enc_key;
    AES_set_encrypt_key(key, 256, &enc_key);

    while ((inlen = fread(inbuf, 1, 1024, in)) > 0) {
        AES_encrypt(inbuf, outbuf, &enc_key);
        fwrite(outbuf, 1, inlen, out);
    }

    fclose(in);
    fclose(out);
}

void decrypt_file(const char *input_file, const char *output_file, const unsigned char *key) {
    FILE *in = fopen(input_file, "rb");
    FILE *out = fopen(output_file, "wb");
    if (!in || !out) {
        printf("Error opening files\n");
        exit(1);
    }

    unsigned char inbuf[1024], outbuf[1024 + AES_BLOCK_SIZE];
    int inlen;

    AES_KEY dec_key;
    AES_set_decrypt_key(key, 256, &dec_key);

    while ((inlen = fread(inbuf, 1, 1024, in)) > 0) {
        AES_decrypt(inbuf, outbuf, &dec_key);
        fwrite(outbuf, 1, inlen, out);
    }

    fclose(in);
    fclose(out);
}

int main(int argc, char *argv[]) {
    if (argc != 5) {
        printf("Usage: %s <encrypt/decrypt> <input> <output> <key>\n", argv[0]);
        return 1;
    }

    unsigned char key[32] = {0};
    strncpy((char *)key, argv[4], 31);

    if (strcmp(argv[1], "encrypt") == 0) {
        encrypt_file(argv[2], argv[3], key);
        printf("Encryption completed\n");
    } else if (strcmp(argv[1], "decrypt") == 0) {
        decrypt_file(argv[2], argv[3], key);
        printf("Decryption completed\n");
    } else {
        printf("Invalid operation\n");
        return 1;
    }

    return 0;
}
