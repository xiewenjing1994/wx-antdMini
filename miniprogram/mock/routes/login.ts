import express, { Request, Response } from 'express';

const router = express.Router();

// 登录接口
router.post('/', (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '123456') {
        res.json({
            success: true,
            data: {
                token: 'mockToken123',
                userInfo: {
                    name: '测试用户',
                    role: 'admin',
                },
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: '用户名或密码错误',
        });
    }
});

export default router;