import { Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import ContentBasedRecommender from 'content-based-recommender-ts';
import IDocument from './IDocument';
@Injectable()
export class RecommenderService {
  private recommender: ContentBasedRecommender;

  setRecommender(recommender: ContentBasedRecommender) {
    this.recommender = recommender;
  }

  train(products: Product[]): void {
    // Initialize the product features
    this.recommender.train(this.extractFeatures(products));
    console.log(this.recommender.getSimilarDocuments('1'));
    console.log(this.recommender.getSimilarDocuments('2'));
    console.log(this.recommender.getSimilarDocuments('3'));
    console.log(this.recommender.getSimilarDocuments('4'));
    console.log(this.recommender.getSimilarDocuments('5'));
    console.log(this.recommender.getSimilarDocuments('6'));
  }

  convertToAscii(input: string): string {
    // Remove diacritics using unidecode library
    const normalizedString = input.normalize('NFD');
    const asciiString = normalizedString.replace(/[\u0300-\u036f]/g, '');

    return asciiString;
  }

  // recommend(productId: string): string[] {
  //   const features = this.productFeatures.get(productId);

  //   // Implement the recommendation logic based on the features
  //   // You can use similarity measures like cosine similarity to find similar products

  //   return []; // Return an array of recommended product IDs
  // }

  private extractFeatures(products: Product[]): IDocument[] {
    const keysToExtract = [
      'name',
      'description',
      'HaveTag',
      'collection',
      'slug',
    ];
    return products.map((product) => {
      const content = '';
      const document: IDocument = { id: '', content: '' };

      // Extract name, description, tags, collection from product
      const extractedValues = keysToExtract.map((key: string) => {
        if (key === 'HaveTag')
          return product[key]
            ? product[key]
                .map((value: any) => {
                  return value.tag.name;
                })
                .join(' ')
            : '';
        if (key === 'collection') return product[key] ? product[key].name : '';

        return product[key] ? product[key] : '';
      });
      const extractedStrings = extractedValues.map((value) => value.toString());

      document.id = product.id.toString();
      document.content = this.convertToAscii(extractedStrings.join(' '));

      return document;
    });
  }
}
