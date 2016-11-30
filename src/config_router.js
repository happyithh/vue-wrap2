export function configRouter() {
    return [
        {
            path: '/',
            component: (resolve) => require(['./components/home/home'], resolve)
        }
        // {
        //     path: '/event',
        //     component: (resolve) => require(['./components/event/Event'], resolve)
        // },
    ]

}
