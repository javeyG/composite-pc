<template>
  <div class="layout">
    <select-time
      ref="selectTime"
      v-if="currentIndex === 1 || currentIndex === 2"
      @getTime="getTime"
    />
    <div class="title-wrapper">
      <template v-if="tabList && tabList.length > 0">
        <div class="item" v-for="(item, tabIndex) in tabList" :key="tabIndex">
          <span>{{ item.name }}</span>
          <i class="el-icon-caret-bottom" v-if="item.dropDown"></i>
        </div>
      </template>
    </div>
    <div class="content">
      <!-- 当前委托 -->
      <template v-if="currentIndex === 0">
        <template v-if="contentList.length !== 0">
          <div
            class="content-item"
            v-for="(cItem, cIndex) in contentList"
            :key="cIndex"
          >
            <div>{{ getCreateTime(cItem.create_time_ts) }}</div>
            <div>{{ cItem.name }}</div>
            <div>
              {{
                cItem.order_price_type == "limit"
                  ? $t("message.home.xianjiaweituo")
                  : $t("message.home.shijiaweituo")
              }}
            </div>
            <div :class="[cItem.offset == 'open' ? 'buy' : 'sell']">
              {{
                cItem.offset == "open"
                  ? $t("message.jiaoyi.mairu")
                  : $t("message.home.maichu")
              }}
            </div>
            <div>{{ cItem.price }} {{ unit }}</div>
            <div>
              {{ cItem.volume }}
            </div>
            <div>100%</div>
            <div>{{ (cItem.price * cItem.volume).toFixed(5) }}</div>
            <div>{{ cItem.price }}</div>
            <div @click="handleCancel(cItem)">
              <img
                class="cancel-img"
                src="@/assets/images/quotes/delete.png"
                alt=""
              />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="empty">{{ $t("message.home.txt1") }}</div>
        </template>
      </template>
      <!-- 历史委托 -->
      <template v-if="currentIndex === 1">
        <template v-if="contentList.length !== 0">
          <div
            class="content-item"
            v-for="(cItem, cIndex) in contentList"
            :key="cIndex"
          >
            <div>{{ getCreateTime(cItem.create_time_ts) }}</div>
            <div>{{ cItem.name }}</div>
            <div>
              {{
                cItem.order_price_type == "limit"
                  ? $t("message.home.xianjiaweituo")
                  : $t("message.home.shijiaweituo")
              }}
            </div>
            <div :class="[cItem.offset == 'open' ? 'buy' : 'sell']">
              {{
                cItem.offset == "open"
                  ? $t("message.jiaoyi.mairu")
                  : $t("message.home.maichu")
              }}
            </div>
            <div>--</div>
            <div>{{ cItem.price }}</div>
            <div>
              {{ cItem.volume }}
            </div>
            <div>{{ (cItem.price * cItem.volume).toFixed(5) }}</div>
            <div>{{ cItem.price }}</div>
            <div>{{ getStatus(cItem.state) }}</div>
          </div>
        </template>
        <template v-else>
          <div class="empty">{{ $t("message.home.zanwushuju") }}</div>
        </template>
      </template>
      <!-- 历史成交 -->
      <template v-if="currentIndex === 2">
        <template v-if="contentList.length !== 0">
          <div
            class="content-item"
            v-for="(cItem, cIndex) in contentList"
            :key="cIndex"
          >
            <div>{{ getCreateTime(cItem.create_time_ts) }}</div>
            <div>{{ cItem.name }}</div>
            <div :class="[cItem.offset == 'open' ? 'buy' : 'sell']">
              {{
                cItem.offset == "open"
                  ? $t("message.jiaoyi.mairu")
                  : $t("message.home.maichu")
              }}
            </div>
            <div>{{ cItem.price }}</div>
            <div>{{ cItem.volume }}</div>
            <div>{{ cItem.fee }}</div>
            <div>{{ (cItem.price * cItem.volume).toFixed(5) }}</div>
          </div>
        </template>
        <template v-else>
          <div class="empty">{{ $t("message.home.zanwushuju") }}</div>
        </template>
      </template>
      <!-- 资产管理,只展示有资产的数据 -->
      <template v-if="currentIndex === 3">
        <template v-if="contentList.length !== 0">
          <div v-for="(cItem, cIndex) in contentList" :key="cIndex">
            <div class="content-item">
              <div class="currency">
                <img class="symbol-img" :src="handleSymbolImg(cItem.symbol)" />
                {{ cItem.symbol.toUpperCase() }}/{{ unit }}
              </div>
              <div>{{ Number(cItem.volume).toFixed(8) }}</div>
              <div>{{ Number(cItem.usable).toFixed(8) }}</div>
              <div>
                {{ Number(cItem.lock_amount).toFixed(8) }}
              </div>
              <div>
                {{ Number(cItem.freeze_amount).toFixed(8) }}
              </div>
              <!-- <div>{{ cItem.availablePrice }}</div>
          <div>{{ cItem.orderLock }}</div>
          <div>{{ cItem.valuation }}</div> -->
            </div>
          </div>
        </template>

        <template v-else>
          <div class="empty">{{ $t("message.home.zanwushuju") }}</div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import SelectTime from "./SelectTime.vue";
import dayjs from "dayjs";
import { handleSymbolImg } from "@/utils";
export default {
  emits: ["cancelOrder", "getTime"],
  name: "Layout",
  props: ["currentIndex", "tabList", "contentList", "unit"],
  components: {
    SelectTime,
  },
  data() {
    return {};
  },
  watch: {
    contentList(val) {
      console.log(999999, val, val.length);
    },
  },
  methods: {
    handleSymbolImg,
    getCreateTime(item) {
      return dayjs.unix(item).format("YYYY-MM-DD HH:mm:ss");
    },
    fullColor(text) {
      return text === "sell" || text === "卖" || text === "賣";
    },
    getStatus(index) {
      if (index == "created") {
        return this.$t("message.user.yiwancheng");
      } else if (index == "canceled") {
        return this.$t("message.home.yichexiao");
      } else {
        return this.$t("message.home.yitijiao");
      }
    },

    //撤单
    handleCancel(item) {
      this.$emit("cancelOrder", item);
    },
    getTime(obj) {
      this.$emit("getTime", obj);
    },
    clearTime() {
      if (this.currentIndex === 1 || this.currentIndex === 2) {
        this.$refs.selectTime.clearTab();
      }
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.sell {
  color: #f6465d;
}

.buy {
  color: #0ecb81;
}

.justify-end:last-child,
.justify-end > div:last-child {
  justify-content: flex-end;
}

.layout {
  color: #fff;
}

.title-wrapper {
  display: flex;
  margin-top: 20px;
  padding-bottom: 11px;
  font-size: 14px;
  border-bottom: 1px solid #24272c;
  color: #929aa5;
}

.title-wrapper > div {
  flex: 1;
}

.title-wrapper .right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.title-wrapper .right span {
  margin-right: 6px;
  color: #1d91ff;
}

.title-wrapper .item {
  display: flex;
  align-items: center;
}

.title-wrapper .item i {
  margin-left: 6px;
}

.content {
  height: 320px;
  overflow: auto;
}

.content .empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 206px;
  font-size: 14px;
  color: #929aa5;
}

.content .content-item {
  display: flex;
  padding: 22px 0;
  font-size: 14px;
  border-bottom: 1px solid #24272c;
  color: #b7bdc6;
}

.content .content-item > div {
  flex: 1;
  display: flex;
  align-items: center;
  /* justify-content: flex-end; */
}

.content-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.content-right img {
  width: 19px;
}

.edit {
  width: 17px;
  margin-left: 6px;
}

.to-sort {
  position: relative;
  top: 5px;
  display: flex;
  flex-direction: column;
  /*font-size: 8px;*/
}

::v-deep .to-sort .el-icon-caret-top,
::v-deep .to-sort .el-icon-caret-bottom {
  font-size: 14px;
  transform: scale(0.8);
}

::v-deep .to-sort .el-icon-caret-bottom {
  position: relative;
  top: -8px;
}

.currency .el-icon-arrow-right {
  position: relative;
  top: 1px;
  margin-left: 5px;
}

.cancel-img {
  width: 19px;
}

.symbol-img {
  width: 20px;
  margin-right: 5px;
}
</style>
