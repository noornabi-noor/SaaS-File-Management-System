# SaaS File Management System – Backend  

## 📌 Project Overview
This backend powers a subscription-based File & Folder Management SaaS application.
It dynamically enforces storage limits and permissions defined by the Admin for each subscription package (Free, Silver, Gold, Diamond).

All folder and file operations are validated against the user's active subscription package before execution.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|--------|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **Better Auth** | Authentication & session management |
| **Prisma ORM** | Database ORM and migrations |
| **PostgreSQL** | Relational database |
| **Nodemailer** | Email notifications |
| **CORS** | Cross-origin resource sharing |
| **dotenv** | Environment variable management |
| **Multer** | For file upload handling |

---

## 🔐 Authentication & Authorization
- Authentication powered by **Better Auth**
- Secure session handling
- Role-based access control (RBAC)
- Protected routes using middleware
- Admin accounts are **seeded in the database**

### User Roles
- **User**
- **Admin**

---

## 👤 Admin Features
- Create packages (Free, Silver, Gold, Diamond)
- Update package limits dynamically
- Delete packages
- Secure session handling

## 👥 User Features
### Authentication
- Register
- Login
- Select subscription package
- Change package
- View subscription history

### Folder Management
- Create folder
- Create sub-folder
- Rename folder
- Delete folder

### File Management
- Upload file
- View files in folder
- Rename file
- Download file
- Delete file


---

## 🗄️ Database Schema (Core Tables)

- **User**
- **SubscriptionPackage**
- **UserSubscription**
- **Folder**
- **File**

> Managed using **Prisma ORM** with **PostgreSQL**.

---

## 🗂️ Database Schema

The full ER diagram for the SaaS File Management System can be viewed online at DrawSQL:

[View Database Schema on DrawSQL](https://drawsql.app/teams/myself-668/diagrams/saasfilemanagementsystem)

---

## 📂 Project Structure

```text
prisma/
├── migrations/
└── schema.prisma
src/
├── lib/
│   ├── auth.ts                 # Better Auth configuration
│   └── prisma.ts              # Prisma client instance
│
├── middleware/
│   └── auth.ts                # Authentication & role-based guards
│
├── modules/
│   ├── auth/
│   │   ├── auth.routes.ts
│   │   ├── auth.controller.ts
│   │   └── auth.services.ts
│   │
│   ├── SubscriptionPackage/
│   │   ├── SubscriptionPackage.routes.ts
│   │   ├── SubscriptionPackage.controller.ts
│   │   └── SubscriptionPackage.services.ts
│   │
│   ├── UserSubscription/
│   │   ├── UserSubscription.routes.ts
│   │   ├── UserSubscription.controller.ts
│   │   └── UserSubscription.services.ts
│   │
│   ├── Folder/
│   │   ├── Folder.routes.ts
│   │   ├── Folder.controller.ts
│   │   └── Folder.services.ts
│   │
│   ├── File/
│   │   ├── File.routes.ts
│   │   ├── File.controller.ts
│   │   └── File.services.ts
│
├── scripts/
│   └── seedAdmin.ts            # Seed admin accounts
│
├── app.ts                      # Express app configuration
└── server.ts                   # Server bootstrap

Each module follows a strict **routes → controller → services** pattern.

```

## 🌐 API Routes (Overview)
```text
POST   /auth/login
POST   /auth/register

GET    /admin/packages
POST   /admin/packages
PUT    /admin/packages/:id
DELETE /admin/packages/:id

GET    /user/packages
POST   /user/select-package

POST   /folders
DELETE /folders/:id
PATCH  /folders/:id

POST   /files/upload
GET    /files/:folderId
PATCH  /files/:id
DELETE /files/:id

```
---

## 🚀 Getting Started

### 1️⃣ Install dependencies
```bash
npm install
```
## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/skillbridge
BETTER_AUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret_key
APP_USER=your_email@gmail.com
APP_PASS=your_email_password
APP_URL=http://localhost:3000
```
### 3️⃣ Run database migrations
```bash
npx prisma migrate dev
```
### 4️⃣ Seed admin user
```bash
npm run seed:admin
```
### 5️⃣ Start development server
```bash
npm run dev
```

## 🚀 Getting Started
### 1️⃣ Clone the repository
```bash
git clone https://github.com/noornabi-noor/SaaS-File-Management-System.git
cd SaaS-File-Management-System
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup Prisma
```bash
npx prisma generate
npx prisma migrate dev
```

### 4️⃣ Seed Admin User
```bash
node prisma/seed.js
```

### 5️⃣ Run the server
```bash
npm run dev
```
Server will start at:
```bash
📍 http://localhost:5000
```