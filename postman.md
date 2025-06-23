# 📋 TESTING RÁPIDO CON POSTMAN

### 1. Verificar servidor (GET)
```
GET http://localhost:5000/
```
**Debe devolver:** Info de la API con endpoints

### 2. Crear categoría (POST)
```
POST http://localhost:5000/api/categories
Content-Type: application/json

{
  "name": "Bebidas",
  "description": "Jugos y smoothies"
}
```

### 3. Registrar usuario (POST)
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@test.com",
  "password": "123456",
  "role": "user"
}
```
**Copiar el token de la respuesta**

### 4. Login (POST)
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "123456"
}
```
**Copiar el token de la respuesta**

### 5. Crear producto con token (POST)
```
POST http://localhost:5000/api/products
Content-Type: application/json
Authorization: Bearer TU_TOKEN_AQUI

{
  "name": "Producto Test",
  "description": "Producto de prueba",
  "category": "ID_DE_CATEGORIA_CREADA",
  "ingredients": ["ingrediente 1", "ingrediente 2"],
  "instructions": ["paso 1", "paso 2"],
  "price": 100
}
```

### 6. Verificar populate (GET)
```
GET http://localhost:5000/api/products
```
**Debe mostrar:** Productos con datos completos de category y createdBy

---

