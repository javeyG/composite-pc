import Axios from "@/utils/http";
import axios from "axios";
import { compress } from "image-conversion";

// 获取消息列表
export const _getMsg = (message_id = "", show_img = true) => {
  return new Promise((resolve, reject) => {
    Axios.fetch("api/newOnlinechat!list.action", { message_id, show_img }).then(
      (res) => {
        resolve(res.data);
      }
    );
  });
};

// 未读消息
export const _getUnreadMsg = () => {
  return Axios.fetch("api/newOnlinechat!unread.action", params);
};

// 发送消息
export const _sendMsg = (type = "text", content = "") => {
  return Axios.fetch("api/newOnlinechat!send.action", { type, content });
};

// 图片上传,压缩
export const _uploadImage = (file, callback) => {
  console.log(file);
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    Toast.fail("上传头像图片大小不能超过 10MB!");
    return false;
  }

  const BASE_URL = "https://galaxyhkvip.top";
  return new Promise((resolve, reject) => {
    compress(file, 0.6).then((res) => {
      const formData = new FormData();
      formData.append("file", res);
      axios
        .post(
          `${BASE_URL}/api/api/uploadFile`,
          formData,
          {
            onDownloadProgress: (progressEvent) => {
              console.log(progressEvent);
              if (progressEvent.lengthComputeable) {
                callback(
                  ((progressEvent.loaded / progressEvent.total) * 100).toFixed(
                    2
                  )
                );
              }
            },
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((res) => {
          // Toast.clear()
          const { code, data } = res.data;
          if (code / 1 === 0) {
            resolve(data);
          }
        })
        .catch((err) => {
          // Toast.clear()
          reject(err);
        });
    });
  });
};

export default {
  _uploadImage,
  _getMsg,
  _sendMsg,
  _getUnreadMsg,
};
