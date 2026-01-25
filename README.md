# DevVault 🚀

**DevVault** (formerly CSELibrary) is a premium, high-performance resource hub designed for Computer Science students and engineering professionals. It provides a curated library of interactive notebooks, field-tested PDFs, and an AI-powered study assistant to bridge the gap between academic theory and industry practice.

---

## 📸 Project Showcase

### ⚡ Hero Section
![Hero Section](public/screenshots/hero.png)
*A modern, high-impact landing page featuring dynamic floating tech icons and smooth animations.*

### 📒 Interactive Notebooks
![Notebooks Section](public/screenshots/notebooks.png)
*Deep-dive into subjects like DSA, Java, and SQL with structured, interactive mastery guides.*

### 🤖 AI Study Assistant (Chatbot)
![Chatbot Section](public/screenshots/chatbot.png)
*Powered by Google Gemini, our integrated chatbot helps students solve complex engineering queries in real-time.*

### 📚 Premium PDF Library
![PDF Library](public/screenshots/pdfs.png)
*A sleek, filterable library with secure Razorpay integration and automated email delivery.*

---

## ✨ Key Features

- **🎯 Mastery Guides**: Beyond static PDFs—interactive notebooks for DSA, OOPS, DBMS, and more.
- **🛡️ Secure Digital Vault**: Industry-standard asset protection with JWT-secured download links.
- **💳 Payment Integration**: Fully functional Razorpay checkout flow for premium resources.
- **📧 Automated Delivery**: Production-grade email templates for instant receipt of digital products.
- **💬 AI Chatbot**: A custom-trained assistant specialized in Computer Science topics to help students learn faster.
- **🌑 Modern UI/UX**: Built with Tailwind CSS 4 and Framer Motion, featuring full dark mode support and glassmorphism.
- **📱 Responsive Design**: Optimized for everything from mobile devices to ultra-wide monitors.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & Database
- **Runtime**: Node.js
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **AI**: [Google Generative AI](https://ai.google.dev/) (Gemini Flash)
- **Cloud Storage**: [Cloudinary](https://cloudinary.com/) (for assets)

### Services
- **Payments**: [Razorpay](https://razorpay.com/)
- **Email**: [Nodemailer](https://nodemailer.com/) (SMTP with Gmail)
- **Authentication**: JWT (JSON Web Tokens) for secure downloads

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- MongoDB account
- Razorpay API keys
- Google AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/devvault.git
   cd devvault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your secrets:
   ```env
   # Database
   MONGODB_URI=your_mongodb_uri

   # Razorpay
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret

   # Email
   MAIL_USER=your_email
   MAIL_PASS=your_app_password

   # AI & URL
   GEMINI_API_KEY=your_gemini_key
   BASE_URL=http://localhost:3000
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Folder Structure

```text
src/
├── app/                  # Next.js App Router (Pages & API)
│   ├── api/              # Backend endpoints (Razorpay, Chatbot, Downloads)
│   ├── browsepdfs/       # PDF Library features
│   ├── chatbot/          # AI Assistant interface
│   └── notebooks/        # Interactive curriculum system
├── components/           # Reusable UI components
├── data/                 # Static course and notebook data
├── db/                   # Database connection logic
├── lib/                  # Utility functions and helpers
└── models/               # Mongoose schemas
public/                   # Static assets (images, fonts, SVGs)
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

Standalone Project - Created by **[Aman Kishor](https://github.com/kishoraman21)**

---

*Built with ❤️ for the Developer Community.*
