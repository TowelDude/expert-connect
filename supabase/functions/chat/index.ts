import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from '@supabase/supabase-js'
import { ChatMessage } from '../types.ts'

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

    const { chat_id, content, sender_id } = await req.json()

    // Verify chat participant
    const { data: chat, error: chatError } = await supabaseClient
      .from('chats')
      .select('client_id, expert_id, status')
      .eq('id', chat_id)
      .single()

    if (chatError) throw chatError
    if (chat.status !== 'active') {
      throw new Error('Chat is not active')
    }
    if (sender_id !== chat.client_id && sender_id !== chat.expert_id) {
      throw new Error('Unauthorized')
    }

    // Insert message
    const { data: message, error: messageError } = await supabaseClient
      .from('messages')
      .insert({
        chat_id,
        sender_id,
        content,
      })
      .select()
      .single()

    if (messageError) throw messageError

    return new Response(JSON.stringify(message), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})