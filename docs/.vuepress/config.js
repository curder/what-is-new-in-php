module.exports = {
    base: "/what-is-new-in-php/",
    lang: 'zh-CN',
    title: 'What\'s New in PHP',
    description: 'PHP更新历史收录',
    themeConfig: {
        navbar: [
            {text: '首页', link: '/'},
            {
                text: 'PHP 7',
                children: [
                    '/7.0/',
                    '/7.1/',
                    '/7.2/',
                    '/7.3/',
                    '/7.4/',
                ],
            },

            {
                text: 'PHP 8',
                children: [
                    '/8.0/',
                    '/8.1/',
                    '/8.2/',
                ],
            },
        ],
        sidebar: {
            //
        },
    }
}
