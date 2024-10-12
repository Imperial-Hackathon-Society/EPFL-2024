import pandas as pd
import numpy as np
from concrete.ml.deployment import FHEModelClient, FHEModelServer

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


FHE_DIRECTORY = 'tmp/fhe_client_server_files/'
# Setup the client
client = FHEModelClient(path_dir=FHE_DIRECTORY, key_dir="/tmp/keys_client")
serialized_evaluation_keys = client.get_serialized_evaluation_keys()

# Client pre-processes new data
X_new = np.random.rand(1, 2)
encrypted_data = client.quantize_encrypt_serialize(X_new)

# Setup the server
server = FHEModelServer(path_dir=FHE_DIRECTORY)
server.load()

# Server processes the encrypted data
encrypted_result = server.run(encrypted_data, serialized_evaluation_keys)

# Client decrypts the result
result = client.deserialize_decrypt_dequantize(encrypted_result)
print(f"Prediction: {result}")