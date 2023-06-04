import { Injectable } from '@nestjs/common';
import supabase from 'supabase';

@Injectable()
export class ImageService {

    async uploadImage(newImage: any): Promise<any | null>{
        const { data, error } = await supabase.storage.from('product').upload(
            newImage.originalname, 
            newImage.buffer, 
            {
                upsert: true,
            })
        if (error) {
          console.log(error)
          throw new Error();
        } else {
          return data;
        }    
    }
    async deleteImage(fileURL: string): Promise<any | null>{
        const { data, error } = await supabase.storage.from('product').remove([fileURL]);
        if (error) {
          console.log(error)
          throw new Error();
        } else {
          return data;
        }    
    }
}
