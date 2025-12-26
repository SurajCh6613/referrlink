export const setWithExpiry = (key, value, expiryInMs) => {
  const now = Date.now();
  let item = {
    expiry: now + expiryInMs,
    value,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  const item = JSON.parse(itemStr);
  const now = Date.now();
  if (now > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const updateValueKeepExpiry = (key, newValue) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return false;
  const item = JSON.parse(itemStr);

  const now = Date.now();
  if (now > item.expiry) {
    localStorage.removeItem(key);
    return false;
  }
  const updatedItem = {
    value: newValue,
    expiry: item.expiry,
  };
  localStorage.setItem(key, JSON.stringify(updatedItem));
  return true;
};
