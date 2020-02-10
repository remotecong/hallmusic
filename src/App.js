import React from 'react'
import { css } from 'glamor'
import { loadAllOriginalSongs } from './Api'

const style = {
    page: css({
        textAlign: 'center',
        width: '90vw',
        margin: 'auto',
    }),
    audioPlayer: css({
        width: '100%',
    }),
}

const App = () => {
    const [songs, setSongs] = React.useState([])
    const [song, setSong] = React.useState(null)
    const chooseRandomSong = (_songs) => {
        const list = (Array.isArray(_songs) && _songs) || songs
        if (!list || !list.length) {
            reloadSongManifest()
        }
        const selectedSong = ~~(Math.random() * list.length)
        setSong(list[selectedSong])
        setSongs(list.filter((ignore, i) => i !== selectedSong))
    }
    const reloadSongManifest = () => {
        loadAllOriginalSongs()
            .then((files) => {
                chooseRandomSong(files)
            })
    }

    React.useEffect(() => {
        reloadSongManifest()
    }, [])

    if (!song) {
        return <h1>Loading...</h1>
    }

    return (
        <React.Fragment>
            <h1>{song.title}</h1>
            <img src={song.art} alt={song.title} />
            <br />
            <audio
                key={song.url}
                autoPlay
                controls
                onEnded={chooseRandomSong}
                {...style.audioPlayer}
            >
                <source src={song.url} type="audio/mpeg" />
            </audio>
        </React.Fragment>
    )
}


export const Page = () => {
    return (
        <div {...style.page}>
            <App />
        </div>
    )
}

export default Page

