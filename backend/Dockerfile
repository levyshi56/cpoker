# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /

# Copy the requirements.txt file to the container
COPY requirements.txt .

ENV VIRTUAL_ENV=myvenv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend directory to the container
COPY . .

# Expose the port that Flask is running on
EXPOSE 5001

# Set the environment variables
ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0

# Run the Flask application
CMD ["flask", "run"]
