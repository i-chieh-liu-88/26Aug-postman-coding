# Live Coding: Error Handling and CRUD

## Testing Endpoints

```bash
curl http://localhost:3000/users
curl http://localhost:3000/users/1
curl http://localhost:3000/users/99
curl.exe -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"Grace","email":"grace@example.com"}'
curl.exe -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name":"Ada Lovelace","email":"ada@example.com"}'
curl.exe -X PATCH http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name":"Ada"}'
curl -X DELETE http://localhost:3000/users/2
curl http://localhost:3000/abc
```

Press `Ctrl+C` to stop the server.

## Muster String:

mongodb+srv://USER:USERPASSWORD@BLABLABLA.mongodb.net/DBNAME
mongodb+srv://<i-chieh>:<Jackie8177919>@cluster0.9d6psub.mongodb.net/usersApi
Jackie8177919
