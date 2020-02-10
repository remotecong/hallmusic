import React from 'react';
import './App.css';

const URLS = [
    'https://apps.jw.org/GETPUBMEDIALINKS?output=json&pub=osg&fileformat=MP3&alllangs=0&langwritten=E&txtCMSLang=E',
]

const getFiles = async (url) => {
    const res = await fetch(url)
    if (res.ok) {
        const data = await res.json()
        return data.files.E.MP3
            .map((file) => {
                return {
                    title: file.title,
                    url: file.file.url,
                    art: file.trackImage.url,
                    raw: { ...file },
                }
            })
    }
    return []
}

class App extends React.Component {
    state = {
        songs: [],
        song: null,
    }

    reloadSongManifest = () => {
        getFiles(URLS[0])
            .then((songs) => {
                this.chooseRandomSong(songs)
            })
    }

    componentDidMount = () => {
        this.reloadSongManifest()
    }

    chooseRandomSong = (songs) => {
        if (!songs || !Array.isArray(songs)) {
            songs = this.state.songs
        }
        if (!songs.length) {
            this.reloadSongManifest()
        }
        const i = ~~(Math.random() * songs.length)
        const song = songs[i]
        this.setState({
            songs: songs.filter((ignore, si) => si !== i),
            song,
        })
    }

    render = () => {
        const { song } = this.state

        if (!song) {
            return (
                <div className="App">
                    <h1>Loading...</h1>
                </div>
            )
        }

        return (
            <div className="App">
                <h1>{song.title}</h1>
                <img src={song.art} alt={song.title} />
                <br />
                <audio key={song.url} autoPlay controls onEnded={this.chooseRandomSong}>
                    <source src={song.url} type="audio/mpeg" />
                </audio>
            </div>
        )
    }
}

export default App;
