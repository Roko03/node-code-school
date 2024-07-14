# Node Code School

Basic Node.JS + Express API project created for [Code school app](https://github.com/Roko03/code-school).
Includes:
- Authentication route providing [JWT token](https://jwt.io/)
- Routes for managing users, workshops and organizations based by role(admin, student and professor)

# Summary


# Project Structure
- **Folders and Files:** The project follows modular structure for folder with the model-view-controller pattern
- **Technologies Used:** JavaScript, Express.js
- **CRUD operations:** Four basic operations(Create, Read, Update, Delete)
- **Database:** The project is connected with [MongoDB](https://www.mongodb.com/) and use Object Data Modeling(ODM) library [Mongoose](https://mongoosejs.com/)
- **JWT authorization:** The project features an authorization system using access and refresh token. For creating JWT access and refresh token we use [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) that have options to create and validate token
- **Considerations:** The main focus of this project was to develop a practical understanding of Node.JS and Express.JS and how to create the MERN application by implementing JWT authorization

## Time Spent

I need 50-60 hours of work to make this project.

# How to Use
Make sure you have the following installed on your computer:

- [git](https://git-scm.com/)
- [node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

Clone the repository

```bash
git clone https://github.com/Roko03/node-code-school.git
```

Make sure that you install all packages from `package.json`

```bash
npm install
```

Running the Project
```bash
npm run start
```

Running the Project by automatically restarting
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000/) to view the project
