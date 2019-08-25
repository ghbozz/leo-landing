const initPlayer = () => {
  const tracks = document.querySelectorAll('.track')
  tracks.forEach((track) => {
    track.addEventListener('click', (e) => {
      setTrack(track);
      toggleActive(tracks, e)
    })
  })
}

const setTrack = (track) => {
  document.getElementById('player').src = `assets/audio/${track.innerText}.mp3`
  document.querySelector('.player-img').style.backgroundImage = `url('assets/images/${track.innerText}.jpg')`
  document.querySelector('.current-track').innerText = `${track.innerText}`
  document.getElementById('play').click();
  setInterval(progressBar, 500)
}

const toggleActive = (tracks, e) => {
  tracks.forEach((track) => {
    track.classList.remove('active')
  })
  e.currentTarget.classList.add('active')
}

const nextTrack = () => {
  const currentTrack = document.querySelector('.active')
  if (currentTrack.nextElementSibling) {
    currentTrack.classList.remove('active')
    currentTrack.nextElementSibling.classList.add('active')
    setTrack(currentTrack.nextElementSibling)
  } else {
    currentTrack.classList.remove('active')
    document.querySelectorAll('.track')[0].classList.add('active')
    setTrack(document.querySelectorAll('.track')[0])
  }
}

const progressBar = () => {
  const progress = document.querySelector('.progress')
  const player = document.getElementById('player')
  const calc = (100 * player.currentTime) / player.duration
  calc < 99.9 ? progress.style.width = `${calc}%` : nextTrack()
}

const playHead = () => {
  const timeLine = document.querySelector('.timeline')
  const player = document.getElementById('player')
  timeLine.addEventListener('click', (e) => {
    if (e.offsetX > 1) {
      const pos = ((e.offsetX * 100) / e.target.offsetWidth)
      player.currentTime = (player.duration / 100) * pos
    }
  })
}

initPlayer();
playHead();
