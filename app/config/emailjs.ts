// EmailJS Configuration
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: "c9QFGsScc2DydmS1-", // Replace with your EmailJS public key
  SERVICE_ID: "service_bvi8a64", // Replace with your EmailJS service ID
  TEMPLATE_ID: "template_6rb7yhk", // Replace with your EmailJS template ID
  RECIPIENT_EMAIL: "kev.cadogan300@gmail.com", // Your email address where you want to receive messages
};

// Template parameters that will be sent to EmailJS
export interface EmailJSTemplateParams extends Record<string, unknown> {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  to_name: string;
} 