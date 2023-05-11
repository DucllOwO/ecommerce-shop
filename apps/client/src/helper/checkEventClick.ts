export const isClickOnAnImgTag = (event: React.MouseEvent) => {
  const target = event.target as Element;
  if (target.className.includes('ant-image')) {
    return true;
  }
  return false;
}

export const isClickOnAnSVGTag = (event: React.MouseEvent) => {
  const target = event.target as Element;
  if (target.tagName === 'svg' || target.tagName === 'path' || target.tagName.toLowerCase() === 'button') {
    return true;
  }
  return false;
}

export const isClickOnATableCell = (event: React.MouseEvent) => {
  const target = event.target as Element;
  if (typeof target.className === 'string' && target.className?.includes('ant-table-cell')) {
    return true;
  }
  return false;
}