# Fixing EmailJS "Recipients address is empty" Error

The error occurs because EmailJS needs the recipient email to be configured in your EmailJS service, not just in the template.

## 🔧 Step-by-Step Fix:

### Step 1: Configure Email Service in EmailJS Dashboard

1. **Go to EmailJS Dashboard**
   - Visit [EmailJS.com](https://www.emailjs.com/)
   - Log in to your account

2. **Edit Your Email Service**
   - Go to "Email Services" in the left sidebar
   - Find your service (`service_bvi8a64`)
   - Click "Edit" or the pencil icon

3. **Set Default Recipient Email**
   - Look for "Default Email" or "Recipient Email" field
   - Enter: `kev.cadogan300@gmail.com`
   - Save the service

### Step 2: Alternative Method - Update Template

If the above doesn't work, try this method:

1. **Edit Your Email Template**
   - Go to "Email Templates"
   - Edit template `template_6rb7yhk`

2. **Add Recipient Email in Template**
   - In the template editor, add this line somewhere:
   ```
   To: kev.cadogan300@gmail.com
   ```
   - Or use the template variable: `{{to_email}}`

3. **Update Template Variables**
   - Make sure your template includes the recipient email

### Step 3: Test the Configuration

1. **Test in EmailJS Dashboard**
   - Go to "Email Templates"
   - Click "Test" on your template
   - Fill in test data and send

2. **Test from Your Website**
   - Submit the contact form
   - Check if you receive the email

## 🎯 Quick Fix - Use Updated Template

Copy this template content to your EmailJS template:

```html
<!DOCTYPE html>
<html>
<head>
    <title>New Contact Form Message</title>
</head>
<body>
    <h2>New Contact Form Message</h2>
    
    <p><strong>From:</strong> {{from_name}} ({{from_email}})</p>
    <p><strong>Subject:</strong> {{subject}}</p>
    
    <h3>Message:</h3>
    <p>{{message}}</p>
    
    <hr>
    <p><small>Sent to: {{to_name}} at kev.cadogan300@gmail.com</small></p>
</body>
</html>
```

## 🔍 Troubleshooting:

### If Still Getting Error:

1. **Check Service Configuration**
   - Verify your email service is properly connected
   - Make sure the service has a default recipient email

2. **Check Template Variables**
   - Ensure all template variables are properly defined
   - Don't use `{{to_email}}` if not configured in service

3. **Alternative: Use Simple Template**
   - Create a new, simple template
   - Test with minimal variables first

### Common Solutions:

1. **Set Default Email in Service**
   - This is the most common fix
   - EmailJS needs to know where to send emails

2. **Use Template Variables**
   - Add recipient email as a template variable
   - Pass it from your form data

3. **Check EmailJS Documentation**
   - Visit [EmailJS Docs](https://www.emailjs.com/docs/)
   - Look for "recipient email" configuration

## 📞 Support:

If the issue persists:
1. Check EmailJS dashboard for any error messages
2. Verify your email service is active
3. Try creating a new email service
4. Contact EmailJS support if needed

The key is ensuring EmailJS knows where to send the emails - either through service configuration or template variables. 