import Axios from "@/utils/http";

//简况  https://enjdhdg.site/api/doc.html#/%E5%A4%96%E6%B1%87%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0/h5%E7%AE%80%E5%86%B5/queryByIdUsingGET_13
function getSummary(data) {
  return Axios.fetch("/api/item/itemSummary/get", data);
}
//获取成分股币对名称 https://enjdhdg.site/api/doc.html#/%E5%A4%96%E6%B1%87%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0/ETF%E6%80%BB%E7%B1%BB-api/getConstituentStockListUsingGET
function getStock(data) {
  return Axios.fetch("/api/projectBreed/getConstituentStockList", data);
}

export default {
  getStock,
  getSummary,
};
