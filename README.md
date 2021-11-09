## Study-Timer-BE

# What is StudyTime?
This repository is the backend API for the StudyTime web application used to track the amount of time an individual is dedicating to a specific area of study. It is a simple application that allows you to create timers to keep you on task and productive. By adding subjects to said timers, you can see how much time you've spent studying a specific topic and give you insight on areas you may need to direct more attention to.


# Table of Contents
* [ Introduction ](#what-is-studytime?)
* [ Technologies Used ](#technologies)
* [ Database Tables ](#database-tables)
* [ Authentication Endpoints ](#authentication-endpoints)
* [ User Endpoints ](#user-endpoints)
* [ Subject Endpoints ](#subject-endpoints)
* [ Timer Endpoints ](#timer-endpoints)
* [ Links ](#links)


----------------------------------------------------------------


# Technologies

Below is a list of the technologies used to create the StudyTime backend API, as well as their version numbers.

- Nodejs (16.13.0)
- Knex (0.95.13)
- Express (4.17.1)
- Sqlite3 (5.0.2)
- Pg (8.7.1)
- Jsonwebtoken (8.5.1)
- Bcryptjs (2.4.3)
- Dotenv (10.0.0)
- Helmet (4.6.0)
- Cors (2.8.5)


---------------------------------------------------------------


# Database Tables

In total, there are three tables being used in this application. **Users**, **Subjects**, and **Timers**. Below you I have listed the structure of these tables and what they require.

## User Table

| Key | Value | Required |
| :-: | :-:   | :-:      |
| ID | Integer | true |
| username | Text | true |
| password | Text | true |
| display_name | Text | false |
| created_at | timestamp | auto |
| modified_at | timestamp | auto |


----------------------------------------------------------------------------


# Authentication Endpoints

## ```/api/auth/register```

Endpoint used to register a new user to the platform. Hashes the user's password to allow it to be saved in the database.

### Requires
- username
- password


## ```/api/auth/login```

Endpoint used to sign an existing user into the platform. Upon a successful login, will generate a token to access restricted routes and use the application.

### Requires
- username
- password


-----------------------------------------------------------------------------


# User Endpoints





