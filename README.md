Vibe Commerce - Full-Stack E-commerce Application
This is a complete full-stack e-commerce application built using the MERN stack (MongoDB, Express, React, Node.js). It was developed as a technical screening task to demonstrate proficiency in building and integrating a frontend and backend system.

(Optional: You can create a GIF of your application working and upload it to a site like Imgur to replace the link above)

Features
View Products: Fetches and displays a list of products from the backend database.

Shopping Cart: Full cart functionality, including:

Adding products to the cart.

Increasing the quantity of existing items.

Removing items from the cart.

Live-updating cart item count in the header.

Mock Checkout: A checkout page that simulates an order process and provides a mock receipt.

RESTful API: A well-structured backend API to handle all product and cart operations.

Modern Frontend: A responsive and interactive UI built with React, Vite, and Tailwind CSS.

Tech Stack
Frontend:

React: For building the user interface.

Vite: As the fast frontend build tool.

React Router: For client-side routing.

Tailwind CSS: For utility-first styling.

Axios: For making HTTP requests to the backend.

React Context API: For global state management of the shopping cart.

Backend:

Node.js: As the JavaScript runtime environment.

Express: As the web framework for creating the API.

MongoDB: As the NoSQL database.

Mongoose: As the Object Data Modeling (ODM) library for MongoDB.

dotenv: For managing environment variables.

Project Structure
text
/vibe-commerce-cart
├── /client/          # React (Vite) Frontend Application
│   ├── /src/
│   ├── package.json
│   └── ...
└── /server/          # Node.js (Express) Backend Application
    ├── /config/
    ├── /controllers/
    ├── /data/
    ├── /models/
    ├── /routes/
    ├── /seeder/
    ├── .env
    ├── index.js
    └── package.json