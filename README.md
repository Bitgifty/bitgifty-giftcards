# Bitgifty Giftcards Frontend

## 📌 Description

Giftcards Frontend is a web-based interface for Minipay, a decentralized platform that facilitates the seamless buying, selling, and redemption of gift cards using the Celo blockchain. This repository contains the source code for the application's user interface.

## 🚀 Features

- User-Friendly Interface: A simple, intuitive interface designed for seamless transactions.
- Blockchain Integration: Built on the Celo blockchain to provide decentralized and secure transaction processing.
- Cross-Border Payments: Facilitates low-cost international transactions using stablecoins like cUSD.
  Gasless Transactions: Allows users to transact without the need for gas tokens.

  ## 🚀 Technologies Used

- React Typescript + Tailwind CSS + Redux Toolkit

## 🚀 Prerequisites

- Node.js: Version 16+ is recommended.
- npm or yarn: Package manager.
- Access to a Celo blockchain network.

## 🛠 Getting Started

Clone the repository:

```bash
git clone https://github.com/Bitgifty/bitgifty-giftcards.git
cd bitgifty-giftcards
Install Dependencies bash

yarn start Visit http://localhost:5173 in your browser to view the app
```

## Deployment

The project is set up for deployment using Vercel or any other hosting service. Ensure the environment variables are configured in your deployment platform.

## Contribution

We welcome contributions to improve Giftcards Frontend! Follow these steps.

## Fork the repository

Create a feature branch: git checkout -b feature-name. Commit your changes: git commit -m "Add feature". Push to the branch: git push origin feature-name. Open a Pull Request.

## Repository Navigation

Create a feature branch: git checkout -b feature-name. Commit your changes: git commit -m "Add feature". Push to the branch: git push origin feature-name. Open a Pull Request.

### The Source Folder (src):

This folder contains subfolders and files performing major app operations. The major subfolders are: app, appSlices, assets, components and pages. Major files include App.tsx and main.tsx

- The App.tsx file renders all page components in the app. It wraps the components (its children) with all necessary providers to share context across the app.
- The main.tsx file renders the App.tsx file in the root node of the React DOM.

### The “app” Folder:

This folder contains hook.ts and store.ts files.
The hook.ts file contains custom hooks for redux state management integration
The store.ts houses the redux store which contains all the reducers through which redux actions are dispatched.

### The “appSlices” Folder:

This folder contains all redux slices (api slice and other slices associated with each feature of the app).
All api requests are made from within the apiSlice.ts file.

### The “assets” Folder:

This folder has a subfolder which contains some images used in the app

### The “components” Folder:

This folder contains reusable helper components used across the app.

### The “pages” Folder:

This folder contains subfolders (BuyCheckout.tsx, BuyGiftCard.tsx, History.tsx, Home.tsx, PurchaseForm.tsx, SellCheckout.tsx, SellForm.tsx, and SellGiftCard.tsx), each representing a page named after it in the app, and two other files—index.tsx and \_app.tsx.

- Home.tsx: This component renders the dashboard.
- BuyCheckout.tsx: This component shows the checkout page in the process of buying giftcard.
- BuyGiftCard.tsx: This component shows all the vendors users can purchase giftcards from.
- History.tsx: This component shows transaction history.
- PurchaseForm.tsx: This component renders the form that users fill to buy giftcard.
- SellCheckout.tsx: This component shows the checkout page in the process of redeeming giftcards.
- SellForm.tsx: This component renders the form that users fill out to sell or redeem giftcards.
- SellGiftCard.tsx: This component shows all the vendors users can sell their giftcards to or vendors from which they can redeem their giftcards.
