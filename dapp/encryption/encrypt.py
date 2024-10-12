from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import base64
import hashlib
from Crypto import Random
from Crypto.Cipher import AES

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

class AESCipher(object):

    def __init__(self, key):
        self.bs = AES.block_size
        self.key = hashlib.sha256(key.encode()).digest()

    def encrypt(self, raw):
        raw = self._pad(raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(raw.encode()))

    def decrypt(self, enc):
        enc = base64.b64decode(enc)
        iv = enc[:AES.block_size]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return AESCipher._unpad(cipher.decrypt(enc[AES.block_size:])).decode('utf-8')

    def _pad(self, s):
        return s + (self.bs - len(s) % self.bs) * chr(self.bs - len(s) % self.bs)

    @staticmethod
    def _unpad(s):
        return s[:-ord(s[len(s)-1:])]
    
@app.route("/encrypt", methods=["POST"])
@cross_origin()
# Encrypt data using RSA then return to frontend 
def encrypt():
    key = request.json["key"]
    data = request.json["value"]
    return jsonify(AESCipher(key).encrypt(data).decode("utf-8")) 

@app.route("/decrypt", methods=["POST"])
@cross_origin()
# Decrypt data using RSA then return to frontend
def decrypt():
    key = request.json["key"]
    data = request.json["value"]
    return jsonify(AESCipher(key).decrypt(data).decode("utf-8"))

app.run(port=7385)