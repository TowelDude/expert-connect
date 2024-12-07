import { useState, useEffect } from 'react';
import { getChatMessages, subscribeToChat } from '../lib/api';
import type { Database } from '../types/database';

type Message = Database['public']['Tables']['messages']['Row'];

export function useChat(chatId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadMessages() {
      try {
        const data = await getChatMessages(chatId);
        if (isMounted) {
          setMessages(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          const stringError = err.message;
          setError(
            err instanceof Error
              ? err
              : new Error(`Failed to load messages, ${stringError}`)
          );
          setLoading(false);
        }
      }
    }

    loadMessages();

    const subscription = subscribeToChat(chatId, (message) => {
      if (isMounted) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      isMounted = false;
      subscription.then((sub) => sub.unsubscribe());
    };
  }, [chatId]);

  return { messages, loading, error };
}
