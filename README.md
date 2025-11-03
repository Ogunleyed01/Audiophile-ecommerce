# Audiophile E-commerce Website

A modern, fully-featured e-commerce platform for premium audio products. Built with React, TypeScript, and TailwindCSS, featuring a pixel-perfect responsive design, complete checkout flow, and integrated backend services.

![Audiophile E-commerce](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.16-38B2AC?logo=tailwind-css)
![Convex](https://img.shields.io/badge/Convex-1.28.2-FF6B6B?logo=convex)

## 🌟 Features

### 🎨 User Interface
- **Pixel-Perfect Design**: Faithfully recreated from Figma designs
- **Fully Responsive**: Optimized for mobile, tablet, and desktop screens
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Accessibility**: WCAG compliant with semantic HTML and ARIA labels

### 🛒 Shopping Experience
- **Product Catalog**: Browse headphones, speakers, and earphones
- **Product Detail Pages**: Comprehensive product information with galleries
- **Shopping Cart**: Persistent cart with localStorage (survives page reloads)
- **Quantity Management**: Add, update, and remove items from cart
- **Category Navigation**: Easy navigation between product categories

### 💳 Checkout & Orders
- **Complete Checkout Flow**: Multi-step form with validation
- **Form Validation**: Real-time validation with error messages
- **Payment Methods**: Support for e-Money and Cash on Delivery
- **Order Confirmation**: Email notifications with order summary
- **Order History**: View past orders via confirmation page

### 🔧 Backend Integration
- **Convex Database**: Orders stored securely in Convex
- **Email Service**: Automated order confirmations via Resend
- **Error Handling**: Comprehensive error handling and edge cases
- **Data Persistence**: Cart persists across sessions

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Seamless experience on tablets
- **Desktop Enhancement**: Enhanced layout for larger screens
- **Touch-Friendly**: Optimized for touch interactions

## 🚀 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.9.3** - Type safety
- **TailwindCSS 4.1.16** - Utility-first CSS
- **React Router 6.30.1** - Client-side routing
- **React Hook Form 7.66.0** - Form management
- **Zod 4.1.12** - Schema validation

### Backend
- **Convex 1.28.2** - Backend-as-a-Service
  - Database for order storage
  - Real-time queries and mutations
  - Serverless functions

### Services
- **Resend** - Email delivery service
  - Order confirmation emails
  - Responsive HTML templates

### Build Tools
- **Vite 7.1.7** - Build tool and dev server
- **TypeScript ESLint** - Code linting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Git** (for version control)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Audiophile-e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Convex**
   ```bash
   npx convex dev
   ```
   This will:
   - Create a Convex account (if needed)
   - Generate deployment URL
   - Create `.env.local` with `VITE_CONVEX_URL`

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_CONVEX_URL=your_convex_url_from_.env.local
   RESEND_API_KEY=your_resend_api_key_here
   ```

   **Note**: `VITE_CONVEX_URL` is automatically added to `.env.local` by Convex CLI.

5. **Set Resend API key in Convex**
   ```bash
   npx convex env set RESEND_API_KEY your_resend_api_key_here
   ```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

**Note**: Keep `npx convex dev` running in a separate terminal for backend functionality.

### Production Build
```bash
npm run build
npm run preview
```

### Build Output
The production build will be in the `dist/` directory, ready for deployment.

## 📁 Project Structure

```
audiophile-e-commerce/
├── convex/                 # Backend (Convex)
│   ├── schema.ts          # Database schema
│   ├── orders.ts          # Order mutations/queries
│   ├── email.ts           # Email sending actions
│   └── _generated/        # Auto-generated types
├── src/
│   ├── assets/            # Images, fonts, data
│   │   ├── home/          # Home page images
│   │   ├── product-*/     # Product images
│   │   └── shared/        # Shared assets
│   ├── components/        # React components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── CartModal.tsx
│   │   ├── Button.tsx
│   │   └── ...
│   ├── context/           # React Context
│   │   └── CartContext.tsx
│   ├── lib/               # Utilities
│   │   ├── convex/        # Convex client
│   │   ├── email/         # Email service
│   │   └── products.ts    # Product data
│   ├── pages/             # Page components
│   │   ├── index.tsx      # Home page
│   │   ├── checkout.tsx   # Checkout page
│   │   ├── product/       # Product detail pages
│   │   └── ...
│   ├── types/             # TypeScript types
│   │   └── order.ts
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── emails/                # Email templates
├── public/                # Static assets
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Key Features Explained

### Shopping Cart
- **Persistent Storage**: Cart items saved to localStorage
- **Auto-sync**: Cart persists across page reloads and browser restarts
- **Real-time Updates**: Cart badge updates automatically
- **Quantity Management**: Increase/decrease item quantities

### Checkout Flow
1. **Billing Details**: Name, email, phone number
2. **Shipping Info**: Address, ZIP, city, country
3. **Payment Method**: e-Money (with number/PIN) or Cash on Delivery
4. **Order Summary**: Review items and totals
5. **Order Confirmation**: Email sent automatically

### Order Management
- Orders saved to Convex database
- Order confirmation emails via Resend
- Order details accessible via confirmation page
- Order history stored permanently

### Product Pages
- Dynamic routing (`/product/:slug`)
- Product galleries with responsive images
- Related products recommendations
- Detailed product information
- "In The Box" contents list

## 🔐 Environment Variables

### Frontend (`VITE_CONVEX_URL`)
- Set automatically by `npx convex dev`
- Stored in `.env.local`
- Required for Convex backend connection

### Backend (`RESEND_API_KEY`)
- Set in Convex dashboard or via CLI
- Required for email functionality
- Get from [resend.com](https://resend.com)

## 🧪 Testing

### Manual Testing Checklist
- [ ] Add items to cart
- [ ] Cart persists on page reload
- [ ] Navigate product pages
- [ ] Complete checkout flow
- [ ] Verify order in Convex dashboard
- [ ] Check email delivery
- [ ] Test responsive design on mobile/tablet
- [ ] Test form validation
- [ ] Test error handling

## 🚀 Deployment

### Recommended: Vercel

**Quick Deploy:**
```bash
npm install -g vercel
vercel
```

**Or via GitHub:**
1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add environment variable: `VITE_CONVEX_URL`
4. Deploy automatically

### Other Options
- **Netlify**: Similar to Vercel, great for static sites
- **Cloudflare Pages**: Free tier with global CDN
- **Self-hosted**: Use any static hosting service

### Post-Deployment
1. Set `VITE_CONVEX_URL` in deployment platform
2. Verify Convex deployment is active
3. Set `RESEND_API_KEY` in Convex dashboard
4. Test checkout flow on production

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Design System

### Colors
- **Primary**: `#D87D4A` (Orange)
- **Background**: `#FFFFFF` (White)
- **Text**: `#101010` (Black)
- **Secondary**: `#F1F1F1` (Light Gray)
- **Accent**: `#000000` (Black)

### Typography
- **Font**: Manrope (loaded from Google Fonts)
- **Headings**: Bold, uppercase, letter-spaced
- **Body**: Regular weight, readable line-height

### Spacing
- Consistent spacing using Tailwind utilities
- Max-width: 1440px for content
- Full-width backgrounds

## 🐛 Troubleshooting

### Cart not persisting
- Check browser localStorage is enabled
- Clear browser cache and try again
- Check browser console for errors

### Convex not working
- Ensure `VITE_CONVEX_URL` is set correctly
- Verify `npx convex dev` is running
- Check Convex dashboard for deployment status

### Emails not sending
- Verify `RESEND_API_KEY` is set in Convex
- Check Resend dashboard for delivery logs
- Ensure email domain is verified (for production)

### Build errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (18.x or higher)
- Verify all dependencies are installed

## 📚 Documentation

- [Convex Documentation](https://docs.convex.dev)
- [Resend Documentation](https://resend.com/docs)
- [React Router Documentation](https://reactrouter.com)
- [TailwindCSS Documentation](https://tailwindcss.com)

## 🤝 Contributing

This is a project submission. Contributions are welcome for:
- Bug fixes
- Performance improvements
- Accessibility enhancements
- Documentation updates

## 📄 License

This project is part of the HNG13 Stage 3 task submission.

## 👨‍💻 Author

Built as part of HNG13 Internship Program - Stage 3

## 🙏 Acknowledgments

- Design inspiration from Frontend Mentor
- Product data from provided JSON
- Icons and assets from project resources

---

**Built with ❤️ using React, TypeScript, and modern web technologies**

