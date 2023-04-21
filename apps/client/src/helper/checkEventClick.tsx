export const isClickOnAnImgTag = (event: React.MouseEvent) => {
  const target = event.target as Element;
  if (target.tagName === 'IMG') {
    return true;
  }
  return false;
}

export const isClickOnAnSVGTag = (event: React.MouseEvent) => {
  const target = event.target as Element;
  if (target.tagName === 'svg' || target.tagName === 'path') {
    return true;
  }
  return false;
}