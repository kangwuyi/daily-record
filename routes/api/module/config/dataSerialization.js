var dateFormat = require('./dateFormat');
/**
 * 序列化包含日期的 JSON 对象
 * @param data
 * @returns {*}
 */
exports.dataSerialization = function (data) {
  function ifNumber(isNumber) {
    return (typeof isNumber === 'number') ? isNumber : Number(isNumber);
  }

  data.sort(function (a, b) {
    if (ifNumber(a.rb_datenote_date) < ifNumber(b.rb_datenote_date)) {
      return -1;
    } else if (ifNumber(a.rb_datenote_date) > ifNumber(b.rb_datenote_date)) {
      return 1;
    }
    return 0;
  });
  return data;
};