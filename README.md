## How to Run Locally

First Clone My Project Repository by running the following command in your terminal

```bash
  git clone this_repository
```

Then Go to the project directory and open the project in your favorite code editor

```bash
  cd create-course
```

Then Install all the necessary dependencies by running the following command

```bash
  npm install (all dependencies)
```

And At-last Start the server by running the following command

```bash
  npm run startDev
```


## Environment Variables

add the following environment variables to your .env file and replace the values with your own

`PORT`
`DATABASE_URL`
`JWT_SECRET`
`JWT_EXPIRES_IN`
`BCRYPT_SALT`
`NODE_ENV`



## Technologies Used:

**Server:** Node, Express, Mongoose, TypeScript

**Validation**: Zod, EsLint, Prettier

**Database**: MongoDB

**Authentication**: JWT

**Deployment**: Vercel



## Features

- Create Course
- Update Course
- Create Category
- Create Review
- Register User
- Login User
- Change Password



## API Reference

#### Get all courses

```http
  GET /api/courses
```

#### Get single course with reviews

```http
  GET /api/courses/:courseId/reviews
```

#### Create new course

```http
  POST /api/courses
```

#### Update course

```http
  PUT /api/courses/:courseId
```

#### Create category

```http
  POST /api/categories
```

#### Get all categories

```http
  GET /api/categories
```

#### Create Review

```http
  POST /api/reviews
```

#### Register User

```http
  POST /api/auth/register
```

#### Login User

```http
  POST /api/auth/login
```

#### Change Password

```http
  POST /api/auth/change-password
```


## Documentation Link:

https://documenter.getpostman.com/view/27390673/2s9YkuXxgK



## Author

- [@Rakib](https://www.github.com/rakib8680) - github
