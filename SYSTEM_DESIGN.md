# 🛒 E-Commerce Store — System Design Document

> **Project**: CodeAlpha E-Commerce Store  
> **Stack**: React 19 + Vite (Client) · Node.js / Express 5 (Server) · MongoDB Atlas (Database) · Cloudinary (Media)  
> **Author**: Junaid  
> **Date**: August 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [High-Level Design (HLD)](#2-high-level-design-hld)
   - 2.1 [System Architecture](#21-system-architecture)
   - 2.2 [Technology Stack](#22-technology-stack)
   - 2.3 [Client-Server Interaction Flow](#23-client-server-interaction-flow)
   - 2.4 [Deployment Topology](#24-deployment-topology)
3. [Low-Level Design (LLD)](#3-low-level-design-lld)
   - 3.1 [Backend Architecture](#31-backend-architecture)
   - 3.2 [Frontend Architecture](#32-frontend-architecture)
   - 3.3 [Database Schema](#33-database-schema)
   - 3.4 [API Design](#34-api-design)
   - 3.5 [Authentication & Authorization Flow](#35-authentication--authorization-flow)
   - 3.6 [Cart State Management](#36-cart-state-management)
   - 3.7 [Component Tree](#37-component-tree)
   - 3.8 [Data Flow Diagrams](#38-data-flow-diagrams)
4. [Directory Structure](#4-directory-structure)
5. [Security Design](#5-security-design)
6. [Error Handling Strategy](#6-error-handling-strategy)

---

## 1. Project Overview

A full-stack e-commerce web application that enables users to browse products, manage a shopping cart, and proceed to checkout. Admins can create and manage product listings with variant support (color, size, images). The application follows a **feature-based architecture** on the frontend and a **modular MVC pattern** on the backend.

### Core Features

| Feature | Description |
|---|---|
| 🔐 Authentication | JWT-based signup/signin with bcrypt password hashing |
| 🛍️ Product Catalog | Browse products with featured images, variants, size & stock |
| 🛒 Cart Management | Add, update, remove items; synced with backend for authenticated users |
| 💳 Checkout | Cart review with price summary |
| 🖼️ Image Hosting | Cloudinary integration for product image storage |
| 📦 Data Seeding | Script-based database seed for product data |

---

## 2. High-Level Design (HLD)

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                │
│                                                                     │
│   ┌───────────────────────────────────────────────────────────┐    │
│   │          React 19 SPA  (Vite build tool)                  │    │
│   │                                                           │    │
│   │   ┌─────────┐  ┌──────────┐  ┌───────────┐  ┌────────┐  │    │
│   │   │  Home   │  │ Product  │  │ Checkout  │  │  Auth  │  │    │
│   │   │  Page   │  │  Detail  │  │   Page    │  │  Page  │  │    │
│   │   └────┬────┘  └────┬─────┘  └─────┬─────┘  └───┬────┘  │    │
│   │        │            │              │             │        │    │
│   │   ┌────▼────────────▼──────────────▼─────────────▼─────┐ │    │
│   │   │        Global Context Providers                     │ │    │
│   │   │   AuthContext · CartContext · AppContext            │ │    │
│   │   └──────────────────────┬──────────────────────────────┘ │    │
│   │                          │                                 │    │
│   │   ┌───────────────────────▼────────────────────────────┐  │    │
│   │   │            Axios HTTP Service Layer                 │  │    │
│   │   │             (services/apiCalls.js)                  │  │    │
│   │   └───────────────────────┬────────────────────────────┘  │    │
│   └───────────────────────────│────────────────────────────────┘   │
└───────────────────────────────│─────────────────────────────────────┘
                                │  HTTP/REST (JSON)
                                │  Authorization: Bearer <JWT>
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        SERVER LAYER                                 │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │           Express.js REST API  (port 5000)                  │  │
│   │                                                             │  │
│   │  ┌──────────────┐  ┌─────────────┐  ┌──────────────────┐   │  │
│   │  │  /api/auth   │  │/api/products│  │   /api/cart      │   │  │
│   │  │  signup      │  │  GET /      │  │  GET /           │   │  │
│   │  │  signin      │  │  GET /:id   │  │  POST /add       │   │  │
│   │  └──────┬───────┘  │  POST /     │  │  PUT /           │   │  │
│   │         │          └──────┬──────┘  │  DELETE /remove  │   │  │
│   │         │                 │         └──────┬───────────┘   │  │
│   │  ┌──────▼─────────────────▼────────────────▼────────────┐  │  │
│   │  │              Middleware Pipeline                       │  │  │
│   │  │   CORS · JSON Parser · Auth (verifyUser) · Error      │  │  │
│   │  └──────────────────────────┬─────────────────────────── ┘  │  │
│   │                             │                                 │  │
│   │  ┌──────────────────────────▼──────────────────────────────┐ │  │
│   │  │              Mongoose ODM / Business Logic               │ │  │
│   │  │      User · Product · Cart  models                       │ │  │
│   │  └──────────────────────────┬──────────────────────────────┘ │  │
│   └─────────────────────────────│────────────────────────────────┘  │
└─────────────────────────────────│─────────────────────────────────────┘
                                  │  mongoose connection
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                    │
│                                                                     │
│   ┌───────────────────────┐        ┌───────────────────────────┐   │
│   │    MongoDB Atlas       │        │       Cloudinary CDN      │   │
│   │  (Cloud Database)      │        │   (Image Storage/Hosting) │   │
│   │                        │        │                           │   │
│   │  Collections:          │        │  Folder: e-commerce_DEV   │   │
│   │  · users               │        │  Formats: jpg/png/webp    │   │
│   │  · products            │        │                           │   │
│   │  · carts               │        └───────────────────────────┘   │
│   └───────────────────────┘                                        │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 2.2 Technology Stack

#### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.6 | UI framework |
| React Router DOM | 7.17.0 | Client-side routing |
| Vite | 8.0.12 | Build tool & dev server |
| Axios | 1.17.0 | HTTP client |
| Vanilla CSS | — | Styling |

#### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | LTS | JavaScript runtime |
| Express | 5.2.1 | HTTP server framework |
| Mongoose | 9.7.0 | MongoDB ODM |
| bcrypt | 6.0.0 | Password hashing |
| jsonwebtoken | 9.0.3 | JWT generation & verification |
| Joi | 18.2.1 | Request body validation |
| Cloudinary | 2.10.0 | Image hosting SDK |
| multer-storage-cloudinary | 2.2.1 | Multipart upload to Cloudinary |
| dotenv | 17.4.2 | Environment variable management |

#### Infrastructure

| Service | Purpose |
|---|---|
| MongoDB Atlas | Managed cloud database |
| Cloudinary | Media storage & CDN delivery |
| Vercel | Frontend hosting (via `vercel.json`) |
| nodemon | Dev-time server auto-restart |

---

### 2.3 Client-Server Interaction Flow

```
User Action
    │
    ▼
React Component
    │
    ├── (reads state) ──► Context (AuthContext / CartContext)
    │
    └── (needs data) ──► apiCalls.js (Axios)
                               │
                               │  HTTP Request
                               │  GET/POST/PUT/DELETE
                               │  + Bearer Token (if auth required)
                               ▼
                        Express Router
                               │
                        Validation Middleware (Joi)
                               │
                        Auth Middleware (verifyUser) — if protected
                               │
                        Controller Function
                               │
                        Mongoose Model (DB query)
                               │
                        MongoDB Atlas
                               │
                        JSON Response (ApiResponse wrapper)
                               │
                               ▼
                        React State Update
                               │
                               ▼
                           Re-render
```

---

### 2.4 Deployment Topology

```
┌───────────────────────────────────────────────────────┐
│                  PRODUCTION TOPOLOGY                  │
│                                                       │
│  ┌─────────────────┐         ┌──────────────────────┐ │
│  │  Vercel Edge     │         │  Node.js Server      │ │
│  │  (Client SPA)    │──REST──►│  (Express API)       │ │
│  │                  │         │  port: 5000          │ │
│  │  dist/index.html │         └──────────┬───────────┘ │
│  │  vercel.json:    │                    │             │
│  │  rewrites → /    │         ┌──────────▼───────────┐ │
│  └─────────────────┘         │  MongoDB Atlas        │ │
│                               │  (Cloud Cluster)     │ │
│                               └──────────────────────┘ │
│                                                       │
│                               ┌──────────────────────┐ │
│                               │  Cloudinary CDN      │ │
│                               │  (Image Delivery)    │ │
│                               └──────────────────────┘ │
└───────────────────────────────────────────────────────┘
```

> **`vercel.json`** configures SPA fallback rewrites so all paths route to `index.html`, enabling React Router to handle navigation client-side.

---

## 3. Low-Level Design (LLD)

### 3.1 Backend Architecture

The backend follows the **Modular MVC pattern**. Each domain (auth, products, cart) is encapsulated in its own module with its own routes, controller, model, and validation.

```
server/src/
│
├── server.js               ← Entry point (connects DB, starts listener)
├── app.js                  ← Express app setup (middleware + route mounts)
│
├── config/
│   ├── db.config.js        ← Mongoose Atlas connection
│   ├── env.config.js       ← Environment variables (PORT, MONGO_URI, JWT_SECRET)
│   └── cloudinary.config.js← Cloudinary SDK + CloudinaryStorage setup
│
├── middleware/
│   ├── auth.middleware.js  ← verifyUser: extracts + verifies JWT, attaches req.user
│   └── error.middleware.js ← notFoundHandler + global errorHandler
│
├── modules/
│   ├── auth/
│   │   ├── auth.routes.js     ← POST /signup, POST /signin
│   │   ├── auth.controller.js ← signup(), signin() handlers
│   │   └── auth.validation.js ← Joi schemas for signup/signin
│   │
│   ├── products/
│   │   ├── product.routes.js     ← GET /, GET /:id, POST /
│   │   ├── product.controller.js ← fetchProduct(), fetchProductById(), createProduct()
│   │   ├── product.model.js      ← Mongoose schema (variants, sizes, stock, images)
│   │   └── product.validation.js ← Joi schema for product creation
│   │
│   ├── cart/
│   │   ├── cart.routes.js     ← GET /, POST /add, PUT /, DELETE /remove (protected)
│   │   ├── cart.controller.js ← fetchCart(), addToCart(), updateCart(), deleteCartItem()
│   │   └── cart.model.js      ← Mongoose schema (user ref, items array)
│   │
│   └── user/
│       └── user.model.js     ← Mongoose schema (name, email, password, role, addresses)
│
├── utils/
│   ├── ApiResponse.js  ← Standardized response wrapper { statusCode, message, data }
│   ├── ApiError.js     ← Custom error class with statusCode
│   ├── jwt.js          ← generateToken() + verifyToken() using jsonwebtoken
│   └── wrapAsync.js    ← Async error boundary – wraps async controllers
│
└── scripts/
    └── seed.js         ← Populates MongoDB with initial product data
```

#### Request Lifecycle

```
Incoming Request
       │
       ▼
   CORS Middleware
       │
       ▼
   JSON / URL-encoded Body Parser
       │
       ▼
   Route Matcher (express Router)
       │
       ├─ Validation Middleware (Joi) ──► 400 on failure
       │
       ├─ Auth Middleware (verifyUser) ──► 401 on failure (protected routes)
       │
       ▼
   wrapAsync(controller)
       │
       ├─ Business Logic (controller)
       │        │
       │        ▼
       │   Mongoose Model (DB operation)
       │        │
       │        ▼
       │   new ApiResponse(statusCode, message, data)
       │        │
       │        ▼
       │   res.json(response)
       │
       └─ on Error → ApiError → errorHandler middleware
```

---

### 3.2 Frontend Architecture

The frontend follows a **Feature-Sliced / Feature-Based Architecture**.

```
client/src/
│
├── main.jsx          ← App entry: BrowserRouter, Context Providers
├── App.jsx           ← Route outlet
│
├── routes/
│   └── MainRoute.jsx ← Route definitions (/, /product/:id, /checkout/cart, /account/auth)
│
├── layouts/
│   └── MainLayout.jsx← Shared layout wrapper (Navbar + <Outlet> + Footer)
│
├── context/          ← Global state (React Context API)
│   ├── AuthContext.jsx  ← token, user, login(), logout(), isAuthenticated
│   ├── CartContext.jsx  ← cartItems, cartCount, cartTotal, CRUD operations
│   └── AppContext.jsx   ← App-level UI state (toasts, etc.)
│
├── hooks/
│   └── index.js      ← Re-exports: useAuth, useCart, useAppContext, useUI
│
├── services/
│   └── apiCalls.js   ← All Axios calls: auth, products, cart endpoints
│
├── components/       ← Shared / global UI components
│   ├── Navbar.jsx / .css
│   ├── Footer.jsx / .css
│   └── Toast.jsx / .css
│
├── features/         ← Domain-specific pages + components
│   ├── home/
│   │   ├── pages/Home.jsx
│   │   └── components/
│   │       ├── Hero.jsx / .css         ← Hero banner with animations
│   │       ├── ProductList.jsx / .css  ← Grid of product cards
│   │       ├── ProductCard.jsx / .css  ← Individual product tile
│   │       ├── CategoryCard.jsx / .css ← Category navigation card
│   │       └── catagores.jsx / .css    ← Category section
│   │
│   ├── ProductDetail/
│   │   ├── pages/ProductDetail.jsx
│   │   └── components/                ← Variant picker, size selector, add-to-cart
│   │
│   ├── Checkout/
│   │   ├── pages/Checkout.jsx         ← Cart review + price summary
│   │   └── components/
│   │       ├── CheckOutCard.jsx       ← Item card with quantity controls
│   │       └── PriceDetailCard.jsx    ← Bag total + discount summary
│   │
│   └── Auth/
│       ├── pages/AuthPage.jsx         ← Signup / Signin form toggle
│       └── components/                ← Form inputs, validation UI
│
└── utils/            ← Client-side helpers
```

---

### 3.3 Database Schema

#### Users Collection

```
User {
  _id         : ObjectId (auto)
  name        : String  (required, minlength: 3)
  email       : String  (required, unique, lowercase)
  password    : String  (required, select: false — never returned in queries)
  role        : String  (enum: ['admin', 'user'], default: 'user')
  address     : [
    {
      fullname : String
      phone    : String
      address  : String
      city     : String
      state    : String
      zip      : String
      country  : String
    }
  ]
  createdAt   : Date    (auto - timestamps)
  updatedAt   : Date    (auto - timestamps)
}
```

#### Products Collection

```
Product {
  _id           : ObjectId (auto)
  title         : String  (required, trimmed)
  description   : String  (required)
  highlights    : [String]
  price         : Number  (required, min: 0)
  featuredImage : {
    url      : String (required)
    filename : String (required)
  }
  isFeatured    : Boolean (default: false)
  variants      : [
    {
      color : {
        name : String (required)
        hex  : String (required)
      }
      images : [
        {
          url      : String (required)
          filename : String (required)
        }
      ]
      sizes  : [
        {
          size  : String (enum: XS | S | M | L | XL | XXL)
          stock : Number (default: 0)
        }
      ]
    }
  ]
  createdAt     : Date (auto)
  updatedAt     : Date (auto)
}
```

#### Carts Collection

```
Cart {
  _id   : ObjectId (auto)
  user  : ObjectId → ref: "User"  (required, unique — one cart per user)
  items : [
    CartItem {
      product  : ObjectId → ref: "Product" (required)
      image    : {
        url      : String (required)
        filename : String (required)
      }
      color    : {
        name : String (required)
        hex  : String (required)
      }
      quantity : Number (default: 1, min: 1)
      size     : String (enum: XS | S | M | L | XL | XXL)
      stock    : Number (required)
    }
    // _id: false — no subdocument IDs on cart items
  ]
  createdAt : Date (auto)
  updatedAt : Date (auto)
}
```

#### Entity Relationship Diagram

```
┌──────────┐         ┌───────────┐         ┌──────────┐
│   User   │ 1     1 │   Cart    │ *     1  │ Product  │
│          ├─────────┤           ├──────────┤          │
│ _id      │         │ _id       │          │ _id      │
│ name     │         │ user  ────┤          │ title    │
│ email    │         │ items     │          │ price    │
│ password │         │  └product─┼──────────┤ variants │
│ role     │         │  └ color  │          │ images   │
│ address  │         │  └ size   │          │ sizes    │
│          │         │  └ qty    │          │ stock    │
└──────────┘         └───────────┘          └──────────┘
```

---

### 3.4 API Design

All responses follow a unified envelope:
```json
{
  "statusCode": 200,
  "message": "Human-readable message",
  "data": {}
}
```

#### Authentication Endpoints

| Method | Endpoint | Auth Required | Request Body | Response |
|---|---|---|---|---|
| POST | `/api/auth/signup` | No | `{ name, email, password }` | 201 · User created |
| POST | `/api/auth/signin` | No | `{ email, password }` | 200 · `{ token, user }` |
| GET | `/api/health` | No | — | 200 · Server status |

#### Product Endpoints

| Method | Endpoint | Auth Required | Request Body | Response |
|---|---|---|---|---|
| GET | `/api/products` | No | — | 200 · Products list (variants excluded) |
| GET | `/api/products/:id` | No | — | 200 · Full product with variants |
| POST | `/api/products` | No | Product object | 200 · Created product |

#### Cart Endpoints _(all require `Authorization: Bearer <token>`)_

| Method | Endpoint | Auth Required | Request Body | Response |
|---|---|---|---|---|
| GET | `/api/cart` | Yes | — | 200 · Populated cart |
| POST | `/api/cart/add` | Yes | `{ product, quantity, size, color, image }` | 200 · Updated cart |
| PUT | `/api/cart` | Yes | `{ productId, quantity, size, color }` | 200 · Updated cart |
| DELETE | `/api/cart/remove` | Yes | `{ productId, size, color }` | 200 · Updated cart |

---

### 3.5 Authentication & Authorization Flow

#### Signup Flow

```
Client                          Server
  │                               │
  │  POST /api/auth/signup        │
  │  { name, email, password }    │
  │──────────────────────────────►│
  │                               │
  │                         Joi validate
  │                               │
  │                         bcrypt.hash(password, 10)
  │                               │
  │                         User.create({ name, email, hashPass })
  │                               │
  │  201 "User created"           │
  │◄──────────────────────────────│
```

#### Signin Flow

```
Client                          Server
  │                               │
  │  POST /api/auth/signin        │
  │  { email, password }          │
  │──────────────────────────────►│
  │                               │
  │                         User.findOne({ email }).select("+password")
  │                               │
  │                         bcrypt.compare(password, hash)
  │                               │
  │                         generateToken({ id, email, role })
  │                               │
  │  200 { token, user }          │
  │◄──────────────────────────────│
  │                               │
  │ localStorage.setItem("token") │
```

#### Protected Route — verifyUser Middleware

```
Client                     verifyUser Middleware           DB
  │                               │                        │
  │  GET /api/cart                │                        │
  │  Authorization: Bearer <JWT>  │                        │
  │──────────────────────────────►│                        │
  │                               │                        │
  │                        Extract token from header       │
  │                               │                        │
  │                        jwt.verify(token, JWT_SECRET)   │
  │                               │                        │
  │                        User.findById(decoded.id) ─────►│
  │                               │                        │
  │                        req.user = user                 │
  │                               │                        │
  │                        next() → Controller             │
  │                               │                        │
  │  200 { cart data }            │                        │
  │◄──────────────────────────────│                        │
```

#### Token Storage Strategy (Client)

```
AuthContext
    │
    ├── token ──► localStorage.setItem("token", token)
    │
    ├── user  ──► localStorage.setItem("user", JSON.stringify(user))
    │
    └── On App Load:
            localStorage.getItem("token") → restore session
            localStorage.getItem("user")  → restore user profile
```

---

### 3.6 Cart State Management

The cart uses a **dual-layer state strategy**: local React Context + localStorage for instant UX, and backend API sync for cross-session persistence.

#### Add to Cart

```
User clicks "Add to Cart"
        │
        ▼
addToCart() (CartContext)
        │
        ├── 1. Optimistically update cartItems in memory
        │         Check duplicate: same productId + color.name + size
        │         If found: increment quantity
        │         If not: push new item
        │
        ├── 2. useEffect triggers localStorage sync
        │         localStorage.setItem("cartItems", JSON.stringify(cartItems))
        │
        └── 3. (If authenticated) POST /api/cart/add ← background API sync
                    │
                    ▼
              MongoDB cart document updated
```

#### Cart Sync on Login

```
User logs in → AuthContext.login()
        │
        ├── token saved to state + localStorage
        │
        └── CartContext.loadCart(token)
                    │
                    ▼
              GET /api/cart (Authorization: Bearer token)
                    │
                    ▼
              Response: cart with populated products
                    │
                    ▼
              setCartItems(formattedItems)
              (server cart replaces local storage cart)
```

#### Cart Computed Values (useMemo)

| Value | Formula |
|---|---|
| `cartCount` | `items.reduce((acc, item) => acc + item.quantity, 0)` |
| `cartTotal` | `items.reduce((acc, item) => acc + item.price * item.quantity, 0)` |

---

### 3.7 Component Tree

```
main.jsx
└── BrowserRouter
    └── AuthProvider
        └── CartProvider
            └── AppProvider
                └── App
                    └── Routes
                        └── MainLayout  (path="/")
                            ├── Navbar
                            │   ├── Logo
                            │   ├── Nav Links
                            │   └── Cart Icon (cartCount badge)
                            │
                            ├── <Outlet>
                            │   │
                            │   ├── Home  (path="/")
                            │   │   ├── Hero
                            │   │   ├── Categories
                            │   │   │   └── CategoryCard × N
                            │   │   └── ProductList
                            │   │       └── ProductCard × N
                            │   │
                            │   ├── ProductDetail  (path="/product/:id")
                            │   │   ├── Image Gallery (variant images)
                            │   │   ├── Color Selector
                            │   │   ├── Size Selector
                            │   │   └── Add to Cart Button
                            │   │
                            │   ├── Checkout  (path="/checkout/cart")
                            │   │   ├── CheckOutCard × N
                            │   │   │   └── Quantity +/- Controls
                            │   │   └── PriceDetailCard
                            │   │       ├── Bag Total
                            │   │       └── Discount Summary
                            │   │
                            │   └── AuthPage  (path="/account/auth")
                            │       ├── SignUp Form
                            │       └── SignIn Form
                            │
                            └── Footer
                                ├── Brand Info
                                ├── Links
                                └── Social Icons
```

---

### 3.8 Data Flow Diagrams

#### Product Browsing Flow

```
User visits Home (/)
        │
        ▼
ProductList mounts
        │
        ▼
useEffect → getAllProducts()
        │  GET /api/products
        ▼
Server: product.find().select('-variants')
        │  (title, price, featuredImage, isFeatured only)
        ▼
Render ProductCard × N
        │
User clicks ProductCard
        │
        ▼
Navigate to /product/:id
        │
        ▼
ProductDetail mounts → getProductById(id)
        │  GET /api/products/:id  (full product with variants)
        ▼
User selects color → variant images update
User selects size  → stock count displayed
        │
        ▼
"Add to Cart" clicked
        │
        ├── CartContext.addToCart(item)   [local state + localStorage]
        └── POST /api/cart/add            [backend sync if authenticated]
```

#### Checkout Flow

```
User visits /checkout/cart
        │
        ▼
Checkout.jsx reads cartItems from CartContext
        │
        ▼
Renders CheckOutCard for each item
        │
        ├── Quantity "+/-" pressed
        │       │
        │       ▼
        │   updateQuantity(itemId, colorName, size, qty)
        │       ├── Optimistic local state update
        │       └── PUT /api/cart (if authenticated)
        │
        ├── "Remove" pressed
        │       │
        │       ▼
        │   removeFromCart(itemId, colorName, size)
        │       ├── Filter item from local state
        │       └── DELETE /api/cart/remove (if authenticated)
        │
        └── PriceDetailCard
                ├── bagTotal = cartTotal (from CartContext useMemo)
                └── productDiscount = 0 (placeholder)
```

---

## 4. Directory Structure

```
e-commerce/
├── client/                   ← React SPA
│   ├── public/               ← Static assets
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── assets/
│   │   ├── components/       ← Navbar, Footer, Toast
│   │   ├── context/          ← AuthContext, CartContext, AppContext
│   │   ├── features/         ← home | ProductDetail | Checkout | Auth
│   │   ├── hooks/            ← index.js (re-exports)
│   │   ├── layouts/          ← MainLayout
│   │   ├── routes/           ← MainRoute
│   │   ├── services/         ← apiCalls.js
│   │   └── utils/
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json
│   └── package.json
│
├── server/                   ← Express REST API
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/           ← db, env, cloudinary
│       ├── middleware/       ← auth, error
│       ├── modules/          ← auth | products | cart | user
│       ├── utils/            ← ApiResponse, ApiError, jwt, wrapAsync
│       └── scripts/          ← seed.js
│
├── SYSTEM_DESIGN.md          ← This document
├── readME.md
├── prac.js
└── .gitignore
```

---

## 5. Security Design

| Concern | Implementation |
|---|---|
| **Password Storage** | bcrypt with salt rounds = 10; `select: false` prevents password leaks in queries |
| **JWT Tokens** | Signed with `JWT_SECRET` from env vars; verified on every protected request |
| **Token Transmission** | `Authorization: Bearer <token>` header |
| **Input Validation** | Joi schemas validate all request bodies before reaching the controller |
| **CORS** | `cors()` middleware enabled; restrict `origin` whitelist in production |
| **Environment Secrets** | All credentials in `.env` (MONGO_URI, JWT_SECRET, CLOUD_*); `.env` in `.gitignore` |
| **Error Exposure** | Custom `ApiError` + global `errorHandler` — raw stack traces never sent to client |
| **Role Field** | `role` enum: `['admin', 'user']`; included in JWT payload for future RBAC |

---

## 6. Error Handling Strategy

#### Backend

```
wrapAsync(controller)
    └── Catches all async errors → passes to next(err)
                │
                ▼
        Global errorHandler middleware
                │
        ├── instanceof ApiError
        │       └── res.status(err.statusCode).json({ message: err.message })
        │
        └── Unknown error
                └── res.status(500).json("Internal Server Error")

notFoundHandler
    └── Catches all unmatched routes → 404 ApiResponse
```

#### Frontend

```
apiCalls.js
    └── try/catch on every Axios call
            └── throw new Error(e.response?.data?.message || "fallback message")

CartContext
    └── Optimistic UI updates (no blocking wait for server response)
            └── API errors logged to console without breaking UX

AuthContext
    └── Token + user persisted in localStorage
            └── Survives full page refresh — no forced re-login
```

---

> 📌 **Note**: This document reflects the current codebase state as of **August 2026**.  
> Identified next-step features: order management, payment gateway integration (e.g. Stripe/Razorpay), admin dashboard, and product search/filter.
