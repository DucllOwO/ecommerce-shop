const getItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item && item != 'undefined' ? JSON.parse(item) : null;
};

const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const deleteItem = (key: string) => {
  localStorage.removeItem(key);
};

const LocalStorage = { getItem, setItem, deleteItem };

export default LocalStorage;