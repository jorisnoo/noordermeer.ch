
export default {
    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: 'static',
    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head: {
        titleTemplate: '%s | Joris Noordermeer — Web Development',
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/meta/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/meta/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/meta/favicon-16x16.png' },
            { rel: 'mask-icon', href: '/meta/safari-pinned-tab.svg', color: '#f9325a' },
            { rel: 'msapplication-TileColor', content: '#e6e6e6' },
        ],
        script: [
            { async: true, defer: true, 'data-domain': 'noordermeer.ch', src: 'https://prism.noordermeer.ch/js/index.js' },
        ],
        meta: [
            { hid: 'twitter:image', name: 'twitter:image', property: 'twitter:image', content: 'https://noordermeer.ch/meta/joris_noordermeer_web_development.jpg' },
        ],
    },
    pwa: {
        meta: {
            title: 'Joris Noordermeer — Web Development',
            name: 'Joris Noordermeer',
            theme_color: '#e6e6e6',
            ogTitle: 'Joris Noordermeer — Web Development',
            ogSiteName: 'Joris Noordermeer — Web Development',
            ogHost: 'https://noordermeer.ch',
            ogImage: 'https://noordermeer.ch/meta/joris_noordermeer_web_development.jpg',
            twitterCard: 'summary_large_image',
        },
        manifest: {
            name: 'Joris Noordermeer',
            short_name: 'Joris Noordermeer',
            theme_color: '#ffffff',
            background_color: '#ffffff',
            display: 'standalone',
            lang: 'en',
        },
    },
    /*
    ** Global CSS
    */
    css: [],
    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [
        { src: './plugins/slide-up-down.js', mode: 'client' },
    ],
    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: true,
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/pwa',
        // Doc: https://github.com/nuxt-community/eslint-module
        // '@nuxtjs/eslint-module',
        // Doc: https://github.com/nuxt-community/stylelint-module
        // '@nuxtjs/stylelint-module',
        // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
        '@nuxtjs/tailwindcss',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://github.com/nuxt/content
        '@nuxt/content',
        'nuxt-i18n',
    ],
    /*
    ** Content module configuration
    ** See https://content.nuxtjs.org/configuration
    */
    content: {
        markdown: {
            // https://github.com/remarkjs/remark-external-links#options
            remarkExternalLinks: {
                target: false,
                rel: ['nofollow', 'noopener'],
            },
        },
    },
    /*
    ** i18n module configuration
    ** See https://nuxt-community.github.io/nuxt-i18n/options-reference.html
    */
    i18n: {
        locales: [
            'en',
            'de',
            'jp',
        ],
        defaultLocale: 'en',
        vueI18n: {
            fallbackLocale: 'en',
            messages: {
                en: {
                    info: 'Info',
                    work: 'Work',
                    contact: 'Contact',
                    zurich: 'Zurich',
                    switzerland: 'Switzerland',
                },
                de: {
                    info: 'Info',
                    work: 'Projekte',
                    contact: 'Kontakt',
                    zurich: 'Zürich',
                    switzerland: 'Schweiz',
                },
                jp: {
                    info: 'プロフィール',
                    work: '制作実績',
                    contact: 'お仕事のご依頼',
                    zurich: 'チューリッヒ',
                    switzerland: 'スイス',
                },
            },
        },
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            onlyOnRoot: true,
        },
    },
    /*
    ** Page transition
    */
    pageTransition: {
        name: 'page',
        mode: 'out-in',
    },
    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {},
};
