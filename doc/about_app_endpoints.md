# The app controller implements the following routes

- GET
  - /post/:id: Fetch a single post by its id
  - /feed: Fetch all published posts
  - /filter-posts/:searchString: Filter posts by title or content

- POST
  - /post: Create a new post
    - Body:
      - title: String (required): The title of the post
      - content: String (optional): The content of the post
      - authorEmail: String (required): The email of the user that creates the post
  - /user: Create a new user
    - Body:
      - name: String (optional): The name of the user
      - email: String (required): The email address of the user
      - password: String (required, not hashed at the moment): The password of the user

- PUT
  - /publish/:id: Publish a post by its id

- DELETE
- /post/:id: Delete a post by its id
