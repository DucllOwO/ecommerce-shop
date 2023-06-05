import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcXJoandyY3VlYmhjZ2VocXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM1NTU0MjcsImV4cCI6MTk3OTEzMTQyN30.qVvPy3wo0vZcY4mUP4OZyB1gugJzSJAMGgSW8_YkhKI"
const SUPABASE_URL = "https://vdqrhjwrcuebhcgehqvl.supabase.co"


// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_URL)

// Upload file using standard upload
async function uploadProductImage(file: any, fileName: string) {
  const { data, error } = await supabase.storage.from('product').upload(fileName, file)
  if (error) {
    console.log(error)
    throw new Error();
  } else {
    return data;
  }
}

async function uploadAvatarImage(file: any, fileName: string) {
    const { data, error } = await supabase.storage.from('avatar').upload(fileName, file)
    if (error) {
        console.log(error);
        throw new Error();
    } else {
        return data;
    }
}

export {
    uploadProductImage,

}
