export const isClickOnAnImgTag = (event: React.MouseEvent) => {
  const target = event.target as Element;
  if (target.className.includes('ant-image')) {
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