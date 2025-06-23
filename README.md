# 🚀 Proyecto CRUD MongoDB - API REST Completa
*Estudiante:* Milagros Candela Martinez Sanchez  
*Fecha de Entrega:* 23/06/2025

---

## 📋 CUMPLIMIENTO DE REQUISITOS

### ✅ REQUISITOS OBLIGATORIOS CUMPLIDOS

| Requisito | Estado | Ubicación | Observaciones |
|-----------|---------|-----------|---------------|
| *1. Modelos con Mongoose* | ✅ | src/models/ | Product, User, Category |
| *2. Controladores CRUD* | ✅ | src/controllers/ | Lógica separada de rutas |
| *3. Rutas configuradas* | ✅ | src/routes/ | Una por entidad |
| *4. Populate products-categories* | ✅ | productController.js | Relaciones funcionando |
| *5. Conexión MongoDB* | ✅ | src/db/conexion.js | Con manejo de errores |
| *6. Variables .env* | ✅ | .env | MONGO_URI, PORT, JWT_SECRET |
| *7. Estructura sugerida* | ✅ | Todo el proyecto | Carpeta src/ implementada |

### ✅ REQUISITOS OPCIONALES IMPLEMENTADOS

| Requisito Opcional | Estado | Ubicación | Observaciones |
|-------------------|---------|-----------|---------------|
| *8. Encriptación bcrypt* | ✅ | userModel.js | Automática en pre('save') |
| *9. Login con JWT* | ✅ | authController.js | Tokens con expiración 24h |
| *10. Rutas protegidas* | ✅ | Todas las rutas | Middleware verifyToken |

---

## 🏗️ ARQUITECTURA DEL PROYECTO

### Estructura de Archivos

proyecto-crud-mongodb/
├── 📄 app.js                          # Servidor principal
├── 📄 .env                            # Variables de entorno
├── 📄 package.json                    # Dependencias
├── 📁 src/
│   ├── 📁 models/                      # Esquemas de Mongoose
│   │   ├── productModel.js             # Modelo Producto
│   │   ├── userModel.js                # Modelo Usuario (con bcrypt)
│   │   └── categoryModel.js            # Modelo Categoría
│   ├── 📁 controllers/                 # Lógica de negocio
│   │   ├── productController.js        # CRUD Productos
│   │   ├── userController.js           # CRUD Usuarios
│   │   ├── categoryController.js       # CRUD Categorías
│   │   └── authController.js           # Autenticación JWT
│   ├── 📁 routes/                      # Definición de endpoints
│   │   ├── productRoute.js             # Rutas /api/products
│   │   ├── userRoute.js                # Rutas /api/users
│   │   ├── categoryRoute.js            # Rutas /api/categories
│   │   └── authRoute.js                # Rutas /api/auth
│   ├── 📁 middleware/                  # Middlewares personalizados
│   │   └── verifyToken.js              # Verificación JWT
│   └── 📁 db/                          # Configuración base de datos
│       └── conexion.js                 # Conexión MongoDB
└── 📁 scripts/
    └── seedData.js                     # Datos de prueba


# Modo desarrollo
npm run dev

# Modo producción
npm start


**El servidor estará disponible en:** `http://localhost:5000`

---

## 📊 MODELOS DE DATOS

### 🍽️ Product Model
javascript
{
  name: String (requerido),
  description: String,
  category: ObjectId (ref: Category, requerido),
  ingredients: [String],
  instructions: [String],
  cookingTime: String,
  calories: String,
  price: Number,
  color: String,
  createdBy: ObjectId (ref: User),
  timestamps: true
}


### 📂 Category Model
javascript
{
  name: String (requerido, único),
  description: String,
  timestamps: true
}


### 👤 User Model
javascript
{
  name: String (requerido),
  email: String (requerido, único),
  password: String (requerido, encriptado),
  role: String (enum: ['user', 'admin'], default: 'user'),
  timestamps: true
}


---

## 🔗 ENDPOINTS DE LA API

### 🔐 Autenticación (`/api/auth`)
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Registrar usuario | No |
| POST | `/login` | Iniciar sesión | No |

### 📂 Categorías (`/api/categories`)
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/` | Listar categorías | No |
| GET | `/:id` | Obtener categoría | No |
| POST | `/` | Crear categoría | Sí |
| PUT | `/:id` | Actualizar categoría | Sí |
| DELETE | `/:id` | Eliminar categoría | Sí |

### 🍽️ Productos (`/api/products`)
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/` | Listar productos | No |
| GET | `/:id` | Obtener producto | No |
| POST | `/` | Crear producto | Sí |
| PUT | `/:id` | Actualizar producto | Sí |
| DELETE | `/:id` | Eliminar producto | Sí |

### 👥 Usuarios (`/api/users`)
| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| GET | `/` | Listar usuarios | Sí | Admin |
| GET | `/:id` | Obtener usuario | Sí | - |
| POST | `/` | Crear usuario | No | - |
| PUT | `/:id` | Actualizar usuario | Sí | - |
| DELETE | `/:id` | Eliminar usuario | Sí | Admin |

---

## 🧪 TESTING Y VALIDACIÓN

### Credenciales de Prueba
Después de ejecutar `npm run seed`:
- **Admin:** `admin@test.com` / `123456`
- **User:** `user@test.com` / `123456`

### Ejemplos de Testing

#### 1. Login y obtención de token
bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "123456"
}


#### 2. Crear categoría (requiere token)
bash
POST http://localhost:5000/api/categories
Content-Type: application/json
Authorization: Bearer [TOKEN]

{
  "name": "Bebidas",
  "description": "Jugos y smoothies"
}


#### 3. Crear producto con relación (requiere token)
bash
POST http://localhost:5000/api/products
Content-Type: application/json
Authorization: Bearer [TOKEN]

{
  "name": "Smoothie Verde",
  "description": "Smoothie energizante",
  "category": "[ID_DE_CATEGORIA]",
  "ingredients": ["espinacas", "banana"],
  "instructions": ["Licuar ingredientes"],
  "price": 180
}


#### 4. Verificar populate
bash
GET http://localhost:5000/api/products
```
*Resultado esperado:* Productos con datos completos de category y createdBy

---

### Para Verificar Funcionamiento
1. npm run seed - Carga datos de prueba
2. npm run dev - Inicia servidor
3. Probar login con credenciales de prueba
4. Verificar populate en GET /api/products
5. Revisar contraseñas encriptadas en MongoDB

---