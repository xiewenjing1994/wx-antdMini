import express, { Request, Response } from 'express';

const router = express.Router();

// 获取用户信息
router.get('/', (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if (token === 'Bearer mockToken123') {
        res.json({
            success: true,
            data: {
                name: '测试用户',
                email: 'test@example.com',
            },
        });
    } else {
        res.status(403).json({
            success: false,
            message: '无效的 Token',
        });
    }
});

export default router;
