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
  }

  convertToAscii(input: string): string {
    // Remove diacritics using unidecode library
    const normalizedString = input.normalize('NFD');
    const asciiString = normalizedString.replace(/[\u0300-\u036f]/g, '');

    return asciiString;
  }

  recommendForProduct(productId: string) {
    return this.recommender.getSimilarDocuments(productId);
  }

  private extractFeatures(products: Product[]): IDocument[] {
    const keysToExtract = ['name', 'HaveTag', 'collection'];
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
