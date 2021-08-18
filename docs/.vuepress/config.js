const {readdirSync} = require('fs');

const getFiles = (dir, filteredReadme = true) => {
    return readdirSync(`docs/${dir}`, 'utf-8')
        .filter((f) => filteredReadme ? !f.endsWith('README.md') : true)
        .filter((f) => f.endsWith('.md'))
        .map(f => `/${dir}/${f}`)
}

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
                    '/7.4/',
                ],
            },

            {
                text: 'PHP 8',
                children: [
                    '/8.0/',
                ],
            },
        ],
        sidebar: {
            //
        },
    }
}
