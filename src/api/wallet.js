import Axios from "@/utils/http";

function listPaymentmethod(data) {
  return Axios.fetch("/api/paymentmethod!list.action", data);
}

function deletePaymentmethod(data) {
  return Axios.fetch("/api/paymentmethod!delete.action", data);
}

function addPaymentmethod(data) {
  return Axios.fetch("/api/paymentmethod!add.action", data);
}

//获得所有资产
//"forex->外汇,commodities->大宗商品，指数/ETF->indices,  A-stocks->A股,  HK-stocks->港股.US-stocks->美股，cryptos->虚拟货币

function getAllAssets(data) {
  return Axios.fetch("/api/assets!getAll.action", data);
}

// 资产的聚合接口
function getAggregationAssets(data) {
  return Axios.fetch("/api/assets!getAllAggregation.action", data);
}

//钱包历史记录
function getWalletHistory(data) {
  return Axios.fetch("/api/wallet/records.action", data);
}

//获取永续合约持有仓位列表，没有分页，前端分页
function getOrderList(data) {
  return Axios.fetch("/api/contractOrder!list.action", data);
}
//获取永续合约委托持有仓位列表，没有分页，前端分页
function getOrderApplyList(data) {
  return Axios.fetch("/api/contractApplyOrder!list.action", data);
}

//交割合约持有仓位列表
function getFutureList(data) {
  return Axios.fetch("/api/futuresOrder!list.action", data);
}

// 现货
function getSpotList(data) {
  return Axios.fetch("/api/exchangeapplyorder!list.action", data);
}

//钱包列表
function getWalletList(data) {
  return Axios.fetch("/api/wallet/list.action", data);
}
// 获取兑换后币种的数量和手续费
function getFee(data) {
  return Axios.fetch("/api/exchangeapplyorder!buy_and_sell_fee.action", data);
}

// 获取兑换的sessiontoken？？
function getExchangeapplyorderView(data) {
  return Axios.fetch("/api/exchangeapplyorder!view.action", data);
}

// 兑换接口
function getTrans(data) {
  return Axios.fetch("/api/exchangeapplyorder!buy_and_sell.action", data);
}

//矿池详情
function goMineDetail(data) {
  return Axios.fetch("/api/minerOrder!get.action", data);
}

//理财详情

function goDetail(data) {
  return Axios.fetch("/api/financeOrder!get.action", data);
}

//理财账户列表数据
function listFinanceOrder(data) {
  return Axios.fetch("/api/financeOrder!list.action", data);
}

//矿池锁仓列表
function listMinerOrder(data) {
  return Axios.fetch("/api/minerOrder!list.action", data);
}

function financeOrderOfClosOrder(data) {
  return Axios.fetch("/api/financeOrder!closOrder.action", data);
}

function minerOrderOfClosOrder(data) {
  return Axios.fetch("/api/minerOrder!closOrder.action", data);
}

function url(url, data) {
  return Axios.fetch(url, data);
}

export default {
  listPaymentmethod,
  deletePaymentmethod,
  addPaymentmethod,
  getAllAssets,
  getWalletHistory,
  getOrderList,
  getOrderApplyList,
  getFutureList,
  getWalletList,
  getFee,
  getExchangeapplyorderView,
  getTrans,
  goMineDetail,
  goDetail,
  listFinanceOrder,
  listMinerOrder,
  financeOrderOfClosOrder,
  minerOrderOfClosOrder,
  url,
  getSpotList,
  getAggregationAssets,
};
