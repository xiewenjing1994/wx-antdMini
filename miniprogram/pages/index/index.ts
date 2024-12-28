// index.ts
import {Login} from "../../../typings/types/login";
import {request} from "../../utils/service/serviceManager";
import {Storage} from "../../utils/storage";
import {StorageKeys} from "../../constants/storageKeys";
import Message from "../../utils/showMessage";

// 获取应用实例
// @ts-ignore
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'

Component({
  data: {
    motto: '前端技术总结',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  methods: {
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs',
      })
    },
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
      })
    },
    onInputChange(e: any) {
      const nickName = e.detail.value
      this.setData({
        "userInfo.nickName": nickName,
      })
    },
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    },
    onEnterButtonClick(e: any) {
      const username = e.detail.value || this.data.userInfo.nickName;
      if (username) {
        request.post<Login>('/login', { username, password: '123456' }).then(res => {
          const { token, userInfo } = res?.data;
          if (token) {
            Storage.set(StorageKeys.TOKEN, token);
            Storage.set(StorageKeys.USER_INFO, userInfo);
            wx.switchTab({
              url: '/pages/home/index'
            });
          }
        })

      } else {
        Message.showMessage({
          message: '请输入昵称',
          icon: 'error',
        });
      }
    }
  },
})
