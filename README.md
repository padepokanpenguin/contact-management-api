# Setup Project

1. create .env file
```json
DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/contact-management"
```
2. install dependency and generate database model
```shell
npm install

npx prisma migrate dev

npx prisma generate
```
3. compile project to javascript and run it
```shell
npm run build

npm start
```