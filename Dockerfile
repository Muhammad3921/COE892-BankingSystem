# Switch to a Python base image
FROM python:latest

# Set the working directory for the Python script
WORKDIR /COE892-BankingSystem/

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code into the container
COPY PythonServer.py .

# Command to run the Python script
CMD ["python", "PythonServer.py"]