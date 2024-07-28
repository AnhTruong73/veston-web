export const formatCurrencyVND = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

export const formatISODateGMT7 = (value) => {
  const create_date = new Date(value);
  const utcTimestamp = create_date.getTime() - create_date.getTimezoneOffset() * 60 * 1000;
  const utcDate = new Date(utcTimestamp);
  return utcDate;
}

export const parseCurrency = (value) => {
  console.log(value);
  return (value + '').replace(/[^\d]/g, ''); // Loại bỏ các ký tự không phải số
};
