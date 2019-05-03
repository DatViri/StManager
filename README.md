## Hostname
**Endpoint:** https://stmanager-app.herokuapp.com/
## API
### Handling
* [Success request](#success)
* [Error request](#error)
### Official
* [Authen](#auth)
  * [POST/auth/signin](#signin)
* [Users](#users)
  * [POST /api/users](#post-users)
  * [GET /api/users/](#get-users)
  * [GET /api/users/me](#get-users-me)
  * [GET /api/users/:id](#get-users-id)
  * [PUT /api/users/me](#put-users-me)
* [Courses](#courses)
  * [Get /api/courses](#get-courses)
  * [POST /api/courses](#post-courses)
  * [GET /api/courses/filter](#get-courses-filter)
  * [GET /api/courses/:id](#get-courses-id)
  * [PUT /api/courses/:id](#put-courses-id)
  * [DELETE /api/courses/:id](#delete-courses-id)
* [Enrolls](#enrolls)
  * [POST /api/enrolls/courses/:courseId](#post-enrolls-courses-id)
  * [Get /api/enrolls/:id](#get-enrolls-id)
  * [Get /api/enrolls/users/:userId](#get-courses-enrolled-of-me)
  * [GET /api/enrolls/courses/:courseId](#get-users-enrolled-courses)
* [Payments](#payments)
  * [POST /api/payments](#post-payment)
  * [POST /api/payments/ephemeral_keys](#post-ephemeral_keys)

## <a name="error"></a> Errors handling
Http status code should be checked for at least following error conditions:
* 400 Bad Request 
* 401 Unauthorized
* 403 Forbidden 
* 404 Not Found 
* 405 Method Not Allowed
* 406 Not Acceptable
* 415 Unsupported Media Type
* 500 Internal Server Error
* 503 Service Unavailable

**Error payload:**

| key |	type | description |
| --- | --- | --- |
| status | string | HttpStatus |
| code | int | Server error code |
| description | string | Error Description |

**Sample error:**
```json
{
  "status": 400,
  "code": 14,
  "description": "This username has already been used"
}
```

## <a name="success"></a> Success response

**Success payload:**

| key |	type | description |
| --- | --- | --- |
| status | string | HttpStatus |
| data | data | Response payload data |

**Sample success payload:**
```json
{
  "status": 200,
  "data": {
   "HERE IS THE RESPONSE PAYLOAD"
  }
}
```

## <a name="auth"></a>Authentication
### <a name="signin"></a>POST/auth/signin
Sign in user

Request body:

| key |	type | description |
| --- | --- | --- |
| username | string | |
| password | string | |

Response payload

| key |	type | description |
| --- | --- | --- |
| token | string | Server Token |
| userId | string |  |

Sample request:

```json
{
  "username": "dattruong",
  "password": "123456",
}
```

Sample response:

```json
{
  "token":"HERE IS THE TOKEN",
  "userId": "HERE IS USERID"
}
```

## <a name="users"></a> Users
### <a name="post-users"></a> POST /api/users
Register user

Request body:

| key |	type | description |
| --- | --- | --- |
| username | string | |
| password | string | |
| email | string | Email |
| phoneNumber | string | Must be 10 digits |
| age | string | <2 digits |
| school | string | |

Response payload

| key |	type | description |
| --- | --- | --- |
| token | string | Server Token |
| userId | string |  |

Sample request:

```json
{
  "username": "dattruong",
  "password": "123456",
  "email": "dat@gmail.com",
  "phoneNumber": "1234567890",
  "age": "22",
  "school": "Metropolia"
}
```

Sample response:

```json
{
  "token":"HERE IS THE TOKEN",
  "userId":"HERE IS USERID"
}
```

### <a name="get-users"></a> GET /api/users/
Get a list of user

Response payload data:

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| username | string |  |
| age | string |  |
| school | string |  |
| stripeCustomerId | string |  |

Sample response data:
```json
[
    {
      "_id": "HERE IS THE USERID",
      "username": "test1",
      "age": "HERE IS THE AGE",
      "school": "HERE IS THE SCHOOL NAME",
      "__v": 0,
      "stripeCustomerId": "HERE IS THE STRIPEID"
    },
    {
      "_id": "HERE IS THE USERID",
      "username": "test2",
      "age": "HERE IS THE AGE",
      "school": "HERE IS THE SCHOOL NAME",
      "__v": 0,
      "stripeCustomerId": "HERE IS THE STRIPEID"
    }
]
```

### <a name="get-users-me"></a> GET /api/users/me
Get me

Header payload:

| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Response payload data

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| username | string |  |
| email | string |  |
| phoneNumber | string |  |
| age | string | |
| school | string | |
| stripeCustomerId | string | |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```

Sample response data:

```json
{
  "_id": "HERE IS THE USERID",
  "username": "test1",
  "password": "HERE IS THE ENCODED PASSWORD",
  "email": "HERE IS THE EMAIL",
  "phoneNumber": "HERE IS THE NUMBER",
  "age": "HERE IS THE AGE",
  "school": "HERE IS THE SCHOOL",
  "__v": 0,
  "stripeCustomerId": "HERE IS THE STRIPEID"
}
```

### <a name="get-users-id"></a>  GET /api/users/:id
Get user by id

Response payload

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| username | string |  |
| email | string |  |
| phoneNumber | string |  |
| age | string | |
| school | string | |
| stripeCustomerId | string | |

Sample response data:

```json
{
  "_id": "HERE IS THE USERID",
  "username": "test1",
  "email": "HERE IS THE EMAIL",
  "phoneNumber": "HERE IS THE NUMBER",
  "age": "HERE IS THE AGE",
  "school": "HERE IS THE SCHOOL",
  "__v": 0,
  "stripeCustomerId": "HERE IS THE STRIPEID"
}
```

### <a name="put-users-me"></a> PUT /api/users/me
Edit me

Header payload:

| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Request body:

| key |	type | description |
| --- | --- | --- |
| username | string |  |
| password | string |  |
| email | string | Email |
| phoneNumber | string | Must be 10 digits |
| age | string | < 2 digits |
| school | string | |

Response payload data:

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| username | string |  |
| email | string |  |
| phoneNumber | string |  |
| age | string | |
| school | string | |

Sample request:

```json
{
  "username": "DatTruongHuu",
  "password": "123456",
  "email": "datt@gmail.com",
  "phoneNumber": "123456789",
  "age": "12",
  "school": "Metropolia"
}
```
Sample response data:

```json
{
  "id": "HERE IS THE USERID",
  "username": "DatTruongHuu",
  "password": "HERE IS THE ENCODED PASSWORD",
  "email": "datt@gmail.com",
  "phoneNumber": "123456789",
  "age": "12",
  "school": "Metropolia"
}
```

## <a name="courses"></a> Courses
### <a name="get-courses"></a> Get /api/courses
Get all courses which are available

Response payload data

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| courseName | string |  |
| description | string |  |
| price | int |  |
| category | string |  |
| imgPath | string | 
| time | time |  |

Sample response data:

```json
[
        {
            "_id": "5cc09755223b170004df399f",
            "courseName": "Why do people migrate?",
            "description": "Get an introduction to one of the most misunderstood issues in the modern world: migration.",
            "price": 0,
            "category": "law",
            "imgPath": "testPath",
            "time": "2019-04-24T17:05:25.183Z",
            "__v": 0
        },
        {
            "_id": "5cc0684c37e3790004aac1b7",
            "courseName": "Blockchain in the Energy Sector",
            "description": "Understand how blockchain works, where the technology has come from and why it will empower energy customers like never before.",
            "price": 200,
            "category": "science",
            "imgPath": "testPath",
            "time": "2019-04-24T13:44:44.894Z",
            "__v": 0
        }
    ]
```

### <a name="post-courses"></a> POST /api/courses
Post a new course for sale

Request body:

| key |	type | description |
| --- | --- | --- |
| courseName | string |  |
| description | string |  |
| price | int |  |
| category | string |  Valid values: **business**, **art**, **history**, **health**, **nature**, **languages**, **law**, **literature**, **science** ||
| imgPath | string | 
| time | time |  |

Response payload data

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| courseName | string |  |
| description | string |  |
| price | int |  |
| category | string ||
| imgPath | string | 
| time | time |  |

Sample request:

```json
{
  "courseName": "Physical Theatre: Exploring the Slap",
  "description": "Learn about Meyerhold’s form of physical theatre, biomechanics, and understand and perform ‘The Slap’.",
  "price": 400,
  "category": "art",
  "imgPath": "testPath"
}
```

Sample response data:

```json
{
        "_id": "5cc09f04223b170004df39a1",
        "courseName": "Physical Theatre: Exploring the Slap",
        "description": "Learn about Meyerhold’s form of physical theatre, biomechanics, and understand and perform ‘The Slap’.",
        "price": 400,
        "category": "art",
        "imgPath": "testPath",
        "time": "2019-04-24T17:38:12.100Z",
        "__v": 0
    }
```

### <a name="get-courses-filter"></a> GET /api/courses/filter
Get courses filtered by category or price

Request params:

| key |	type | description |
| --- | --- | --- |
| category | string | Valid values: **business**, **art**, **history**, **health**, **nature**, **languages**, **law**, **literature**, **science** - optional |
| price | int | optional |

Response payload data

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| courseName | string |  |
| description | string |  |
| price | int |  |
| category | string ||
| imgPath | string | 
| time | time |  |

Sample request:

```json
{
  "price": 400
}
```

Sample response data:

```json
[
    {
            "_id": "5cc09f04223b170004df39a1",
            "courseName": "Physical Theatre: Exploring the Slap",
            "description": "Learn about Meyerhold’s form of physical theatre, biomechanics, and understand and perform ‘The Slap’.",
            "price": 400,
            "category": "art",
            "imgPath": "testPath",
            "time": "2019-04-24T17:38:12.100Z",
            "__v": 0
        }
]
```

### <a name="get-courses-id"></a> GET /api/courses/:id
Get one course based on id

Response payload data

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| courseName | string |  |
| description | string |  |
| price | int |  |
| category | string ||
| imgPath | string | 
| time | time |  |

Sample response data:

```json
{
        "_id": "5cc09755223b170004df399f",
        "courseName": "Why do people migrate?",
        "description": "Get an introduction to one of the most misunderstood issues in the modern world: migration.",
        "price": 0,
        "category": "law",
        "imgPath": "testPath",
        "time": "2019-04-24T17:05:25.183Z",
        "__v": 0
    }
```

### <a name="put-items-id"></a> PUT /api/items/:id
Edit course based on id

Request body:

| key |	type | description |
| --- | --- | --- |
| courseName | string |  |
| description | string |  |
| price | int |  |
| category | string |  Valid values: **business**, **art**, **history**, **health**, **nature**, **languages**, **law**, **literature**, **science** ||
| imgPath | string | 
| time | time |  |

Response payload data

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| courseName | string |  |
| description | string |  |
| price | int |  |
| category | string ||
| imgPath | string | 
| time | time |  |


Sample request:

```json
{
  "courseName": "Swift for newbie"
}
```

Sample response data:

```json
{
        "_id": "5cb623c3be29e1425dfe3c47",
        "courseName": "Swift for newbie",
        "description": "good Swift course for newbie ",
        "price": 100,
        "category": "science",
        "imgPath": "testPath",
        "time": "2019-04-16T18:49:39.138Z",
        "__v": 0
    }
```

### <a name="delete-courses-id"></a> DELETE /api/courses/:id
Delete course based on id

Response payload data

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| courseName | string |  |
| description | string |  |
| price | int |  |
| category | string ||
| imgPath | string | 
| time | time |  |


Sample response data:

```json
   {
        "_id": "5cb623c3be29e1425dfe3c47",
        "courseName": "Swift for newbie",
        "description": "good Swift course for newbie ",
        "price": 100,
        "category": "mathematics",
        "imgPath": "testPath",
        "time": "2019-04-16T18:49:39.138Z",
        "__v": 0
    }
```

## <a name="enrolls"></a> Enrolls
### <a name="post-enroll-courses-id"></a> Post /api/enrolls/courses/:courseId
Create an enroll to join course

Header payload:

| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |
| source | string | Stripe card ID  |

Response payload data:

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| courseId | string | courseId |
| userId | string | userId |
| time | time |  |

Sample header:

```json
{
  "authorization":"HERE IS THE TOKEN",
  "source" : "HERE IS THE sourceId"
}
```

Sample response payload data:

```json
{
 "_id": "5cc24236a299cf00047c0756",
"courseId" : "5cc0684c37e3790004aac1b7",
"userId" : "5cc22f2ba299cf00047c0745",
"time" : "2019-04-25T23:26:46.465+00:00",
"__v" : 0
}
```

### <a name="get-enroll-id"></a> Get /api/enrolls/:id
Get an enroll by id

Response payload data:

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| courseId | string | courseId |
| userId | string | userId |
| time | time |  |

Sample response payload data:

```json
{
 "_id": "5cc24236a299cf00047c0756",
"courseId" : "5cc0684c37e3790004aac1b7",
"userId" : "5cc22f2ba299cf00047c0745",
"time" : "2019-04-25T23:26:46.465+00:00",
"__v" : 0
}
```
### <a name="delete-enroll-id"></a> Delete /api/enrolls/:id
Delete an enroll by id

Response payload data:

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| courseId | string | courseId |
| userId | string | userId |
| time | time |  |

Sample response payload data:

```json
{
 "_id": "5cc24236a299cf00047c0756",
"courseId" : "5cc0684c37e3790004aac1b7",
"userId" : "5cc22f2ba299cf00047c0745",
"time" : "2019-04-25T23:26:46.465+00:00",
"__v" : 0
}
```

### <a name="get-courses-enrolled-me"></a> GET /api/enrolls/users/:userId
Get courses enrolled by me

Response payload data:

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| courseName | string |  |
| description | string |  |
| price | int |  |
| category | string ||
| imgPath | string | 
| time | time |  |

Sample response payload data:

```json
[
        {
            "_id": "5cc0684c37e3790004aac1b7",
            "courseName": "Blockchain in the Energy Sector",
            "description": "Understand how blockchain works, where the technology has come from and why it will empower energy customers like never before.",
            "price": 200,
            "category": "science",
            "imgPath": "testPath",
            "time": "2019-04-24T13:44:44.894Z",
            "__v": 0
        },
        {
            "_id": "5cc09f04223b170004df39a1",
            "courseName": "Physical Theatre: Exploring the Slap",
            "description": "Learn about Meyerhold’s form of physical theatre, biomechanics, and understand and perform ‘The Slap’.",
            "price": 400,
            "category": "art",
            "imgPath": "testPath",
            "time": "2019-04-24T17:38:12.100Z",
            "__v": 0
        }
    ]
```

### <a name="get-users-enrolled-course"></a> GET /api/enrolls/courses/:courseId
Get users enrolled courses

Response payload data:

| key |	type | description |
| --- | --- | --- |
| id | string |  |
| age | string |  |
| email | string |  |
| phoneNumber | int |  |
| school | string ||
| username | string | 
| stripeCustomerId | string |  |

Sample response payload data:

```json
[
        {
            "_id": "5cc22f2ba299cf00047c0745",
            "age": "22",
            "email": "datt@gmail.com",
            "phoneNumber": 1234567811,
            "school": "Metropolia",
            "username": "dat123",
            "__v": 0,
            "stripeCustomerId": "HERE IS STRIPE ID"
        }
    ]
```
