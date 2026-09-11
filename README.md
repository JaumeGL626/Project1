# Project1

## About the project

This is a personal project developed during my free time and vacations. It is mainly a learning project focused on exploring full-stack application development and implementing different features from the backend to the frontend.

The development decisions were intentionally focused on learning, experimentation, and functionality rather than production-level requirements such as advanced security hardening,a highly polished UI....

The idea behind Project1 is to create a platform with features that I would personally like to have at a university.

At the moment, university communication is often based mainly on emails. The goal of this project is to create a more interactive environment where university students can discover interesting activities, communicate with other students, and create their own communities.

The project includes features such as forums, subforums, advertisements, profiles, and chats. Users can create their own forums and subforums and build communities around different interests or topics.

The current version is focused on university users. At this stage, users must already be registered in the university system in order to access the platform. There is currently no public registration system, as university accounts would be created beforehand.

The original idea described in the Wiki may differ in some aspects from the current implementation, as the project has evolved during development. The README reflects the current direction of the project.

## Main features

* User login using accounts stored in the database.
* User authentication using JWT.
* View your own profile.
* Edit your own profile.
* Upload and change your profile picture.
* Create forums.
* Create subforums.
* Create advertisements.
* View advertisements.
* View your own advertisements.
* Edit your own advertisements.
* View your own forums.
* Edit your own forums.
* Edit the subforums and chats belonging to your forums.
* Log out.

Some features are partially implemented and may be expanded in future versions.

## Technologies

### Backend

* Java
* Spring Boot
* Gradle
* Spring Security
* JWT
* Spring Data JPA / Hibernate
* Lombok
* MapStruct

### Frontend

* React
* Vite
* JavaScript
* React Router
* CSS

### Database

* PostgreSQL

### Image storage

* Cloudinary

## Architecture

The project follows a separated frontend/backend architecture.

* The frontend is responsible for the user interface and communication with the backend through HTTP requests.
* The backend provides the REST API, authentication, business logic, and database access.
* PostgreSQL is used for persistent data storage.
* Cloudinary is used for image storage.

## Authentication and security

Authentication is implemented using JWT.

Users must already exist in the database to log in. There is currently no public registration endpoint.

Passwords are stored using BCrypt hashing rather than being stored as plain text.

JWT tokens are used to authenticate requests to protected endpoints.

This project is primarily a learning project, so the security implementation is not intended to represent a complete production-ready security system.

## Image management

Images are uploaded through the backend and stored using Cloudinary.

The application stores the resulting image URLs rather than storing the image files directly in the PostgreSQL database.


## Database

PostgreSQL is used as the project's relational database.

The backend uses Spring Data JPA and Hibernate to interact with the database.

## Project structure

```text
Project1/
├── backend/
└── frontend/
```

The backend contains the Spring Boot application and REST API, while the frontend contains the React application.

## Getting started

Clone the repository and open the project.

The backend can be run from an IDE such as IntelliJ IDEA, while the frontend can be run separately using its development environment.

The backend and frontend must both be running for the complete application to work.

## Configuration

Before running the application, configure the required database and Cloudinary settings in the backend configuration.

Make sure that sensitive values such as passwords, API keys, and Cloudinary secrets are not committed to the repository.

Development data and test users are provided through `DevDataSeeder`.

## Current limitations

* The UI is currently basic and prioritizes functionality over visual polish.
* Some parts of the layout may behave incorrectly when the browser is heavily zoomed in or out.
* Changing the profile picture may take a few seconds before the new image is displayed.
* The chat functionality is not currently implemented.
* The application has not been optimized for scalability or security.
* Some features are still under development.

## Future improvements

Some of the ideas I would like to implement in the future include:

* Grade calculator:

  * Add subjects and current grades.
  * Calculate the grade needed to achieve a desired final result.
  * Allow grades to be updated when retaking an exam.
* University timetable.
* Group chats.
* Group project management.
* Shared reminders for project groups.
* Integration with external tools or applications to make group projects easier to manage.
* A more polished and responsive UI.
* Potentially expanding the platform to support multiple universities instead of only one university.

There are many other ideas that could be added as the project continues to evolve.

## Documentation

Additional information about the original idea, requirements, and project evolution can be found in the GitHub Wiki.

## Author

Jaume Gisbert Lopez
