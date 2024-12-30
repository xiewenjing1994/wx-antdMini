# 服务模块

## 功能概述
服务层实现了微信小程序中的统一服务管理框架，采用了 **单例模式**，并包含以下主要功能：

1. **网络请求服务**（RequestService）：封装 GET、POST 和 PUT 请求，支持自动携带 Token 和统一的错误提示处理。
2. **本地存储服务**（StorageService）：封装小程序本地存储操作，支持数据的存储、读取、删除和清空。
3. **服务管理**（ServiceManager）：统一注册，采用单例模式管理所有服务，确保服务实例的全局唯一性，并通过 Map 存储所有注册的服务实例。

## 文件结构

```
service/
├── request/
│   ├── requestService.ts    // 网络请求接口，定义 GET、POST 和 PUT 方法
│   ├── requestImpl.ts       // 网络请求实现类，封装 wx.request 的调用逻辑
├── storage/
│   ├── storageService.ts    // 本地存储接口，定义存储和读取方法
│   ├── storageImpl.ts       // 本地存储实现类，封装 wx.setStorageSync 等调用
├── serviceManager.ts         // 管理所有服务实例，提供注册与访问功能
├── service.ts                // 顶级服务接口，定义统一结构
```

1. 顶级服务接口`IService`:
   - 定义服务的标识符`serviceKey`，每个服务通过`serviceKey`唯一标识。
   - 所有服务（如`RequestService`、`StorageService`）必须实现该接口，保证模块的统一性和可扩展性。
2. 网络请求服务：
   - 接口定义`RequestService`: 定义了网络请求服务的基本操作，包括 GET、POST 和 PUT。
   - 实现类`RequestImpl`: 实现了`RequestService`接口，封装了对 wx.request 的调用逻辑。
3. 本地存储服务:
   - 接口定义`StorageService`: 定义了本地存储服务的基本操作，如存储、读取、删除和清空数据。
   - 实现类`StorageImpl`: 封装了对微信小程序 `wx.setStorageSync`和 `wx.getStorageSync`等存储方法的调用。
4. 服务管理类`ServiceManager`:
   - **服务注册**: 通过`registerService`方法，将服务实例存储到`Map`中。
   - **服务获取**：通过`getService`方法，根据`serviceKey`从`Map`中获取对应的服务实例。
   - **服务唯一性**：通过`hasService`方法检查某个服务是否已注册。
   - **服务唯一性**：通过`removeService`方法移除指定服务实例。


## 流程说明

1. 服务初始化：
   - 通过`ServiceManager`统一注册和管理服务。
   - 内置服务（`RequestService` 和 `StorageService`）会在首次调用时自动注册。
2. 网络请求服务：
    - Token 初始化：从本地存储中获取用户 Token，并自动附加到请求头中。
    - 发起请求：通过封装的 get、post 或 put 方法发送请求。
    - 处理响应：
        - 请求成功时，返回服务端响应数据。
        - 请求失败时，通过错误提示框展示问题。
        - 对服务器返回的非 200 状态码（如 401 未授权）可统一处理，如提示用户重新登录。
3. 本地存储服务：
    - 存储数据：通过 set 方法存储数据，支持 JSON 序列化。
    - 读取数据：通过 get 方法读取数据，支持 JSON 反序列化。
    - 删除数据：调用 removeItem 方法删除指定键的数据。
    - 清空数据：调用 clear 方法清空所有本地存储。

## 安全考虑

- Token 安全性：在网络请求中自动携带 Token，并通过 HTTPS 加密传输，确保用户数据安全。
- 错误提示机制：统一处理网络请求失败的情况，展示友好错误提示信息(封装的showMessage方法)。
- 本地存储安全性：对复杂对象进行 JSON 序列化，确保存储格式一致。

## 关键技术

- **单例模式**：实现服务的唯一实例管理。
- **微信小程序 API 封装**：
   - 使用`wx.request`封装网络请求逻辑。
   - 使用`wx.setStorageSync`和`wx.getStorageSync`封装本地存储逻辑。
- **Token 管理**：在请求头中自动附加`Authorization`字段，便于后端认证。

## 关键字段

- Token：用于 API 请求的身份认证，自动附加到请求头中。
- 请求头：包含 Authorization 字段，携带用户 Token。
- 本地存储键值：存储用户的登录信息及其他业务数据。
