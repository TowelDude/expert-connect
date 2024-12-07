-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create base tables
create table public.users (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null unique,
  name text not null,
  avatar_url text,
  role text check (role in ('client', 'expert')) not null
);

-- Expert profiles with required fields
create table public.expert_profiles (
  user_id uuid references public.users primary key,
  full_name text not null,
  professional_summary text not null,
  average_rating numeric(3,2) default 0 check (average_rating >= 0 and average_rating <= 5),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Service areas table
create table public.service_areas (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique
);

-- Topics table
create table public.topics (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique
);

-- Expert service areas junction table
create table public.expert_service_areas (
  expert_id uuid references public.users not null,
  service_area_id uuid references public.service_areas not null,
  primary key (expert_id, service_area_id)
);

-- Expert topics junction table
create table public.expert_topics (
  expert_id uuid references public.users not null,
  topic_id uuid references public.topics not null,
  primary key (expert_id, topic_id)
);

-- Reviews table
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  expert_id uuid references public.users not null,
  client_id uuid references public.users not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  review_text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Chat related tables
create table public.chats (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  client_id uuid references public.users not null,
  expert_id uuid references public.users not null,
  status text check (status in ('active', 'closed')) default 'active' not null,
  question text not null
);

create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  chat_id uuid references public.chats not null,
  sender_id uuid references public.users not null,
  content text not null
);

-- Create indexes for better performance
create index idx_expert_profiles_rating on public.expert_profiles(average_rating);
create index idx_expert_service_areas_expert on public.expert_service_areas(expert_id);
create index idx_expert_topics_expert on public.expert_topics(expert_id);
create index idx_reviews_expert on public.reviews(expert_id);
create index idx_messages_chat on public.messages(chat_id);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.expert_profiles enable row level security;
alter table public.service_areas enable row level security;
alter table public.topics enable row level security;
alter table public.expert_service_areas enable row level security;
alter table public.expert_topics enable row level security;
alter table public.reviews enable row level security;
alter table public.chats enable row level security;
alter table public.messages enable row level security;

-- Create RLS policies
create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Expert profiles are viewable by everyone"
  on public.expert_profiles for select
  using (true);

create policy "Expert profiles can be updated by the owner"
  on public.expert_profiles for update
  using (auth.uid() = user_id);

create policy "Service areas are viewable by everyone"
  on public.service_areas for select
  using (true);

create policy "Topics are viewable by everyone"
  on public.topics for select
  using (true);

create policy "Expert service areas are viewable by everyone"
  on public.expert_service_areas for select
  using (true);

create policy "Expert topics are viewable by everyone"
  on public.expert_topics for select
  using (true);

create policy "Reviews are viewable by everyone"
  on public.reviews for select
  using (true);

create policy "Reviews can be created by clients"
  on public.reviews for insert
  with check (
    auth.uid() = client_id and
    exists (
      select 1 from public.chats
      where client_id = auth.uid()
      and expert_id = reviews.expert_id
      and status = 'closed'
    )
  );

create policy "Users can view chats they're part of"
  on public.chats for select
  using (auth.uid() in (client_id, expert_id));

create policy "Users can insert chats"
  on public.chats for insert
  with check (auth.uid() = client_id);

create policy "Users can view messages in their chats"
  on public.messages for select
  using (
    exists (
      select 1 from public.chats
      where id = messages.chat_id
      and (client_id = auth.uid() or expert_id = auth.uid())
    )
  );

create policy "Users can insert messages in their chats"
  on public.messages for insert
  with check (
    exists (
      select 1 from public.chats
      where id = chat_id
      and (client_id = auth.uid() or expert_id = auth.uid())
    )
  );

-- Create function to update average rating
create or replace function public.update_expert_average_rating()
returns trigger as $$
begin
  update public.expert_profiles
  set 
    average_rating = (
      select avg(rating)::numeric(3,2)
      from public.reviews
      where expert_id = new.expert_id
    ),
    updated_at = now()
  where user_id = new.expert_id;
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for updating average rating
create trigger update_expert_rating
  after insert or update on public.reviews
  for each row
  execute function public.update_expert_average_rating();