## DESCRIPTION
The Blogs API project is a Restful API which allows an user to interact with all basic CRUD operations in a blog, including creating and authenticating users, as well as reading, posting and updating posts.

## STACKS
- NodeJS and Express for creating endpoints with request and response functions;
- Sequelize for interacting with the database; and
- JWT for creating tokens on login and authenticating the tokens on the relevant endpoints.

### Dokerfiles, Docker Compose and Sequelize config files were provided by Trybe and were not written by me.

## Intructions for running the applications locally using Docker
1. Clone the repository  
```git clone git@github.com:P-dPF/blogs-api.git```
2. Navigate into the directory created in the previous step  
```cd blogs-api```
3. Build the docker images  
```docker-compose up -d --build```
4. Access the interactive terminal within the node container initialized in the previous step  
```docker exec -it blogs_api bash```
5. Install depedencies (in the interctive terminal)  
```npm install```
6. Populate the database (in the interctive terminal)  
```npm run prestart && npm run seed```

## Intructions for running the applications locally without Docker
(expected node v. 16 or higher and mysql installed locally)
1. Clone the repository  
```git clone git@github.com:P-dPF/blogs-api.git```
2. Navigate into the directory created in the previous step  
```cd blogs-api```
3. Install depedencies  
```npm install```
4. Change the .env.example file name to .env and set the relevant environment variables for your machine.  
5. Populate the database  
```npm run prestart && npm run seed```

:mailbox_with_mail: If you have any insights or feedbacks that you would like to share or if need further info on how to run the application, please don't hesitate to contact me :) My contact info is in my profile main page.

:bulb: Use Thunder Client, Insomnia, Postman or a web browser to make requests to the API. The relevant web protocol and endpoints are indicated below.

## ENDPOINTS:

- POST ```http://localhost:3000/login``` to login. Use a standard user created in the seeding. Example request body.
```
{
  "email": "lewishamilton@gmail.com",
  "password": "123456"
}
```
Copy the token generated in the endpoint above and insert it in the Authorization header for the requests marked with "!"
- POST ```http://localhost:3000/user``` to create a user. Example request body

```
{
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  // image is not mandatory
}
```

- :point_up: GET ```http://localhost:3000/user``` to list all users
- :point_up: GET ```http://localhost:3000/user/:id``` to list a specific user (replace the ":id" in the URL with a number)
- :point_up: POST ```http://localhost:3000/categories``` to create a new subject category for the posts. Example request body:

```
{
  "name": "Typescript"
}

```
- :point_up: GET ```http://localhost:3000/categories``` to list all categories
- :point_up: POST ```http://localhost:3000/post``` to create a new post. Example request body:

```
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
}
```

- :point_up: GET ```http://localhost:3000/post``` to list all posts.
- :point_up: GET ```http://localhost:3000/post/:id``` to list a specific post (replace the ":id" in the URL with a number).
- :point_up: PUT ```http://localhost:3000/post/:id``` to update a specific post (replace the ":id" in the URL with a number). Example request body:

```
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```

- :point_up: DELETE ```http://localhost:3000/post/:id``` to delete a specific post (replace the ":id" in the URL with a number).
- :point_up: DELETE ```http://localhost:3000/user/me``` to delete the logged user (replace the ":id" in the URL with a number).
- :point_up: GET ```http://localhost:3000//post/search?q=searchTerm``` to delete the logged user (replace the "searchTerm" in the URL with a word to search). Example: vamos
