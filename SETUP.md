# Setup Instructions for Convex & Email Integration

## Prerequisites

1. Node.js installed
2. npm or yarn package manager
3. Convex account (free tier available)
4. Resend account (for email service)

## Step 1: Install Convex CLI

```bash
npm install -g convex
```

## Step 2: Initialize Convex

1. Run in your project directory:
```bash
npx convex dev
```

2. This will:
   - Create a Convex account (if you don't have one)
   - Generate a `convex.json` configuration file
   - Provide you with a `VITE_CONVEX_URL` that you'll need to add to your `.env` file

## Step 3: Set Up Environment Variables

Create a `.env` file in the root of your project:

```env
VITE_CONVEX_URL=your_convex_url_here
RESEND_API_KEY=your_resend_api_key_here
```

### Getting Your Convex URL

After running `npx convex dev`, you'll see output like:
```
Your deployment URL: https://your-project.convex.cloud
```

Copy this URL and add it to your `.env` file as `VITE_CONVEX_URL`.

### Getting Your Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key
4. Copy the key and add it to your `.env` file as `RESEND_API_KEY`

## Step 4: Deploy Convex Schema

The Convex schema is already configured in `convex/schema.ts`. When you run `npx convex dev`, it will:
- Generate TypeScript types automatically
- Deploy your schema to Convex
- Watch for changes and redeploy automatically

## Step 5: Configure Email Domain (Optional)

For production, you'll need to:
1. Add and verify your domain in Resend
2. Update the `from` email in `convex/email.ts` to use your verified domain

For development, you can use Resend's test email addresses.

## Step 6: Run the Application

```bash
npm run dev
```

## Testing

1. **Test Order Creation:**
   - Add items to cart
   - Go to checkout
   - Fill out the form
   - Submit order
   - Check Convex dashboard to see the order saved

2. **Test Email:**
   - Complete an order
   - Check the email inbox you provided
   - You should receive a confirmation email

## Troubleshooting

### Convex not working
- Ensure `VITE_CONVEX_URL` is set in `.env`
- Restart your dev server after adding the env variable
- Check that `npx convex dev` is running

### Email not sending
- Verify `RESEND_API_KEY` is set correctly
- Check Resend dashboard for email logs
- Ensure you're using a valid email address

### Type errors
- Run `npx convex dev` to regenerate types
- Ensure all Convex files are saved

## File Structure

```
convex/
  ├── schema.ts          # Database schema
  ├── orders.ts          # Order mutations/queries
  ├── email.ts           # Email sending action
  └── _generated/        # Auto-generated types (don't edit)

src/
  ├── lib/
  │   ├── convex/
  │   │   └── index.ts   # Convex client setup
  │   └── email/
  │       └── index.ts   # Email service wrapper
  └── pages/
      ├── checkout.tsx   # Checkout with Convex integration
      └── order-confirmation.tsx # Order confirmation page
```

## Next Steps

- Customize email template in `convex/email.ts`
- Add order status updates
- Implement order history page
- Add admin dashboard for order management

