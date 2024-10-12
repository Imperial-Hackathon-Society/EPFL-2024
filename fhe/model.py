import time

import matplotlib.pyplot as plt
import numpy as np
from concrete.compiler import check_gpu_available
from joblib import Memory
from sklearn.datasets import fetch_openml
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from torch import nn

from concrete.ml.sklearn import NeuralNetClassifier

use_gpu_if_available = False
device = "cuda" if use_gpu_if_available and check_gpu_available() else "cpu"