import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from '@supabase/supabase-js'
import { ReviewSubmission } from '../types.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const { expert_id, rating, review_text } = await req.json() as ReviewSubmission
    const client_id = req.headers.get('x-user-id')

    if (!client_id) {
      throw new Error('Unauthorized')
    }

    // Verify completed chat exists
    const { data: chat, error: chatError } = await supabaseClient
      .from('chats')
      .select()
      .eq('client_id', client_id)
      .eq('expert_id', expert_id)
      .eq('status', 'closed')
      .single()

    if (chatError) {
      throw new Error('No completed chat found with this expert')
    }

    // Submit review
    const { data: review, error: reviewError } = await supabaseClient
      .from('reviews')
      .insert({
        expert_id,
        client_id,
        rating,
        review_text,
      })
      .select()
      .single()

    if (reviewError) throw reviewError

    return new Response(JSON.stringify(review), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})