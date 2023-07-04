export const compareDates = (a: string | Date, b: string | Date) => {
  // Convert the dates to milliseconds since epoch
  
  const dateA = (new Date(a)).getTime();
  const dateB = (new Date(b)).getTime();

  // Compare the dates and return the result
  if (dateA < dateB) {
    return -1;
  } else if (dateA > dateB) {
    return 1;
  } else {
    return 0;
  }
};

export const compareNumber = (a: number, b: number) => {
  // Compare the dates and return the result
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
};

export function combineAndRemoveDuplicates(array1: any[], array2: any[]): any[] {
  const combinedArray = array1.concat(array2);
  const uniqueArray = combinedArray.filter((product, index, self) => {
    console.log(product)
    const productName = product.id;
    return (
      index ===
      self.findIndex(
        (p) => p.id === productName
      )
    );
  });
  return uniqueArray;
}

export function searchDatabyPropertyName(datasource: any[], query: string, propertyName: string): any[] {
  const normalizedQuery = toVietnamese(query).toLowerCase();

  return datasource.filter((data) => {
    const nestedProperties = propertyName.split('.'); // Split the property name by periods

    // Use reduce to access nested properties
    const propertyValue = nestedProperties.reduce((obj, prop) => {
      if (obj && obj.hasOwnProperty(prop)) {
        return obj[prop];
      }
      return undefined;
    }, data);

    if (propertyValue) {
      const normalizedPropertyValue = propertyValue.toLowerCase();
      const vietnamesePropertyValue = toVietnamese(propertyValue).toLowerCase();

      return (
        normalizedPropertyValue.includes(normalizedQuery) ||
        vietnamesePropertyValue.includes(normalizedQuery)
      );
    }

    return false;
  });
}

function toVietnamese(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}