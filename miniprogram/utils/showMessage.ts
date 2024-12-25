interface ShowMessageOptions {
    title?: string; // 标题，仅适用于 showModal
    message: string; // 提示内容
    showCancel?: boolean; // 是否显示取消按钮，适用于 showModal
    confirmText?: string; // 确认按钮文字，适用于 showModal
    cancelText?: string; // 取消按钮文字，适用于 showModal
    icon?: 'success' | 'error' | 'loading' | 'none'; // 图标，仅适用于 showToast
    duration?: number; // 持续时间，仅适用于 showToast
    debounce?: boolean; // 是否启用防抖
}

class Message {
    private isToastVisible: boolean; // 防抖标志

    private constructor() {
        this.isToastVisible = false;
    }

    /**
     * 显示消息提示
     * 根据消息长度自动选择 wx.showToast 或 wx.showModal
     * @param options ShowMessageOptions
     */

    public showMessage(options: ShowMessageOptions): void {
        const {
            title = '提示',
            message = '',
            showCancel = false,
            confirmText = '知道了',
            cancelText = '取消',
            icon = 'none',
            duration = 2000,
            debounce = true, // 默认启用防抖
        } = options;

        // 防抖逻辑：如果当前正在显示提示，直接返回
        if (this.isToastVisible) {
            return;
        }

        // 设置防抖标志
        if (debounce) {
            this.isToastVisible = true;
        }

        if (message.length <= 14) {
            // 使用 wx.showToast
            wx.showToast({
                title: message,
                icon: icon,
                duration: duration,
            });
        } else {
            // 使用 wx.showModal
            wx.showModal({
                title: title,
                content: message,
                showCancel,
                confirmText,
                cancelText,
            });
        }

        // 设置定时器，防抖解除
        if (debounce) {
            setTimeout(() => {
                this.isToastVisible = false;
            }, duration);
        }
    }
}

export default new Message();