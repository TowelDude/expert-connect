# ExpertConnect

ExpertConnect is a real-time platform that connects clients with experts across various fields. The application enables users to ask questions and get matched with relevant experts for live consultations.

## Features

- 🔍 Smart expert matching based on question context
- 💬 Real-time chat with experts
- ⭐ Expert profiles with ratings and reviews
- 📊 Comprehensive expert information including service areas and expertise
- 🔒 Secure authentication and data handling with Supabase

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Real-time subscriptions)
- **State Management**: Zustand
- **Routing**: React Router
- **UI Components**: Custom components with Tailwind CSS
- **Icons**: Lucide React

## Project Structure

```
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── chat/         # Chat-related components
│   │   ├── experts/      # Expert-related components
│   │   └── ui/           # Base UI components
│   ├── lib/              # Utility functions and configurations
│   │   ├── db/          # Database utilities
│   │   └── supabase.ts  # Supabase client configuration
│   ├── pages/           # Application pages/routes
│   ├── store/           # State management
│   └── types/           # TypeScript type definitions
├── supabase/
│   └── migrations/      # Database migrations
└── scripts/            # Utility scripts
```

## Getting Started

1. **Environment Setup**

   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**

   Run migrations to set up the database schema:
   ```bash
   npm run migrate
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Database Schema

### Core Tables
- `users`: Base user information
- `expert_profiles`: Detailed expert information
- `service_areas`: Available service categories
- `topics`: Specific areas of expertise
- `reviews`: Client reviews for experts

### Junction Tables
- `expert_service_areas`: Links experts to their service areas
- `expert_topics`: Links experts to their topics of expertise

### Communication Tables
- `chats`: Stores chat sessions between clients and experts
- `messages`: Individual chat messages

## Features in Detail

### Expert Matching
The platform matches experts based on:
- Service areas
- Topics of expertise
- Expert ratings
- Response time
- Availability

### Real-time Chat
- Instant messaging between clients and experts
- Message history preservation
- Chat status tracking (active/closed)

### Review System
- Rating system (1-5 stars)
- Text reviews
- Automatic average rating calculation
- Review verification (only allows reviews after completed chats)

## Security

The application implements Row Level Security (RLS) through Supabase, ensuring:
- Users can only access their own data
- Experts can only update their own profiles
- Reviews can only be created by verified clients
- Chat messages are only accessible to participants

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.