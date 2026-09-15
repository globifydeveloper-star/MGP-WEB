# MGP-WEB (Muthoot Gold Price - Web)

MGP-WEB is the frontend Next.js application for the Muthoot Exim Gold Price ecosystem. It connects to a Strapi backend for content management and interfaces with external Muthoot Exim APIs for live gold quotes and branch information.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS / Modules
- **Backend CMS**: Strapi (v4/v5)
- **Containerization**: Docker (Multi-stage build)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v22 recommended)
- npm or yarn

## Environment Variables

Copy the `.env.example` file to `.env.local` for local development:
```bash
cp .env.example .env.local
```

You must provide the following required environment variable for Next.js to start:
- `NEXT_PUBLIC_STRAPI_URL`: The URL of your Strapi backend.

Optional environment variables:
- `NEXT_PUBLIC_BRANCH_MASTER_BASE_URL`: API Base URL for branch details.
- `GOLD_QUOTE_BASE_URL`: API Base URL for fetching live gold quotes.
*(See `.env.example` for all required server-side secrets)*

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

To build the Docker image locally for production testing:
```bash
docker build --build-arg NEXT_PUBLIC_STRAPI_URL=http://your-strapi-url -t mgp-web .
```

Run the container:
```bash
docker run -p 3000:3000 mgp-web
```
