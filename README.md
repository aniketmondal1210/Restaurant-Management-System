# 🍽️ QuickBites Restaurant Management System

A comprehensive restaurant queue and order management system built with Next.js, TypeScript, and Tailwind CSS. Features role-based dashboards for administrators, staff, and customers with real-time order processing, analytics, and seamless user experience.

## ✨ Features

### 🔐 Multi-Role Authentication
- **Admin Dashboard** - Complete restaurant management and analytics
- **Staff Dashboard** - Order processing and customer service tools  
- **Customer Dashboard** - Menu browsing, ordering, and order tracking
- Secure role-based access control with automatic routing

### 📊 Admin Features
- **Analytics Dashboard** - Sales charts, revenue tracking, customer insights
- **Order Management** - Real-time queue processing with priority handling
- **Menu Management** - Add, edit, delete menu items and categories
- **User Management** - CRUD operations for staff and customer accounts
- **Restaurant Settings** - Configure business hours, delivery zones, pricing

### 👨‍💼 Staff Features
- **Order Processing** - Manage incoming orders with status updates
- **Queue Visualization** - Priority-based order queue with estimated times
- **Customer Service** - Handle customer inquiries and order modifications
- **Daily Operations** - Track daily sales and order statistics

### 🛒 Customer Features
- **Menu Browsing** - Browse restaurant menu with categories and search
- **Smart Cart** - Add items with minimum order enforcement
- **Order Tracking** - Real-time order status with delivery tracking
- **Order History** - View past orders with reorder functionality
- **Favorites** - Save favorite items for quick reordering
- **Reviews & Ratings** - Rate and review completed orders

### 🎨 Technical Features
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between themes with system preference detection
- **Real-time Updates** - Live order status updates and notifications
- **Data Persistence** - Local storage with Zustand state management
- **Error Handling** - Comprehensive error boundaries and user feedback
- **TypeScript** - Full type safety throughout the application

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/yourusername/quickbites-restaurant-system.git
cd quickbites-restaurant-system
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Start development server**
\`\`\`bash
npm run dev
\`\`\`

4. **Open your browser**
Navigate to `http://localhost:3000`

### Build for Production
\`\`\`bash
npm run build
npm start
\`\`\`

## 🎮 Getting Started

### Create Your Account
1. Visit the homepage and click "Get Started"
2. Choose your role:
   - **Customer** - Browse menu and place orders
   - **Staff** - Process orders and manage operations  
   - **Admin** - Full restaurant management access
3. Fill out the registration form
4. Login and access your role-specific dashboard

### Demo the System
The application includes demo data to showcase all features:
- Sample menu items with categories
- Mock order history and analytics
- Realistic restaurant information
- Example customer interactions

## 🏗️ Project Structure

\`\`\`
├── app/                          # Next.js app directory
│   ├── dashboard/               # Admin dashboard pages
│   ├── user-dashboard/          # Staff dashboard pages
│   ├── customer-dashboard/      # Customer dashboard pages
│   └── layout.tsx              # Root layout with providers
├── components/                  # Reusable UI components
│   ├── auth/                   # Authentication components
│   ├── dashboard/              # Admin dashboard components
│   ├── user-dashboard/         # Staff dashboard components
│   ├── customer-dashboard/     # Customer dashboard components
│   ├── layout/                 # Layout components (sidebars, headers)
│   ├── orders/                 # Order management components
│   ├── menu/                   # Menu management components
│   ├── analytics/              # Analytics and charts
│   └── ui/                     # shadcn/ui components
├── stores/                     # Zustand state management
├── types/                      # TypeScript type definitions
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
└── context/                    # React context providers
\`\`\`

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **State Management:** Zustand
- **Icons:** Lucide React
- **Charts:** Custom chart components
- **Theme:** next-themes for dark/light mode

## 🔧 Key Components

### Authentication System
- Role-based authentication with secure routing
- User registration with role selection
- Persistent login sessions
- Automatic role-based dashboard routing

### Order Management
- Priority queue system for order processing
- Real-time status updates
- Estimated preparation times
- Customer notification system

### Analytics Dashboard
- Sales revenue tracking
- Order volume analytics
- Customer behavior insights
- Popular items analysis
- Time-based reporting

### Menu Management
- Category-based organization
- Item customization options
- Pricing and availability management
- Dietary restriction badges
- Image and description management

## 🎯 Use Cases

### For Restaurant Owners
- Monitor daily sales and performance
- Manage menu items and pricing
- Track customer behavior and preferences
- Oversee staff operations
- Analyze business metrics

### For Restaurant Staff
- Process incoming orders efficiently
- Manage order queue and priorities
- Update order status in real-time
- Handle customer service inquiries
- Track daily operational metrics

### For Customers
- Browse restaurant menu easily
- Place orders with real-time cart
- Track order status and delivery
- Manage favorite items
- View order history and reorder

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Deploy to Other Platforms
The application is a standard Next.js app and can be deployed to:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Any Node.js hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide](https://lucide.dev/) for the icon library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) for the React framework
- [Zustand](https://zustand-demo.pmnd.rs/) for state management

## 📞 Support

If you have any questions or need help with the project:
- Open an issue on GitHub
- Check the documentation
- Review the code examples in the components

---

**Built with ❤️ for the restaurant industry**
