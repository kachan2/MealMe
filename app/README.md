### To run the app: 
1. Install Node.js and npm
2. Install all dependencies for the app with `npm install`
3. Start the app by running the following commands in the terminal: `npm start`

### To connect to GCP: 
1. Make sure `setting-up-db` instance is running
2. Run `./cloud-sql-proxy --address 127.0.0.1 --port 3301 aqueous-thought-378020:us-central1:setting-up-db` in the working directory terminal
3. Re-run `npm start` and pray it works