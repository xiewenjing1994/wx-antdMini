// index.ts
// 获取应用实例
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
      if (e.detail.value || this.data.userInfo.nickName) {
        wx.navigateTo({
          url: '/pages/home/index'
        });
      } else {
        wx.showToast({
          title: '请输入昵称',
          icon: 'none',
        });
      }
    }
  },
})
