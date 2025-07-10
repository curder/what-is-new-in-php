import {defineConfig} from 'vitepress'

// 获取当前年
const currentYear = new Date().getFullYear();

export default defineConfig({
    base: "/what-is-new-in-php/",
    lang: 'zh-CN',
    title: 'What\'s New in PHP',
    description: 'Record the new features of PHP version updates',
    lastUpdated: true,
    themeConfig: {
        outline: {
            label: "章节导航",
            level: "deep"
        },
        lastUpdated: {
            text: "上次更新",
        },
        returnToTopLabel: '返回顶部',
        notFound: {
            code: "404",
            title: '找不到页面',
            quote: '如果您继续寻找，最终可能会到达要去的地方。',
            linkText: "返回首页",
        },
        editLink: {
            pattern: "https://github.com/curder/what-is-noew-in-php/edit/master/docs/:path",
            text: '编辑它'
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/curder/what-is-new-in-php'}
        ],
        footer: {
            message: "MIT Licensed",
            copyright: `${currentYear}-present Curder`,
        },
        nav: [
            {text: '首页', link: '/'},

            {
                text: 'PHP 8',
                activeMatch: '/8',
                items: [
                    {text: '8.5', link: '/8.5/'},
                    {text: '8.4', link: '/8.4/'},
                    {text: '8.3', link: '/8.3/'},
                    {text: '8.2', link: '/8.2/'},
                    {text: '8.1', link: '/8.1/'},
                    {text: '8.0', link: '/8.0/'},
                ],
            },

            {
                text: 'PHP 7',
                activeMatch: '/7',
                items: [
                    {text: '7.4', link: '/7.4/'},
                    {text: '7.3', link: '/7.3/'},
                    {text: '7.2', link: '/7.2/'},
                    {text: '7.1', link: '/7.1/'},
                    {text: '7.0', link: '/7.0/'},
                ],
            },
        ],
        sidebar: {
            //
        },
    }
});
