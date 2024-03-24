# Contact API SPEC

## create contact

ednpoint: POST /api/contacts

request header:
- X-API-TOKEN: token

request body:
```json
{
    "first_name": "User",
    "last_name": "Satu",
    "email": "user@example.com",
    "phone": 123141412,
}
```

response body (success):
```json
{
    "data": {
        "first_name": "User",
        "last_name": "Satu",
        "email": "user@example.com",
        "phone": 123141412,
    }
}
```

response body (failed):
```json
{
    "data": {
        "errrors": "first_name must not be blank...."
    }
}
```

## get contact

ednpoint: GET /api/contacts/:Id

request header:
- X-API-TOKEN: token

response body (success):
```json
{
    "data": {
        "first_name": "User",
        "last_name": "Satu",
        "email": "user@example.com",
        "phone": 123141412,
    }
}
```

response body (failed):
```json
{
    "data": {
        "errrors": "contact is not found...."
    }
}
```

## update contact

endpoint: PUT /api/contacts/:id

request header:
- X-API-TOKEN: token

request body:
```json
{
    "first_name": "User",
    "last_name": "Satu",
    "email": "user@example.com",
    "phone": 123141412,
}
```

response body (success):
```json
{
    "data": {
        "first_name": "User",
        "last_name": "Satu",
        "email": "user@example.com",
        "phone": 123141412,
    }
}
```

response body (failed):
```json
{
    "data": {
        "errrors": "first_name must not be blank...."
    }
}
```

## remove contact

endpoint: PUT /api/contacts/:id

request header:
- X-API-TOKEN: token

response body (success):
```json
{
    "data": "OK"
}
```

response body (failed):
```json
{
    "data": {
        "errrors": "contact is not found"
    }
}
```

## search contact

endpoint: GET /api/contacts

request header:
- X-API-TOKEN: token

query header:
- name: string, contact firt_name or contact last_name, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

response body (success):
```json
{
    "data": [
        {
        "first_name": "User",
        "last_name": "Satu",
        "email": "user@example.com",
        "phone": 123141412,
        },
        {
        "first_name": "User",
        "last_name": "Satu",
        "email": "user@example.com",
        "phone": 123141412,
        }
    ],
    "paging": {
        "current_page": 1,
        "total_page": 10,
        "size": 10
    }
}
```

response body (failed):
```json
{
    "data": {
        "errrors": "Unauthorized...."
    }
}
```