# Borrow My Book

## Overview
Borrow My Book is a web application that allows users to borrow books from a shared library. The application tracks which books have been borrowed, returned, and allows users to rate the books they have borrowed.

## Installation Steps

# 1. Clone the Application

First, clone the repository to your local machine using the following command:

```sh
git clone https://github.com/BCincioglu/Borrow_My_Book.git
```

# 2. Install Dependencies

Navigate into the project directory and install the necessary dependencies:

```sh
cd borrow-my-book
npm install
```

# 3. Database Setup

Create a MySQL database for the application. Connect to your MySQL server and run the following command:

```sh
CREATE DATABASE borrow_db;
```

# 4. Create Database Tables

Sequelize will automatically create the necessary database tables when you run the application.

# 5. Run the Application

Finally, run the application using the following command:

```sh
npm start
```