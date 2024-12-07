import { useState, useEffect } from 'react';
import { getExpertProfile } from '../lib/api';
import type { Database } from '../types/database';

type ExpertProfile = Database['public']['Tables']['expert_profiles']['Row'];

export function useExpertProfile(userId: string) {
  const [profile, setProfile] = useState<ExpertProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getExpertProfile(userId);
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load profile'));
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [userId]);

  return { profile, loading, error };
}