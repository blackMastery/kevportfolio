# EmailJS Setup Guide

This guide will help you set up EmailJS for the contact form in your portfolio website.

## What is EmailJS?

EmailJS allows you to send emails directly from your frontend JavaScript code without needing a backend server. It's perfect for static websites and portfolios.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Set Up Email Service

1. **Add Email Service:**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the authentication steps
   - Note down your **Service ID** (e.g., `service_abc123`)

2. **Create Email Template:**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template structure:

```html
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your portfolio website:

**From:** {{from_name}} ({{from_email}})
**Subject:** {{subject}}

**Message:**
{{message}}

---
This message was sent from your portfolio contact form.
```

3. **Note your Template ID** (e.g., `template_xyz789`)

## Step 3: Get Your Public Key

1. Go to "Account" → "API Keys"
2. Copy your **Public Key** (e.g., `user_abc123def456`)

## Step 4: Update Configuration

Open `app/config/emailjs.ts` and replace the placeholder values:

```typescript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: "user_abc123def456", // Your actual public key
  SERVICE_ID: "service_abc123",    // Your actual service ID
  TEMPLATE_ID: "template_xyz789",  // Your actual template ID
};
```

## Step 5: Test the Contact Form

1. Start your development server: `npm run dev`
2. Navigate to your contact form
3. Fill out the form and submit
4. Check your email to see if the message was received

## Troubleshooting

### Common Issues:

1. **"Failed to send message" error:**
   - Check that all IDs are correct in the config file
   - Verify your EmailJS account is active
   - Check browser console for detailed error messages

2. **Email not received:**
   - Check your spam folder
   - Verify the email service is properly connected
   - Test with a different email address

3. **CORS errors:**
   - EmailJS handles CORS automatically, but ensure you're using the latest version

### Security Notes:

- The public key is safe to expose in frontend code
- EmailJS handles rate limiting and spam protection
- Consider upgrading to a paid plan for production use

## Free Plan Limitations

- 200 emails per month
- Basic email templates
- Standard support

For production use, consider upgrading to a paid plan for:
- More emails per month
- Advanced features
- Priority support

## Additional Features

You can enhance the contact form by:

1. **Adding reCAPTCHA:**
   ```typescript
   // Add to your form validation
   if (!grecaptcha.getResponse()) {
     setError('Please complete the reCAPTCHA');
     return;
   }
   ```

2. **Custom success/error messages:**
   - The current implementation shows generic messages
   - You can customize them based on your needs

3. **Form validation:**
   - Add client-side validation for better UX
   - Validate email format, required fields, etc.

## Support

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Community](https://community.emailjs.com/)
- [GitHub Issues](https://github.com/emailjs/emailjs-com/issues) 