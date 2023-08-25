import {defineConfig} from 'vitepress'

export default defineConfig({
    base: "/what-is-new-in-php/",
    lang: 'zh-CN',
    title: 'What\'s New in PHP',
    description: 'Record the new features of PHP version updates',
    lastUpdated: true,
    themeConfig: {
        nav: [
            {text: '首页', link: '/'},
            {
                text: 'PHP 7',
                activeMatch: '/7',
                items: [
                    {text: '7.0', link:'/7.0/'},
                    {text: '7.1', link: '/7.1/'},
                    {text: '7.2', link: '/7.2/'},
                    {text: '7.3', link: '/7.3/'},
                    {text: '7.4', link: '/7.4/'},
                ],
            },

            {
                text: 'PHP 8',
                activeMatch: '/8',
                items: [
                    {text: '8.0', link: '/8.0/'},
                    {text: '8.1', link: '/8.1/'},
                    {text: '8.2', link: '/8.2/'},
                ],
            },
        ],
        sidebar: {
            //
        },
    }
});
