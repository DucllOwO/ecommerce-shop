export const isClickOnAnImgTag = (event: React.MouseEvent) => {
  const target = event.target as Element;
  if (target.className.includes('ant-image')) {
    return true;
  }
  return false;
}

export const isClickOnAnSVGTag = (event: React.MouseEvent) => {
  const target = event.target as Element;
  if (target.tagName === 'svg' || target.tagName === 'path' || target.tagName.toLowerCase() === 'button'|| target.tagName === 'span') {
    return true;
  }
  return false;
}

export const isClickValidToOpenDetail = (event: React.MouseEvent) => {
  const target = event.target as Element;
  const tagName = target.tagName.toLowerCase();
  if (target.className.includes('ant-image') || tagName === 'svg' || tagName === 'path' || tagName === 'button'|| tagName === 'span') {
    return false;
  }
  return true;
}


export const isClickOnATableCell = (event: React.MouseEvent) => {
  const target = event.target as Element;
  if (typeof target.className === 'string' && target.className?.includes('ant-table-cell')) {
    return true;
  }
  return false;
}