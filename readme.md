# Fitness Equipment Shop Admin Playground

A full-stack demo application for managing an imaginary fitness equipment shop. This project demonstrates SQL integration, user roles, and a web-based terminal UI.

To log into admin, which is able to access and DO everything use this login:
Username: admin
Password: Th1s1isG000dPword#W@luigi1NSSBc0pp'nDr1pFRfR

To log into seller, which is able to access only selling mechanics, using this login:
Username: seller
Password: Wh@ttyp3O'p3rs0nBuyzTrvsSc0txBrcl00naShrt?1991Chcg0Blls

To log into creator, which is able to create products and categories, use this login:
Username: creator
Password: 1l1k3myJ'sfr33shfrfrAin'tN0W@yD1dbya1nTL1f3Prs0n

## Installation

1. Clone the repository:git clone https://github.com/yourusername/your-repo-name.git
2. Install dependencies: npm install
3. Set up the database: node db.js
4. Start the application: npm start

## Usage

- Visit `http://localhost:3000` in your browser.
- Log in with one of the provided user accounts (see below).

## License

This project is licensed under the MIT License.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Features

- User authentication with three roles (admin, seller, creator)
- Product and category management
- Sales recording and reporting
- SQL database integration
- Web terminal interface

API logic: router.js
Business logic: controllers
Database logic & validation: models
Database setup: db.js
Web terminal UI: terminal.ejs
CLI helpers: app.js, cliView.js
