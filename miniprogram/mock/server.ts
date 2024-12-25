import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// 导入路由模块
import loginRoutes from './routes/login';
import userRoutes from './routes/user';


const app = express();
const port = 8080; // 本地服务器端口

// 中间件配置
app.use(cors());  // 允许跨域请求
app.use(bodyParser.json()); // 解析 JSON 数据
app.use(bodyParser.urlencoded({ extended: true })); // 解析表单数据

// 加载路由模块
app.use('/login', loginRoutes);
app.use('/user', userRoutes);

// 404 处理
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: '接口不存在',
    });
});


// 启动服务器  npx ts-node server.ts
app.listen(port, () => {
    console.log(`Mock server is running at http://localhost:${port}`);
});