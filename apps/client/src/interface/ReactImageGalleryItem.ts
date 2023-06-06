export interface ReactImageGalleryItem {
  bulletClass?: string | undefined;
  bulletOnClick?({
      item,
      itemIndex,
      currentIndex,
  }: {
      item: ReactImageGalleryItem;
      itemIndex: number;
      currentIndex: number;
  }): void;
  description?: string | undefined;
  original: string;
  originalHeight?: number | undefined;
  originalWidth?: number | undefined;
  thumbnailHeight?: number | undefined;
  thumbnailWidth?: number | undefined;
  fullscreen?: string | undefined;
  originalAlt?: string | undefined;
  originalTitle?: string | undefined;
  thumbnail?: string | undefined;
  thumbnailAlt?: string | undefined;
  thumbnailLabel?: string | undefined;
  thumbnailTitle?: string | undefined;
  originalClass?: string | undefined;
  thumbnailClass?: string | undefined;
  renderItem?(item: ReactImageGalleryItem): React.ReactNode;
  renderThumbInner?(item: ReactImageGalleryItem): React.ReactNode;
  srcSet?: string | undefined;
  sizes?: string | undefined;
  loading?: 'lazy' | 'eager' | undefined;
  thumbnailLoading?: 'lazy' | 'eager' | undefined;
}