import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from '@supabase/supabase-js'
import { ExpertMatchResult } from '../types.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface MatchRequest {
  question: string
  service_area_ids?: string[]
  topic_ids?: string[]
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { question, service_area_ids, topic_ids } = await req.json() as MatchRequest

    // Query experts based on service areas and topics
    const { data: experts, error } = await supabaseClient
      .from('expert_profiles')
      .select(`
        user_id,
        full_name,
        professional_summary,
        average_rating,
        expert_service_areas (service_area_id),
        expert_topics (topic_id)
      `)
      .order('average_rating', { ascending: false })
      .limit(5)

    if (error) throw error

    // Calculate match scores based on service areas and topics
    const matches: ExpertMatchResult[] = experts.map((expert) => {
      const expertServiceAreas = expert.expert_service_areas.map(
        (esa) => esa.service_area_id
      )
      const expertTopics = expert.expert_topics.map((et) => et.topic_id)

      // Calculate match score based on overlapping areas and topics
      const serviceAreaMatch = service_area_ids
        ? service_area_ids.filter((id) => expertServiceAreas.includes(id)).length /
          service_area_ids.length
        : 1
      const topicMatch = topic_ids
        ? topic_ids.filter((id) => expertTopics.includes(id)).length /
          topic_ids.length
        : 1

      return {
        expert_id: expert.user_id,
        match_score: (serviceAreaMatch + topicMatch) / 2,
        service_areas: expertServiceAreas,
        topics: expertTopics,
      }
    })

    return new Response(JSON.stringify(matches), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})