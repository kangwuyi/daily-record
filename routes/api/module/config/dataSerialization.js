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

  /**
   * 数组排序
   */
  data.sort(function (a, b) {
    if (ifNumber(a.rb_datenote_date) < ifNumber(b.rb_datenote_date)) {
      return -1;
    } else if (ifNumber(a.rb_datenote_date) > ifNumber(b.rb_datenote_date)) {
      return 1;
    }
    return 0;
  });
  /**
   * 数据去重并合并
   * @param arr
   * @returns {Array}
   */
  function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem, dateCache; ((elem = arr[i]) && (dateCache = (new Date(ifNumber(arr[i].rb_datenote_date))).format('yyyy-MM-dd'))) != null; i++) {
      if (!hash[dateCache]) {
        result.push(elem);
        hash[dateCache] = true;
      } else {
        for(var j = 0; j < result.length; j++){
          if((new Date(ifNumber(result[j].rb_datenote_date))).format('yyyy-MM-dd') === dateCache){
            var contentCacheOld = result[j].rb_datenote_content
              ,contentCacheNew = arr[i].rb_datenote_content;
            result[j].rb_datenote_content = contentCacheOld + contentCacheNew;
          }
        }
      }
    }
    return result;
  }
  return unique(data);
};