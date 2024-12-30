import express, { Request, Response } from 'express';
import axios from 'axios';

// 微信接口信息
const WECHAT_APPID = 'wx54d170186235d475';
const WECHAT_SECRET = '4bdbe2a119c7b079a7d864cb8d496a7c';
const WX_API = 'https://api.weixin.qq.com/sns/jscode2session';

const router = express.Router();

// 登录接口
router.post('/', async (req: Request, res: Response) => {
    const { username, password, code } = req.body;

    // 模拟验证用户名和密码
    if (username === 'admin' && password === '123456') {
        try {
        // 调用微信的 jscode2session 接口获取 session_key 和 openid
            const response = await axios.get(WX_API, {
                params: {
                    appid: WECHAT_APPID,
                    secret: WECHAT_SECRET,
                    js_code: code,
                    grant_type: 'authorization_code',
                }
            })

            const { openid, session_key, errcode, errmsg } = response.data;
            if (errcode) {
                return res.status(400).json({
                    success: false,
                    message: errmsg || '微信登录失败',
                });
            }

            // 如果微信接口成功返回，生成登录 token 并返回
            res.json({
                success: true,
                data: {
                    token: 'mockToken123',
                    openid,
                    session_key,
                    userInfo: {
                        name: '测试用户',
                        role: 'admin',
                    },
                }
            });

        } catch (error) {
            console.error('调用微信 jscode2session 接口失败', error);
            res.status(500).json({
                success: false,
                message: '服务器错误',
            });
        }
    } else {
        res.status(401).json({
            success: false,
            message: '用户名或密码错误',
        });
    }
});

export default router;