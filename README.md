# SaaS CRM Web Application

A SaaS CRM (Customer Relationship Management) web application where users can manage contacts, send emails, share testimonial links, and view a calendar that shows activities performed on specific dates. Future updates will include message campaigns, To-Do lists, and a landing page feature. Users can also receive testimonials from clients.

## Features

- **Send Emails**: Users can send emails to their clients directly from the dashboard.
- **Testimonial Link**: Allows users to share a testimonial link with clients to receive feedback.
- **Calendar Integration**: Shows activity logs for specific dates (e.g., emails sent, tasks completed).
- **Activity Dashboard**: A visual representation of contact lists, emails sent, and unsubscribed clients.
- **Future Features**:
  - Message Campaigns
  - To-Do List
  - Landing Page Generation

## Built With

- **Frontend**:
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [Vite](https://vitejs.dev/) - Next-generation front-end tool to enhance performance and DX.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
  - [Framer Motion](https://www.framer.com/motion/) - Motion library for React to create smooth animations.
  - [React Icons](https://react-icons.github.io/react-icons/) - Icon library for React.
  - [Chart.js](https://www.chartjs.org/) - A simple yet flexible JavaScript charting library.
  - [Axios](https://axios-http.com/) - Promise-based HTTP client for the browser.

## Getting Started

### Prerequisites

To run the project locally, ensure you have the following installed:

- Node.js (>= 16.x)
- npm (or yarn)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/saas-crm-webapp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd saas-crm-webapp
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the application:

   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173` to see the application in action.

### File Structure

```bash
saas-crm-webapp/
├── public/
├── src/
│   ├── api/
│   │   └── axios-api.js
│   ├── components/
│   │   ├── Chart/              # BarChart Component
│   │   ├── Dashboard/          # Components for Dashboard
│   │   ├── User/               # User Auth Components
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Register/
│   │   ├── TestimonialForClient/
│   │   ├── Unsubscribe/
│   └── App.jsx
├── README.md
├── package.json
└── vite.config.js
```
