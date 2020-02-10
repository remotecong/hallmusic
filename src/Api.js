export const URLS = [
    'https://apps.jw.org/GETPUBMEDIALINKS?output=json&pub=osg&fileformat=MP3&alllangs=0&langwritten=E&txtCMSLang=E',
]

export const getFiles = async (url) => {
    const res = await fetch(url)
    if (res.ok) {
        const data = await res.json()
        return data.files.E.MP3
            .map((file) => {
                return {
                    title: file.title,
                    url: file.file.url,
                    art: file.trackImage.url,
                }
            })
    }
    return []
}

export const loadAllOriginalSongs = async () => {
    return await getFiles(URLS[0])
}
