# 干饭人格 MBTI

一个适配移动端的五题互动测试，可直接部署到 GitHub Pages。

## 项目结构

```text
.
├── index.html              # 首页 / GitHub Pages 入口
├── quiz.html               # 测试与结果页
├── README.md               # 项目说明
└── assets
    ├── css/                # 首页、题目页样式与滑动动画
    ├── js/app.js           # 选项、计分、返回和结果逻辑
    ├── images/             # PNG 人格结果图
    └── svg/                # 题目及选中态 SVG
```

## GitHub Pages 部署

1. 将本目录中的全部文件上传到 GitHub 仓库根目录。
2. 打开仓库的 **Settings → Pages**。
3. 在 **Build and deployment** 中选择 **Deploy from a branch**。
4. 选择部署分支（通常为 `main`）和根目录 `/ (root)`，然后保存。
5. 等待 GitHub Pages 生成访问地址。

所有资源均使用相对路径，可部署在用户主页仓库或普通项目仓库中，无需构建工具。

## 计分规则

- A 至少 3 票：香酥小酥肉
- B 至少 3 票：爆辣小米椒
- C 至少 3 票：流心芋泥卷
- D 至少 3 票：蒜蓉烤生蚝
- 所有选项最高票数不超过 2：虾搞艺术家（爆炒基围虾）
