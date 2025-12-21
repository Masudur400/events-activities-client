# Event & Entertainment Management System

An all-in-one platform for discovering, hosting, and booking events. Built with a modern tech stack focusing on performance, scalability, and user experience.

## 🔗 Live Links
* **Frontend:** [https://events-activities.vercel.app](https://events-activities.vercel.app)
* **Backend API:** [https://events-activities-server.vercel.app](https://events-activities-server.vercel.app)

---

## 🚀 Features

### Common Features
* **User-Friendly UI:** Modern, clean, and fully responsive design across all devices.
* **Authentication:** Secure login and registration using **JWT (JSON Web Tokens)**.
* **Password Management:** Full support for **Password Reset** and **Forgot Password** via email.
* **Profile Management:** Each user role can update their profile information and settings.

### User Role
* **Event Browsing:** Explore various events with a rich filtering system.
* **Detailed Event Pages:** View event descriptions, timing, location, and host info.
* **Ratings & Reviews:** Share feedback and rate events after attending.
* **Secure Booking:** Seamless event booking with **SSLCommerz** payment gateway integration.
* **Booking History:** Track and manage personal event bookings.

### Host Role
* **Event Creation:** Dedicated dashboard to create and publish new events.
* **Event Management:** Edit or update details of hosted events.
* **Analytics:** (Optional: track how many people booked your events).

### Admin Role (Master Control)
* **User & Host Management:** Overview and control over all registered accounts.
* **Event Moderation:** Review, approve, or manage any event on the platform.
* **Financial Tracking:** Monitor all bookings and payments in one place.
* **Review Management:** Moderate user ratings and reviews.

---

## 🛠 Tech Stack

### Frontend
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **State Management:** TanStack Query (React Query)
* **Styling:** Tailwind CSS / Lucid Icons
* **Form Handling:** React Hook Form / Zod

### Backend
* **Authentication:** JWT (JSON Web Token)
* **Payment Gateway:** SSLCommerz
* **Database:** (Add your database name here, e.g., MongoDB/PostgreSQL)

---

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```

2.  **Navigate to the project folder:**
    ```bash
    cd project-folder
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up Environment Variables:**
    Create a `.env.local` file and add the following:
    ```env
    NEXT_PUBLIC_API=your_backend_api_url
    # Add other keys like SSLCommerz Store ID etc.
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## 🔐 Security Features
* Protected routes based on User Roles (Admin, Host, User).
* Password hashing for database security.
* Secure payment processing via SSLCommerz redirect.

---

## 📸 Screenshots
*(Add your project screenshots here to make it more attractive)*

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
Distributed under the MIT License.