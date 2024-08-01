export const isCurrentPage = (currentPathName: string, url: string, urlStep = 2): boolean => {
    return  currentPathName.split('/').includes(url.split('/')[urlStep]) || currentPathName == url

}

export const isDashboardContext = (currentPathName: string): boolean => {
    return currentPathName.split('/').includes('dashboard')
}
