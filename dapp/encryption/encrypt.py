from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from concrete.ml.deployment import FHEModelClient
import numpy as np
import requests
import json
import base64

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
FHE_DIRECTORY = './dapp/encryption/tmp/fhe_client_server_files/'
URL = "http://127.0.0.1:5002/predict"

labels = [
    "Hypertension",
    "Diabetes",
    "Asthma",
    "Coronary Artery Disease",
    "Chronic Kidney Disease",
    "Obesity",
    "Anemia",
    "Osteoporosis",
    "Hyperlipidemia",
    "None"
]

client = FHEModelClient(path_dir=FHE_DIRECTORY, key_dir="/tmp/keys_client")
serialized_evaluation_keys = client.get_serialized_evaluation_keys()


def helper(data):
    print(data)
    print(np.array([data]))
    print(np.random.rand(1, 20))
    encrypted_data = client.quantize_encrypt_serialize(np.array([data]))
    # Make new request to the server
    try:
        response = requests.post(URL, headers={"Content-Type": "application/json"}, data=json.dumps({"value": base64.b64encode(encrypted_data).decode('ascii')}))
        encrypted_result = response.json()["encrypted_result"]
        encrypted_result = base64.b64decode(encrypted_result)
    except Exception as e: 
        print(e)
        return json.dumps({"value": "None"}) 

    decrypted_data = client.deserialize_decrypt_dequantize(encrypted_result)

    result = labels[np.argmax(decrypted_data)]
    return json.dumps({"value": result}) 

# encrypt the data
@app.route("/", methods=["POST"])
@cross_origin()
def encrypt():
    data = request.json["value"]
    return helper(data)





if __name__ == "__main__":
    app.run(port=5001)
    # data = np.random.rand(1, 20)
    # print(helper(data))