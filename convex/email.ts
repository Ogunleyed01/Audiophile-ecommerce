import { action } from './_generated/server'
import { v } from 'convex/values'
import { Resend } from 'resend'

export const sendOrderConfirmation = action({
  args: {
    to: v.string(),
    orderId: v.string(),
    customerName: v.string(),
    items: v.array(
      v.object({
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      tax: v.number(),
      grandTotal: v.number(),
    }),
    shipping: v.object({
      address: v.string(),
      zip: v.string(),
      city: v.string(),
      country: v.string(),
    }),
    orderUrl: v.string(),
  },
  handler: async (_ctx, args) => {
    'use node'
    const env = (globalThis as unknown as { [k: string]: unknown } & { process?: { env?: Record<string, string | undefined> } }).process?.env || {}
    const apiKey = env.RESEND_API_KEY
    const fromAddress = env.RESEND_FROM || 'onboarding@resend.dev'

    if (!apiKey) {
      console.warn('RESEND_API_KEY not set, email will not be sent')
      return { success: false, error: 'Email service not configured' }
    }

    const resend = new Resend(apiKey)

    // Generate HTML email template
    const itemsHtml = args.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name} x${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toLocaleString()}</td>
      </tr>
    `
      )
      .join('')

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    body { margin: 0; font-family: 'Manrope', Arial, sans-serif; background: #f6f6f6; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: #101010; color: #ffffff; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; }
    .content { padding: 32px 24px; color: #101010; }
    .greeting { font-size: 18px; margin-bottom: 16px; }
    .order-id { color: #666666; font-size: 14px; margin-bottom: 24px; }
    .section { margin: 24px 0; }
    .section h2 { font-size: 16px; font-weight: bold; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    .total-row { font-weight: bold; border-top: 2px solid #101010; }
    .cta-button { display: inline-block; padding: 15px 30px; background: #D87D4A; color: #ffffff; text-decoration: none; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; margin: 24px 0; }
    .footer { padding: 24px; background: #f1f1f1; text-align: center; font-size: 12px; color: #666666; }
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 24px 16px !important; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>audiophile</h1>
    </div>
    <div class="content">
      <div class="greeting">Hi ${args.customerName},</div>
      <p>Thank you for your order! We're excited to get your premium audio gear to you.</p>
      
      <div class="order-id">Order ID: ${args.orderId}</div>

      <div class="section">
        <h2>Order Summary</h2>
        <table>
          ${itemsHtml}
          <tr class="total-row">
            <td style="padding: 12px; border-top: 2px solid #101010;">Subtotal</td>
            <td style="padding: 12px; border-top: 2px solid #101010; text-align: right;">$${args.totals.subtotal.toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding: 12px;">Shipping</td>
            <td style="padding: 12px; text-align: right;">$${args.totals.shipping.toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding: 12px;">Tax (Included)</td>
            <td style="padding: 12px; text-align: right;">$${args.totals.tax.toLocaleString()}</td>
          </tr>
          <tr class="total-row">
            <td style="padding: 12px; border-top: 2px solid #101010;">Grand Total</td>
            <td style="padding: 12px; border-top: 2px solid #101010; text-align: right; color: #D87D4A;">$${args.totals.grandTotal.toLocaleString()}</td>
          </tr>
        </table>
      </div>

      <div class="section">
        <h2>Shipping Address</h2>
        <p style="margin: 0; line-height: 1.6;">
          ${args.shipping.address}<br>
          ${args.shipping.city}, ${args.shipping.zip}<br>
          ${args.shipping.country}
        </p>
      </div>

      <div style="text-align: center;">
        <a href="${args.orderUrl}" class="cta-button">View Your Order</a>
      </div>

      <div class="section" style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;">
        <p style="font-size: 14px; color: #666666; margin: 0;">
          Need help? Contact our support team at <a href="mailto:support@audiophile.com" style="color: #D87D4A;">support@audiophile.com</a>
        </p>
      </div>
    </div>
    <div class="footer">
      <p style="margin: 0;">© 2024 Audiophile. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>
    `

    try {
      const { data, error } = await resend.emails.send({
        from: `Audiophile <${fromAddress}>`,
        to: args.to,
        subject: `Order Confirmation - ${args.orderId}`,
        html,
      })
      if (error) {
        console.error('Resend error:', error)
        const message = typeof (error as unknown) === 'object' && error && 'message' in (error as Record<string, unknown>)
          ? String((error as Record<string, unknown>).message)
          : 'Failed to send email'
        return { success: false, error: message }
      }
      return { success: true, messageId: data?.id }
    } catch (error) {
      console.error('Email sending error:', error)
      return { success: false, error: 'Failed to send email' }
    }
  },
})
