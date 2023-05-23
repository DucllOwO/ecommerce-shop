import { createClient } from '@supabase/supabase-js'

console.log(process.env.SUPABASE_URL)
console.log(process.env.SUPABASE_KEY)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default supabase;