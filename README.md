# 🛒 Sistema de Gestión - Backend

API REST en **Node.js** + **Express** + **MongoDB** para gestionar usuarios, categorías y productos. Pensado como backend de un sistema de inventario para comercios, con autenticación **JWT**, encriptación de contraseñas con **bcrypt**, rutas protegidas para administración del stock. (El manejo de roles —admin/cliente— está planificado pero aún no implementado).

---

## 📁 Estructura del proyecto (resumen)
```
Sistema_de_gestion-Backend/
├── node_modules/                      # Dependencias instaladas por npm
├── src/
│   ├── assets/                        # Recursos estáticos
│   │   └── images/         
│   ├── config/                        # Configuración general (base de datos, variables, etc.)
│   │   └── config.js            
│   │   └── db.js                 
│   │
│   ├── models/                        # Definición de los esquemas de datos (Mongoose)
│   │   ├── productModel.js            # Modelo de Producto
│   │   ├── categoryModel.js           # Modelo de Categoría
│   │   └── userModel.js               # Modelo de Usuario
│   │
│   ├── services/                      # Capa de lógica y conexión con la base de datos
│   │   ├── productService.js          # Lógica del CRUD de productos
│   │   ├── categoryService.js         # Lógica del CRUD de categorías
│   │   └── userService.js             # Lógica de usuarios (registro, login, etc.)
│   │
│   ├── controllers/                   # Controladores que gestionan las solicitudes HTTP
│   │   ├── productController.js       # Controlador de productos
│   │   ├── categoryController.js      # Controlador de categorías
│   │   └── userController.js          # Controlador de usuarios
│   │
│   ├── routes/                        # Definición de las rutas de la API
│   │   ├── productRoute.js            # Rutas de productos (/products)
│   │   ├── categoryRoute.js           # Rutas de categorías (/categories)
│   │   └── userRoute.js               # Rutas de usuarios (/users)
│   │
│   ├── middleware/                    # Middlewares personalizados
│   │   └── verifyTokenMiddleware.js   # Middleware de autenticación JWT
│   │
│   └── utils/                         # Funciones auxiliares
│       └── verifyToken.js 
│
├── .env                          # Variables de entorno (URI MongoDB, JWT_SECRET, etc.)
├── .env.example                  # Ejemplo de configuración del entorno
├── .gitignore                    # Archivos y carpetas ignorados por Git
├── app.js                        # Punto de entrada principal del servidor Express
├── package.json                  # Dependencias, scripts y metadatos del proyecto
├── package-lock.json             # Versiones exactas de las dependencias instaladas
└── README.md                     # Documentación general del proyecto

```

---

## 🗂 Esquema de la DB (colecciones)

![Esquema de la base de datos](./src/assets/images/Diagrama%20DB%20UTN.png)

---

## 🛠 Tecnologías utilizadas

- **Node.js** (ES Modules)
- **Express**
- **MongoDB** + **Mongoose**
- **JSON Web Tokens (JWT)**
- **bcrypt**
- **Cors**
- **Body-parser**
- **nodemon** (dev)
- **npm-check-updates** (dev)

---

## 🔐 Variables de entorno (ejemplo .env)

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
MONGODB_URI=mongodb://localhost:27017
DB_NAME=tu_basedatos
SECRET=tu_secreto_jwt
PORT=3000
```

Asegurarse que `src/config/config.js` lea estas variables.

---

## ⚙️ Instalación y ejecución (Windows)

1. 🧩 **Requisitos previos**

Asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm**
- **MongoDB**

2. 📁 **Clonar el repositorio**

```
git clone https://github.com/GaitanTomas/Sistema_de_gestion-Backend

```

3. **Entrar al directorio**

```
cd Sistema_de_gestion-Backend

```

4. 📦 **Instalar dependencias**

```
npm install

```

*Dependencias principales:*
- express
- mongoose
- bcrypt
- jsonwebtoken
- cors
- body-parser
- dotenv

*Dependencias de desarrollo:*
- nodemon
- npm-check-updates

5. 🚀 **Ejecutar el proyecto**

🧰 Scripts disponibles:

- *Modo desarrollo*
```
npm run dev

```

- *Modo producción*
```
npm start

```

## 📡 Endpoints disponibles

Usar header en rutas protegidas:
Authorization: Bearer <JWT_TOKEN_AQUI>

Rutas de Usuarios
- POST /users/register — Registro (pública)
- POST /users/login — Login (pública) → devuelve JWT
- GET /users/getUsers — Obtener todos (protegida)
- GET /users/getUsersById/:id — Obtener por ID (protegida)
- PUT /users/updateUser/:id — Actualizar (protegida)
- DELETE /users/deleteUser/:id — Eliminar (protegida)

Rutas de Categorías
- POST /category/create — Crear (protegida)
- GET /category/getCategory — Obtener todas (pública)
- GET /category/getCategoryById/:id — Obtener por ID (pública)
- PUT /category/updateCategory/:id — Actualizar (protegida)
- DELETE /category/deleteCategory/:id — Eliminar (protegida)

Rutas de Productos
- POST /products/create — Crear (protegida)
- GET /products/getProducts — Obtener todas (pública)
- GET /products/getProductById/:id — Obtener por ID (pública)
- GET /products/search?name=<texto> — Buscar por nombre (pública)
- PUT /products/updateProduct/:id — Actualizar (protegida)
- DELETE /products/deleteProduct/:id — Eliminar (protegida)

---

## 🧪 Mocks / Ejemplos de requests (JSON)

MOCKS DE USUARIOS

1) Registro — POST /users/register
```json
{
  "name": "Tomás",
  "lastName": "Gaitán",
  "email": "tomas@mail.com",
  "password": "Abc1234"
}
```

2) Login — POST /users/login
```json
{
  "email": "tomas@mail.com",
  "password": "Abc1234"
}
```
(Copiar el token devuelto y usar en Authorization: Bearer <TOKEN>)

3) Obtener todos (protegida) — GET /users/getUsers  
Header: Authorization: Bearer <JWT_TOKEN_AQUI>

4) Obtener por ID (protegida) — GET /users/getUsersById/<ID_DEL_USUARIO>  
Header: Authorization: Bearer <JWT_TOKEN_AQUI>

5) Actualizar (protegida) — PUT /users/updateUser/<ID_DEL_USUARIO>
```json
{
  "name": "Tomás Actualizado",
  "password": "NewPass123"
}
```

6) Eliminar (protegida) — DELETE /users/deleteUser/<ID_DEL_USUARIO>

---

MOCKS DE CATEGORÍAS

1) Crear (protegida) — POST /category/create
```json
{
  "name": "Electrónica",
  "description": "Productos electrónicos y gadgets"
}
```

2) Obtener todas (pública) — GET /category/getCategory

3) Obtener por ID (pública) — GET /category/getCategoryById/<ID_DE_LA_CATEGORÍA>

4) Actualizar (protegida) — PUT /category/updateCategory/<ID_DE_LA_CATEGORÍA>
```json
{
  "name": "Electrónica y Tecnología",
  "description": "Todos los dispositivos electrónicos y gadgets"
}
```

5) Eliminar (protegida) — DELETE /category/deleteCategory/<ID_DE_LA_CATEGORÍA>

---

MOCKS DE PRODUCTOS

1) Crear (protegida) — POST /products/create
```json
{
  "name": "iPhone 15",
  "price": 150000,
  "category": "<ID_DE_LA_CATEGORIA_ELECTRONICA>",
  "description": "Nuevo iPhone con cámara mejorada",
  "stock": 10
}
```

2) Obtener todas (pública) — GET /products/getProducts

3) Obtener por ID (pública) — GET /products/getProductById/<ID_DEL_PRODUCTO>

4) Buscar por nombre (pública) — GET /products/search?name=iPhone

*Nota: Podés cambiar iPhone por cualquier palabra parcial para probar la búsqueda.*

5) Actualizar (protegida) — PUT /products/updateProduct/<ID_DEL_PRODUCTO>
```json
{
  "price": 155000,
  "stock": 8
}
```

6) Eliminar (protegida) — DELETE /products/deleteProduct/<ID_DEL_PRODUCTO>

---

## ✅ Consejos y notas de desarrollo

- Si ves errores como "Schema hasn't been registered for model 'X'", verificar que los modelos en `src/models/*.js` exporten correctamente `mongoose.model('X', schema)` y que no haya importaciones circulares.
- El middleware de verificación JWT debe ejecutarse y asignar correctamente `req.user` (contiene el id del usuario) antes de crear productos, ya que el Product schema requiere `user`.
- Para probar usar Thunder Client / Postman: incluir header Authorization en rutas protegidas.
- Roles admin/cliente: diseñado para implementarse en el middleware de autenticación y en las rutas protegidas (actualmente no activo).

---

## 👨‍💻 Autor

Tomás Gaitán — Proyecto para Diplomatura UTN Fullstack 2025.

---
## 📜 Licencia
Este proyecto se entrega con fines académicos bajo licencia MIT.