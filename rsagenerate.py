from Crypto import Random
from Crypto.Cipher import PKCS1_v1_5 as Cipher_pkcs1_v1_5
from Crypto.PublicKey import RSA
import base64

random_generator = Random.new().read

rsa = RSA.generate(2048, random_generator)

private_pem = rsa.exportKey()

with open('private.pem', 'wb') as f:
    f.write(private_pem)

public_pem = rsa.publickey().exportKey()
with open('public.pem', 'wb') as f:
    f.write(public_pem)
