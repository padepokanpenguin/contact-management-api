# User

## register user
endpoint: POST /api/users

request body:

```json
{
    "username": "user",
    "password": "password",
    "name": "User 1"
}
```

response body (success):
```json
{
    "data": {
        "username": "user",
        "name": "User 1"
    }
}
```

response body (failed):
```json
{
    "errors": "username must not blank...."
}
```

## login user

endpoint: POST /api/users/login

request body:

```json
{
    "username": "user",
    "password": "password"
}
```

response body (success):
```json
{
    "data": {
        "username": "user",
        "name": "User 1",
        "token": "uuid"
    }
}
```

response body (failed):
```json
{
    "errors": "username or password wrong...."
} 
```


## get user

endpoint: GET /api/users/current

request header:
- X-API-TOKEN: token

response body (success):
```json
{
    "data": {
        "username": "user",
        "name": "User 1"
    }
}
```

response body (failed):
```json
{
    "errors": "Unauthorized...."
}
```

## update user

endpoint: PATCH /api/users/current

request header:
- X-API-TOKEN: token

request body:

```json
{
    "password": "password", // not required
    "name": "User 1" // not required
}
```

response body (success):
```json
{
    "data": {
        "username": "user",
        "name": "User 1"
    }
}
```

response body (failed):
```json
{
    "errors": "Unauthorized...."
}
```

# logout user

endpoint: DELETE /api/users/current

request body:

response body (success):
```json
{
    "data": "OK"
}
```

response body (failed):
```json
{
    "errors": "Unauthorized...."
}
```