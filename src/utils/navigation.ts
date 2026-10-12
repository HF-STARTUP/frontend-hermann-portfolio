const NAVIGATIONS_URL = {
    home: {
        url: '/',
        label: 'Accueil'
    },

    about: {
        url: '/about',
        label: 'A propos'
    },

    projects: {
        url: '/projects',
        label: 'Projets'
    },

    blog: {
        url: '/blog',
        label: 'Blog'
    },
}

export type NavigationLink = {
    url: string
    label: string
}

export default NAVIGATIONS_URL
