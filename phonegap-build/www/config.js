/**
 * SmartGo AI 配置文件
 *
 * 支持的AI服务提供商：
 * 1. OpenAI (ChatGPT)
 * 2. 百度文心一言 (Ernie Bot)
 * 3. 讯飞星火 (Spark)
 * 4. 阿里通义千问 (Qwen)
 */

const AI_CONFIG = {
    // 当前使用的AI服务提供商
    // 可选值: 'openai', 'baidu', 'xunfei', 'ali', 'mock'
    provider: 'mock', // 默认使用模拟模式，请修改为实际的服务商

    // OpenAI 配置
    openai: {
        apiKey: 'YOUR_OPENAI_API_KEY', // 请替换为你的API Key
        apiUrl: 'https://api.openai.com/v1/chat/completions',
        model: 'gpt-3.5-turbo',
        maxTokens: 500,
        temperature: 0.7
    },

    // 百度文心一言配置
    baidu: {
        apiKey: 'YOUR_BAIDU_API_KEY', // 请替换为你的API Key
        secretKey: 'YOUR_BAIDU_SECRET_KEY', // 请替换为你的Secret Key
        apiUrl: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions',
        model: 'ERNIE-Bot-turbo'
    },

    // 讯飞星火配置
    xunfei: {
        appId: 'YOUR_XUNFEI_APP_ID', // 请替换为你的APP ID
        apiKey: 'YOUR_XUNFEI_API_KEY', // 请替换为你的API Key
        apiSecret: 'YOUR_XUNFEI_API_SECRET', // 请替换为你的API Secret
        apiUrl: 'wss://spark-api.xf-yun.com/v3.5/chat',
        model: 'generalv3.5'
    },

    // 阿里通义千问配置
    ali: {
        apiKey: 'YOUR_ALI_API_KEY', // 请替换为你的API Key
        apiUrl: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
        model: 'qwen-turbo'
    },

    // 系统提示词（所有AI服务共用）
    systemPrompt: `你是SmartGo AI，一个专业的智能出行助手。你的任务是帮助用户规划公交出行路线。

你的特点：
1. 友好、热情、耐心
2. 专业的公交线路知识
3. 能够理解用户的出行需求
4. 提供简洁明了的建议

当前可用信息：
- 用户位置：上海张江地区
- 主要线路：浦东14路（张江地铁站 - 益江路盛夏路）
- 附近地铁：2号线张江高科站

回答要求：
1. 简洁明了，一次回答不超过150字
2. 如果涉及具体路线，给出清晰的换乘方案
3. 可以询问用户的具体需求以提供更好的建议
4. 语气友好，使用"您"称呼用户`,

    // API请求超时时间（毫秒）
    timeout: 10000,

    // 是否启用调试模式
    debug: true
};

// 模拟AI响应（用于测试）
const MOCK_RESPONSES = {
    '张江地铁站': '好的！去张江地铁站很方便，您可以乘坐浦东14路直达，大约3站即可到达。全程约10分钟，票价2元。',
    '附近': '您好！您附近有以下公交站点：\n1. 盛荣路站（浦东14路）- 距离您200米\n2. 张江高科地铁站 - 距离您300米\n\n推荐乘坐地铁2号线，可快速到达市区各地。',
    '人民广场': '去人民广场建议这样走：\n1. 步行至张江高科站（300米）\n2. 乘坐地铁2号线（往徐泾东方向）\n3. 约40分钟到达人民广场站\n\n或者乘坐浦东14路换乘其他线路，但时间较长。',
    '浦东14路': '浦东14路实时信息：\n📍 当前位置：盛荣路站\n⏱ 下一班：2分钟后到达\n🚌 再下一班：8分钟后到达\n\n运营时间：首班07:00 末班21:30',
    'default': '您好！我是您的出行搭子。请告诉我您想去哪里，我会为您规划最优的出行路线。您也可以问我：\n• 附近的公交站\n• 具体线路的实时信息\n• 如何换乘到目的地'
};
