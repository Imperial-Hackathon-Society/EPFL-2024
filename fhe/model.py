import time

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from concrete.compiler import check_gpu_available
from joblib import Memory
from sklearn.datasets import fetch_openml
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from torch import nn

from PIL import Image
import os

from concrete.ml.sklearn import NeuralNetClassifier

# Preliminary data analysis
# Load skin dataset

# Load data from archive 
metadata = pd.read_csv('archive/HAM10000_metadata.csv')


image_dir = 'archive/HAM10000_images_part_1'

# Initialize an empty list to store the image matrices
X = []
y = []
count = 0
label_dict = {}

# Loop through each image file in the directory
for filename in os.listdir(image_dir):
    if count < 100:
        count += 1
        if filename.endswith('.jpg') or filename.endswith('.png'):  # Add other image formats if needed
            # Open each image using PIL
            img_path = os.path.join(image_dir, filename)
            img = Image.open(img_path)

            img = img.resize((128, 128))
            
            # Convert the image to a NumPy array
            img_array = np.array(img)
            img_array = img_array / 255.0

            # grey scale
            img_array = np.array(np.dot(img_array[...,:3], [0.299, 0.587, 0.114]))

            # Convert to Float32
            img_array = img_array.astype('float32')
            
            # Append the NumPy array to the list
            metadata_row = metadata.loc[metadata['image_id'] == filename[:-4]]
            X.append(img_array)
            
            label = metadata_row['dx'].values[0]

            if label not in label_dict:
                label_dict[label] = 0
            else:
                label_dict[label] += 1

            # Append the label to the list 
            y.append(label)

# Convert lists to NumPy arrays
X = np.array(X)
y = np.array(y)

# Flatten the images if necessary
X = X.reshape(X.shape[0], -1)

# Encode labels
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(y)

# Optionally, split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(label_dict)

x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(x_train[0].shape)

params = {
    "module__n_layers": 3,
    "module__activation_function": nn.ReLU,
    "max_epochs": 1000,
    "verbose": 1,
}

model = NeuralNetClassifier(**params)


model.fit(X=x_train, y=y_train)


