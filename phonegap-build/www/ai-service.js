/**
 * AI服务模块
 * 统一处理不同AI服务商的API调用
 */

class AIService {
    constructor(config) {
        this.config = config;
        this.conversationHistory = [];
    }

    /**
     * 发送消息到AI服务
     * @param {string} message - 用户消息
     * @returns {Promise<string>} AI回复
     */
    async sendMessage(message) {
        try {
            // 添加到对话历史
            this.conversationHistory.push({
                role: 'user',
                content: message
            });

            let response;

            // 根据配置的提供商调用相应的服务
            switch (this.config.provider) {
                case 'openai':
                    response = await this.callOpenAI(message);
                    break;
                case 'baidu':
                    response = await this.callBaidu(message);
                    break;
                case 'xunfei':
                    response = await this.callXunfei(message);
                    break;
                case 'ali':
                    response = await this.callAli(message);
                    break;
                case 'mock':
                default:
                    response = await this.mockResponse(message);
                    break;
            }

            // 添加AI回复到历史
            this.conversationHistory.push({
                role: 'assistant',
                content: response
            });

            return response;

        } catch (error) {
            console.error('AI服务调用失败:', error);

            // 如果API调用失败，返回友好的错误提示
            return '抱歉，我暂时无法回答您的问题。请稍后再试，或者联系客服寻求帮助。';
        }
    }

    /**
     * 调用OpenAI API
     */
    async callOpenAI(message) {
        const { apiKey, apiUrl, model, maxTokens, temperature } = this.config.openai;

        const messages = [
            { role: 'system', content: this.config.systemPrompt },
            ...this.conversationHistory.slice(-10) // 保留最近10轮对话
        ];

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                max_tokens: maxTokens,
                temperature: temperature
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API错误: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    /**
     * 调用百度文心一言API
     */
    async callBaidu(message) {
        const { apiKey, secretKey, apiUrl } = this.config.baidu;

        // 首先获取access_token
        const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`;
        const tokenResponse = await fetch(tokenUrl);
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // 构建消息历史
        const messages = [
            { role: 'user', content: this.config.systemPrompt },
            ...this.conversationHistory.slice(-10)
        ];

        const response = await fetch(`${apiUrl}?access_token=${accessToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: messages
            })
        });

        if (!response.ok) {
            throw new Error(`百度API错误: ${response.status}`);
        }

        const data = await response.json();
        return data.result;
    }

    /**
     * 调用讯飞星火API
     * 注意：讯飞使用WebSocket连接，这里提供HTTP代理方式的示例
     */
    async callXunfei(message) {
        // 讯飞星火使用WebSocket，在浏览器环境中需要特殊处理
        // 这里建议通过后端代理来调用
        throw new Error('讯飞星火API需要通过后端代理调用，请配置后端服务');
    }

    /**
     * 调用阿里通义千问API
     */
    async callAli(message) {
        const { apiKey, apiUrl, model } = this.config.ali;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                input: {
                    messages: [
                        { role: 'system', content: this.config.systemPrompt },
                        ...this.conversationHistory.slice(-10)
                    ]
                },
                parameters: {
                    result_format: 'message'
                }
            })
        });

        if (!response.ok) {
            throw new Error(`阿里API错误: ${response.status}`);
        }

        const data = await response.json();
        return data.output.choices[0].message.content;
    }

    /**
     * 模拟AI响应（用于测试）
     */
    async mockResponse(message) {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

        // 关键词匹配
        for (const [keyword, response] of Object.entries(MOCK_RESPONSES)) {
            if (keyword !== 'default' && message.includes(keyword)) {
                return response;
            }
        }

        // 默认响应
        return MOCK_RESPONSES.default;
    }

    /**
     * 清空对话历史
     */
    clearHistory() {
        this.conversationHistory = [];
    }

    /**
     * 获取对话历史
     */
    getHistory() {
        return this.conversationHistory;
    }
}

// 创建全局AI服务实例
const aiService = new AIService(AI_CONFIG);
