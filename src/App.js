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
    skipButton: css({
        background: '#711D8C',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        fontSize: '2rem',
        outline: 'none',
        padding: '2rem',
    }),
}

const App = () => {
    const [songs, setSongs] = React.useState([])
    const [song, setSong] = React.useState(null)
    const chooseRandomSong = (_songs) => {
        const list = (Array.isArray(_songs) && _songs) || songs
        if (!list || !list.length) {
            return reloadSongManifest()
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
        <div {...style.page}>
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
            <button {...style.skipButton} onClick={chooseRandomSong}>Next Song</button>
        </div>
    )
}


export default App

