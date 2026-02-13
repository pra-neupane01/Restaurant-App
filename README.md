# 🍽️ Restaurant Management Backend API
### Enterprise-Level RESTful API
**Author: Pralad Neupane**

---

## 🚀 Project Overview

The Restaurant Management Backend API is a scalable and production-structured RESTful backend built using **Node.js**, **Express.js**, and **PostgreSQL**.

It provides secure authentication and complete CRUD operations for:

- User Management
- Restaurant Management
- Category Management
- Food Management
- Order Processing
- Role-Based Access Control (Admin/User)

This project follows clean architecture principles and is structured for real-world backend development.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT (Authentication)
- bcrypt (Password Hashing)
- REST API Architecture
- Postman (Testing)

---

## 📁 Project Structure

```
config/
  └── db.js

controllers/
  ├── authController.js
  ├── userController.js
  ├── restaurantController.js
  ├── categoryController.js
  ├── foodController.js
  ├── orderController.js
  └── testController.js

middlewares/
  ├── authMiddleware.js
  └── adminMiddleware.js

models/
  ├── userSchema.js
  ├── restaurantModel.js
  ├── categoryModel.js
  ├── foodModel.js
  └── orderModel.js

routes/
  ├── authRoute.js
  ├── userRoute.js
  ├── restaurantRoute.js
  ├── categoryRoute.js
  ├── foodRoute.js
  ├── orderRoute.js
  └── testRoute.js

server.js
package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/pra-neupane01/restaurant-backend.git
cd restaurant-backend
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```
PORT=4849
DB_HOST=localhost
DB_PORT=5432
DB_NAME=Food-App
DB_USER=postgres
DB_PASSWORD=your password
JWT_SECRET=your secret key
```

---

### 4️⃣ Run Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:4849
```

---

# 🔐 Authentication

This API uses JWT-based authentication.

After login, include token in request headers:

```
Authorization: Bearer <your_token>
```

Protected routes require authentication middleware.  
Admin routes require both authentication and admin middleware.

---

# 📡 API Documentation

---

## 🧑 AUTH ROUTES

### 🔹 Register User
**POST** `/api/v1/auth/register`

#### Request Body
```json
{
  "name": "Pralad",
  "email": "pralad@gmail.com",
  "password": "123456"
}
```

#### Response
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

### 🔹 Login User
**POST** `/api/v1/auth/login`

#### Request Body
```json
{
  "email": "pralad@gmail.com",
  "password": "123456"
}
```

#### Response
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "123",
    "name": "Pralad",
    "email": "pralad@gmail.com",
    "role": "user"
  }
}
```

---

## 👤 USER ROUTES

### 🔹 Get Profile  
**GET** `/api/v1/user/profile`  
🔐 Requires Authentication

---

### 🔹 Update Profile  
**PUT** `/api/v1/user/update`

---

### 🔹 Delete User  
**DELETE** `/api/v1/user/delete`

---

## 🏢 RESTAURANT ROUTES

### 🔹 Create Restaurant (Admin)
**POST** `/api/v1/restaurant/create`

```json
{
  "title": "Food Palace",
  "image": "image_url",
  "rating": 4.5,
  "description": "Best food in town"
}
```

---

### 🔹 Get All Restaurants  
**GET** `/api/v1/restaurant/getAll`

---

### 🔹 Get Restaurant By ID  
**GET** `/api/v1/restaurant/get/:id`

---

### 🔹 Delete Restaurant (Admin)  
**DELETE** `/api/v1/restaurant/delete/:id`

---

## 📂 CATEGORY ROUTES

### 🔹 Create Category (Admin)  
**POST** `/api/v1/category/create`

```json
{
  "title": "Fast Food"
}
```

---

### 🔹 Get All Categories  
**GET** `/api/v1/category/getAll`

---

### 🔹 Update Category (Admin)  
**PUT** `/api/v1/category/update/:id`

---

### 🔹 Delete Category (Admin)  
**DELETE** `/api/v1/category/delete/:id`

---

## 🍔 FOOD ROUTES

### 🔹 Create Food (Admin)  
**POST** `/api/v1/food/create`

```json
{
  "title": "Burger",
  "price": 250,
  "category": "category_id",
  "restaurant": "restaurant_id"
}
```

---

### 🔹 Get All Food  
**GET** `/api/v1/food/getAll`

---

### 🔹 Get Food By Restaurant  
**GET** `/api/v1/food/restaurant/:id`

---

### 🔹 Update Food  
**PUT** `/api/v1/food/update/:id`

---

### 🔹 Delete Food  
**DELETE** `/api/v1/food/delete/:id`

---

## 📦 ORDER ROUTES

### 🔹 Place Order  
**POST** `/api/v1/order/create`

```json
{
  "foods": ["food_id_1", "food_id_2"],
  "payment": "COD"
}
```

---

### 🔹 Update Order Status (Admin)  
**PUT** `/api/v1/order/status/:id`

```json
{
  "status": "Delivered"
}
```

---

# 🛡 Role-Based Access Control

| Role  | Permissions |
|-------|------------|
| User  | View food, place orders |
| Admin | Manage restaurants, categories, food, update order status |

---

# 🧪 API Testing

All endpoints were tested using **Postman**.

You can include a screenshot like this:

```
assets/postman-testing.png
```

Then reference it:

```
![API Testing Screenshot](assets/postman-testing.png)
```

---

# 🧱 Standard Error Format

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

# 🏆 Project Highlights

- Clean MVC Architecture
- JWT Authentication
- Admin Middleware Protection
- Modular Route Structure
- PostgreSQL Integration
- Production-Ready Code Organization
- Scalable Backend Design

---

# 👨‍💻 Author

**Pralad Neupane**  
Backend Developer  
Restaurant Management API Project
