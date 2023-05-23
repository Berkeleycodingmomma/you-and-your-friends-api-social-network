# You & Your Friends; API Social Network 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [Open Source Initiative Link](https://opensource.org/licenses/MIT)

## Description.

This is an API built on Node.js that enables users to perform CRUD operations on data models related to social networking. It utilizes a NoSQL database and offers support for various models such as friends, users, thoughts, and reactions. These models can be retrieved either by their unique IDs or in their entirety. By leveraging the power of Node.js and Mongoose, this API provides a user-friendly and scalable solution for managing social networking data, removing the limitations typically associated with traditional relational databases.
#

## Table of Contents:
- [Overview](#Overview)
- [The Challenge](#The-Challenge)
- [Usage Information](#Usage-Information)
- [Installation Process](#Installation-Process)
- [Built With](#Built-With)
- [What I Learned](#What-I-Learned)
- [License](#License)
- [Author](#Author)
- [Acknowledgments](#Acknowledgments)
#

# Overview

## The Challenge:

The task involved creating a RESTful API for a social media startup, enabling them to carry out CRUD operations on data models for users, thoughts, and reactions. The API was developed utilizing Node.js and Mongoose, with a focus on scalability to handle substantial volumes of unstructured data.

API must allow users to:

- Create and delete user accounts.
- Create, read, update, and delete thoughts.
- Add and remove reactions to thoughts.
- Add and remove friends to a user's friend list.

Test API: use Insomnia or a similar tool to send HTTP requests to the API endpoints and verify that the responses are correct.
#
## Assigned User Story:
```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria:
```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a 
user’s friend list

```
#
## GIF:
### Figure 1. GIF.
#
#### The following animation demonstrates the application functionality:
![]()

## Usage Instructions:

1. Repository: Access the open documentation and run 'npm i' to install the necessary dependencies. Don't forget to update the '.env' file.
2. In the project's root directory, create a file named '.env' and include the following variables.
3. Once the server is up and running, you can utilize a tool like Insomnia to test the API endpoints.
4. With Insomnia, test the routes for categories, products, and tags using the API's GET, POST, PUT, and DELETE methods. Ensure that data creation, updating, and deletion operations are successful within the database by testing the route at http://localhost:3001.

#### Available Endpoints:

Each endpoint must include the necessary data in the request body or URL parameters as specified in the acceptance criteria.

1. GET /api/users - get all users
2. GET /api/users/:userId - get a single user by ID
3. POST /api/users - create a new user
4. PUT /api/users/:userId - update a user by ID
5. DELETE /api/users/:userId - delete a user by ID
6. GET /api/thought - get all thought
7. GET /api/thought/:thoughtId - get a single thought by ID
8. POST /api/thought - create a new thought
9. PUT /api/thought/:thoughtId - update a thought by ID
10. DELETE /api/thought/:thoughtId - delete a thought by ID
11. POST /api/thought/:thoughtId/reactions - add a reaction to a thought
12. DELETE /api/thought/:thoughtId/reactions/:reactionId - remove a reaction from a thought
13. POST /api/users/:userId/friends/:friendId - add a friend to a user's friend list
14. DELETE /api/users/:userId/friends/:friendId - remove a friend from a user's friend list

## Deployed Application Link:
[Deployed Application Link:]()

## GitHub Repository:
[GitHub Repository:]()

## YouTube Walkthrough Video:
[Click Here to Watch]()

## Screenshots:
### Figure 1. Screenshot.
![]() 

## Installation Process:
1. Obtain the repository by either cloning it from GitHub or downloading the zip folder.
2. Open the repository in your preferred source code editor.
3. Launch the integrated terminal within the editor and follow the installation instructions mentioned in the "Built With" section of the provided documentation to ensure that the cloned code functions properly.

## Built With:
- JSON: [JSON](https://www.npmjs.com/package/json)
- Dynamic JavaScript
- Mongoose: [7.0.3](https://www.npmjs.com/package/mongoose)
- Express: [4.18.2](https://www.npmjs.com/package/express)
- Node.js: [16.18.1](https://nodejs.org/en/blog/release/v16.18.1/)
- Insomnia: [by Kong](https://insomnia.rest/)
- MongoDB: [Website](https://www.mongodb.com/)
- Nodemon: [2.0.12](https://www.npmjs.com/package/nodemon/v/2.0.12)
- License Badge: [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0))
- Visual Studio Code: [Website](https://code.visualstudio.com/)

## Code Snippets 
#

```sh

const {connect,connection} = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/friendsDB'

connect(connectionString, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    });

module.exports = connection;


# ABOVE: This code establishes a connection to a MongoDB database using Mongoose, using a provided connection 
# string or a default local connection, and exports the connection object for further use.

```
#


```sh

 addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId || req.params.friendId} },
      { new: true }
    )
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(userData);
      })
      .catch(err => res.status(500).json(err));
  },
  
# This code adds a friend to a user's friends list in the database, based on the provided user ID and friend ID,
# and returns the updated user data, handling error cases appropriately.

```
#


```sh

const { Schema, Types } = require('mongoose');
const { schema } = require('./User');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => new Date(timestamp).toLocaleDateString()
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
}
);
module.exports = reactionSchema;

# This code defines a Mongoose schema for a reaction with specific fields, data types, validation rules, 
# default values, serialization options, and exports it for use in other modules.

```
#


```sh

const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    deleteThought,
    updateThoughtById,
    createReaction,
    deleteReaction,
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getThoughtsById).put(updateThoughtById).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction);


module.exports = router;

# This code sets up an Express router with various routes for handling CRUD operations related to thoughts
# and reactions, using corresponding controller functions, and exports the router for use in other parts of 
# the application.

```
#

## What I Learned:
1. Developed a RESTful API using Node.js and Mongoose.
2. Employed a NoSQL database to efficiently manage unstructured data.
3. Established endpoints to facilitate CRUD operations on data models for users, thoughts, and reactions.
4. Implemented additional endpoints to enable the addition and removal of friends from a user's friend list.
5. Thoroughly tested API endpoints using the Insomnia tool.
6. Proficiently handled HTTP requests and processed JSON-formatted data.
7. Ensured security and confidentiality by utilizing environment variables and .env files for sensitive data storage.
#



## License & Copyright ©
#
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [Open Source Initiative Link](https://opensource.org/licenses/MIT)

#
### Copyright © 2023 Amanda Gray
#
```md

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in
compliance with the License.

You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is 
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

```
#
## Author

Follow me on Github at [AmandaGray](https://github.com/Berkeleycodingmomma)! 
Find me on Linkedin at [AmandaGray](https://www.linkedin.com/in/amanda-gray-121a6a254/)! 

## Acknowledgments

-UC Berkeley Extension, Coding Bootcamp

-Shout out to my Instructor Jerome Chenette and all his TA's: Manuel Nunes, Kyle Vance, and James Harding

-Google Search! Seriously, thank you google search!
#
© 2023 [AmandaGray](https://github.com/Berkeleycodingmomma)! Confidential and Proprietary. All Rights Reserved.
