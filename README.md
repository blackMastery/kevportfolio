# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Environment Variables

This application requires the following environment variables:

- `OPENAI_API_KEY` - Your OpenAI API key (required for the chatbot feature)
  - Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
  - Add it to your `.env` file in the project root:
    ```
    OPENAI_API_KEY=your_api_key_here
    ```
  - **Note:** This is a server-side only variable (no `PUBLIC_` prefix needed)

## Development

Run the dev server:

```sh
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Features

### Chatbot

The portfolio includes an AI-powered chatbot that can answer questions about the portfolio content. The chatbot:

- Uses OpenAI Agents SDK with guardrails for security
- Classifies user intents and routes to appropriate agents
- Provides information about skills, experience, projects, and services
- Features a floating widget UI accessible from any page
- Includes guardrails to prevent jailbreak attempts and protect against security issues

The chatbot is available site-wide via a floating button in the bottom-right corner.

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
# kevoncadoganportfolio
