# Credit Card Statement Parser

Extract key information from credit card statements instantly with this React app. Everything happens **locally in your browser**—your data never leaves your machine.


## Features

- Supports major card issuers: **American Express, Chase, Citibank, Capital One, Discover**  
- Extracts important data points:
  - Last 4 digits of the card
  - Billing cycle
  - Payment due date
  - Total balance
  - Minimum payment
- Upload **PDF statements** only  
- Clean, responsive UI with **TailwindCSS**


## Demo

> Screenshot or GIF goes here (optional)
<img width="1871" height="1129" alt="image" src="https://github.com/user-attachments/assets/a816bc57-e690-4f43-b12e-b6e09e3e79d8" />


## Installation

1. Clone the repo:

git clone https://github.com/YOUR_USERNAME/credit-card-parser.git
cd credit-card-parser

2. Install dependencies:
npm install

3. Run the app:
npm start

Open http://localhost:3000 in your browser.

Usage
1. Click on the upload area
2. Select a PDF statement from your supported card issuer
3. Wait a few seconds for parsing
4. View extracted information instantly

Tech Stack
1. React.js
2. TailwindCSS
3. Lucide React Icons
4. PostCSS & Autoprefixer

Notes
1. Currently supports PDFs only
2. Parsing is basic—some PDFs with unusual formats may not extract correctly
3. Data is processed locally; no external API calls
