# Address API SPEC

## Create address

endpoint: POST /api/contacts/:id/addresses

request header:
- X-API-TOKEN: token

request body:
```json
{
    "street": "Jalan sesuatu",
    "city": "Kota A",
    "province": "Province A",
    "country": "Wakanda",
    "postal_code": "12345"
}   
```

response body (success)
```json
{
    "data": {
        "street": "Jalan sesuatu",
        "city": "Kota A",
        "province": "Province A",
        "country": "Wakanda",
        "postal_code": "12345"
    }
}   
```

response body (failed)

```json
{
    "errors": "Postal code is required"
}   
```

## Get Address

endpoint: GET /api/addresses/:id

request header:
- X-API-TOKEN: token

response body (success)
```json
{
    "data": {
        "street": "Jalan sesuatu",
        "city": "Kota A",
        "province": "Province A",
        "country": "Wakanda",
        "postal_code": "12345"
    }
}   
```

response body (failed)

```json
{
    "errors": "Address is not found"
}   
``

## update adress

endpoint: PUT /api/addresses/:id

request header:
- X-API-TOKEN: token

request body:
```json
{
    "street": "Jalan sesuatu",
    "city": "Kota A",
    "province": "Province A",
    "country": "Wakanda",
    "postal_code": "12345"
}   
```

response body (success)
```json
{
    "data": {
        "street": "Jalan sesuatu",
        "city": "Kota A",
        "province": "Province A",
        "country": "Wakanda",
        "postal_code": "12345"
    }
}   
```

response body (failed)

```json
{
    "errors": "Postal code is required"
}   
```

## remove address

endpoint: DELETE /api/addresses/:id

request header:
- X-API-TOKEN: token

response body (success)
```json
{
    "data": "OK"
}   
```

response body (failed)

```json
{
    "errors": "Adress is not found"
}   
```

## list

endpoint: GET /api/contacts/:id/addresses

request header:
- X-API-TOKEN: token

request body:
```json
{
    "street": "Jalan sesuatu",
    "city": "Kota A",
    "province": "Province A",
    "country": "Wakanda",
    "postal_code": "12345"
}   
```

response body (success)
```json
{
    "data": [
        {
        "street": "Jalan sesuatu",
        "city": "Kota A",
        "province": "Province A",
        "country": "Wakanda",
        "postal_code": "12345"
        },
        {
        "street": "Jalan sesuatu",
        "city": "Kota A",
        "province": "Province A",
        "country": "Wakanda",
        "postal_code": "12345"
        },
    ]
}   
```

response body (failed)

```json
{
    "errors": "Contact was not found"
}   
```