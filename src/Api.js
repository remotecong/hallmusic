export const URLS = [
    //'https://apps.jw.org/GETPUBMEDIALINKS?output=json&pub=osg&fileformat=MP3&alllangs=0&langwritten=E&txtCMSLang=E', //original songs
    'https://pubmedia.jw-api.org/GETPUBMEDIALINKS?output=json&pub=sjjm&fileformat=MP3&alllangs=0&langwritten=E&txtCMSLang=E', //meetings
    'https://pubmedia.jw-api.org/GETPUBMEDIALINKS?output=json&pub=sjjc&fileformat=MP3&alllangs=0&langwritten=E&txtCMSLang=E', //chorus
    'https://pubmedia.jw-api.org/GETPUBMEDIALINKS?output=json&pub=sjji&fileformat=MP3&alllangs=0&langwritten=E&txtCMSLang=E', //instrumentals
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

export const loadAllSongs = async () => {
    return await Promise.all(URLS.map(getFiles))
        .then((songs) => {
            return songs.reduce((coll, list) => coll.concat(list), []);
        });
}
