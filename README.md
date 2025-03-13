# X\_clone

🚀 **X\_clone** is a full-stack Twitter-like chat application built using **MERN Stack (MongoDB, Express.js, React, Node.js)**. It includes both frontend and backend functionality, supporting authentication, user management, and real-time interactions.

---

## 📌 **Features**

✅ **Built with MERN Stack** - Modern full-stack development.\
✅ **MongoDB Database** - Managed with Mongoose.\
✅ **JWT Authentication** - Secure authentication using JSON Web Tokens.\
✅ **Image Upload with Cloudinary** - Cloud storage for images.\
✅ **User Management** - Registration, login, and profile updates.

---

## 🛠 **Technologies Used**

- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Cloud Storage:** Cloudinary
- **State Management:** Zustand

---

## 🚀 **Run the Project Locally**

### **1️⃣ Prerequisites:**

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [MongoDB](https://www.mongodb.com/) (if running the database locally)

### **2️⃣ Clone the Repository:**

```bash
git clone https://github.com/Amro145/X_clone.git
cd X_clone
```

### **3️⃣ Install Dependencies & Start the Project:**

#### **Backend**

```bash
cd backend
npm install
npm run dev
```

#### **Frontend**

```bash
cd ../client
npm install
npm run dev
```

The frontend will run at: `http://localhost:5173`\
The backend will run at: `http://localhost:8000`

---

## 🔧 **Environment Variables**

Create a `.env` file in both `backend` and `client` folders and add the following:

### **Backend (.env file in backend folder)**

```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
NODE_ENV=development
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=8000
```
