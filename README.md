# Location Sharing Application

This repository contains a set of files for a simple location sharing application using Node.js, WebSocket, and Python.

## Overview

- `my_server/server.js`: A Node.js script that starts an HTTPS and WebSocket server, receives location data from clients, and saves it to a `location.yaml` file. It also serves the `location.yaml` file through an HTTP endpoint.
- `public_html/index.html`: A client-side interface for obtaining the user's location in the browser and sending it to the server via WebSocket.
- `public_html/location.html`: A client-side interface for receiving location data sent from the server via WebSocket and displaying it in the browser.
- `script/get_location.py`: A Python script that retrieves the `location.yaml` file from the server via HTTPS and prints its contents to the console.

## Setup

### Prerequisites

- Node.js and npm must be installed.
- Python must be installed along with the `requests`, `pyyaml`, and `urllib3` libraries.

### Installation

1. Clone the repository to your local machine.
2. Navigate to the `my_server` directory and run `npm install` to install the required Node.js modules.
3. Ensure that the SSL/TLS certificate files are present at the specified paths in `server.js`.

## Running the Application

### Starting the Server

1. Navigate to the `my_server` directory.
2. Run `node server.js` to start the HTTPS and WebSocket server.
3. The server will listen for connections on port 8080.

### Accessing the Client Interfaces

- Open a web browser and navigate to `https://<your-server-address>:8080` to access the `index.html` page.
- To view the `location.html` page, navigate to `https://<your-server-address>:8080/location.html`.

### Using the Python Script

1. Navigate to the `script` directory.
2. Run `python get_location.py` or `python3 get_location.py` to execute the script.
3. The script will retrieve and display the contents of the `location.yaml` file from the server.

## Security Note

The provided Python script `get_location.py` ignores SSL certificate verification due to the use of a self-signed certificate. This introduces a security risk and should only be used in a trusted environment. For production environments, it is recommended to use a certificate signed by a trusted Certificate Authority (CA).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
