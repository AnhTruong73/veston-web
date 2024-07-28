export default function ResponseObject(status_res, message_res, rows_res, key_res, data_key_res) {
  return {
    status: status_res,
    message: message_res,
    data: {
      rows: rows_res,
      key: data_key_res,
    }
  };
}
