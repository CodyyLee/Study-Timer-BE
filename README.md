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


## Subject Table

| Key | Value | Required |
| :-: | :-:   | :-:      |
| ID | Integer | true |
| subject_name | Text | true |
| study_total | Integer | false |
| user_id | Integer | true |


## Timer Table

| Key | Value | Required |
| :-: | :-:   | :-:      |
| ID | Integer | true |
| user_id | Integer | true |
| subject_id | Integer | true |
| timer_name | Text | true |
| duration | Integer | true |


----------------------------------------------------------------------------


# Authentication Endpoints

## ```/api/auth/register```
#### `POST`

Endpoint used to register a new user to the platform. Hashes the user's password to allow it to be saved in the database.

### Requires
- username
- password

### Examples
Submitting a registration request, the JSON object would look something like so:

```json
  {
    "username": "Patch",
    "password": "123"
  }
```

A successful registration returns a status of 201, and return the newly created user's ID:

```json
  {
    "id": 3
  }
```




## ```/api/auth/login```
#### `POST`

Endpoint used to sign an existing user into the platform. Upon a successful login, will generate a token to access restricted routes and use the application.

### Requires
- username
- password

### Example
Much like the registration request, the login object will look the same:

```json
  {
    "username": "Patch",
    "password": "123"
  }
```

A successful login returns a status of 201, and return a JSON object like so:

```json
  {
    "id": 1,
    "username": "Patch",
    "password": "$2a$12$n6TAYGwvOwqsHtKhmz4jkeiBvbCzyhDAm1qpsEteglOH2FACpxnk.",
    "created_at": "2021-11-09T03:11:20.006Z",
    "updated_at": "2021-11-09T03:11:20.006Z",
    "display_name": Null
  }
```


-----------------------------------------------------------------------------


# User Endpoints

## ```/api/users/:id```
#### `GET`

Endpoint to get user data.

### Requires
- User ID

### Example
A successful request will result in a status of 200 and return a JSON object like so:

```json
  {
    "id": 1,
    "username": "Patch",
    "password": "$2a$12$n6TAYGwvOwqsHtKhmz4jkeiBvbCzyhDAm1qpsEteglOH2FACpxnk.",
    "created_at": "2021-11-09T03:11:20.006Z",
    "updated_at": "2021-11-09T03:11:20.006Z",
    "display_name": Null
  }
```




## ```/api/users/:id```
#### `PATCH`

Endpoint used to update a user's information.

### Requires
- User ID
- Data to be updated

### Examples
Upon registration, a display name is optional. A user may wish to add or change their display name. With that in mind, the starting object could look something like this:
```json
  {
    "id": 1,
    "username": "Patch",
    "password": "$2a$12$n6TAYGwvOwqsHtKhmz4jkeiBvbCzyhDAm1qpsEteglOH2FACpxnk.",
    "created_at": "2021-11-09T03:11:20.006Z",
    "updated_at": "2021-11-09T03:11:20.006Z",
    "display_name": Null
}
```

Sending an object to update the display name like so:
```json
  {
    "display_name": "Codyy"
  }
```

A successful request will return a status of 201, and return a JSON object like so:
```json
  {
    "id": 1,
    "username": "Patch",
    "password": "$2a$12$n6TAYGwvOwqsHtKhmz4jkeiBvbCzyhDAm1qpsEteglOH2FACpxnk.",
    "created_at": "2021-11-09T03:11:20.006Z",
    "updated_at": "2021-11-09T03:11:20.006Z",
    "display_name": "Codyy"
}
```




## ```/api/users/:id```
#### `DELETE`

Endpoint used to remove a user from the platform.

### Requires
- User ID

### Example
A successful request will return a status of 200, and return the following JSON object:

```json
  {
    "message": "User has been deleted."
  }
```


------------------------------------------------------------------


# Subject Endpoints

## ```/api/subjects/:user_id```
#### `POST`

Endpoint used to add a new subject linked to a user's account.

### Requires
- User ID
- Required subject data [ View table here ](#subject-table)

### Example
Adding a new subject will require a JSON object like so:

```json
  {
    "subject_name": "Nodejs"
  }
```

**NOTE that while a User ID is required, if it is not provided to the JSON object directly, it will be obtained from the URL automatically**

```json
  {
    "subject_name": "Nodejs",
    "user_id": 1
  }
```

A successful request will return a status of 201, and return the newly created subject's ID:

```json
  {
    "id": 1
  }
```




## ```/api/subjects/:id```
#### `GET`

Endpoint used to find a specific subject.

### Requires
- Subject ID

### Example
A successful response will return a status of 200, and a JSON object like so:

```json
  {
    "id": 1,
    "subject_name": "Nodejs",
    "study_total": null,
    "user_id": 1
  }
```



## ```/api/subjects/user/:user_id```
#### `GET`

Endpoint used to find **all** subject created by a user.

### Requires
- User ID

### Example
A successful response will return a status of 200, and a JSON object like so:

```json
  [
    {
        "id": 1,
        "subject_name": "Nodejs",
        "study_total": null,
        "user_id": 1
    },
    {
      "id": 2,
      "subject_name": "GrqphQL",
      "study_total": null,
      "user_id": 1
    }
]
```




## ```/api/subjects/:id```
#### `PATCH`

Endpoint used to update a subject.

### Requires
- Subject ID
- Data to be updated

### Examples
Updating a subject works just as updating the user does. If the initial object looks something like this:

```json
  {
    "id": 1,
    "subject_name": "Nodejs",
    "study_total": Null,
    "user_id": 1
  }
```

Sending a request such as:

```json
  {
    "study_total": 300
  }
```

A successful response would then return a status of 201, and the following JSON object:

```json
  {
    "id": 1,
    "subject_name": "Nodejs",
    "study_total": 300,
    "user_id": 1
  }
```




## ```/api/subjects/:id```
#### `DELETE`

Endpoint used to delete a subject.

### Requires
- Subject ID

### Example
A successful request will return a status of 200 and the following:
```json
  {
      "message": "Subject was deleted successfully."
  }
```



------------------------------------------------------------------------------------


# Timer Endpoints


## ```/api/timers/:user_id```
#### `POST`

Endpoint used to create a new timer for a user.

### Requires
- User ID
- Timer Data [ View table here ](#timer-table)


## ```/api/timers/:id```
#### `GET`

Endpoint used to get a specific timer's info

### Requires
- Timer ID


## ```/api/timers/user/:user_id```
#### `GET`

Endpoint used to get **all** timers created by a specific user.

### Requires
- User ID


## ```/api/timers/subject/:subject_id```
#### `GET`

Endpoint used to get **all** timers with a specific subject ID.

### Requires
- Subject ID


## ```/api/timers/:id```
#### `PATCH`

Endpoint used to update a specific timer's information.

### Requires
- Timer ID
- Timer data to change


## ```/api/timers/:id```
#### `DELETE`

Endpoint used to remove a timer from the platform.

### Requires
- Timer ID


----------------------------------------------------------------------------------------

# Links

Once Frontend application has been created, you can find the links to the frontend repo and the deployed project.
