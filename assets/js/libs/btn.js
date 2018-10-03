$(document).ready(function() {
  const arcadeButton = $('.arcade-button')
  const backSound = new Howl({
    src: ['/assets/sounds/button2.mp3']
  })
  const arcadeSound = new Howl({
    src: ['/assets/sounds/button1.mp3']
  })
  const gameCardContainer = $('.game')
  const gameCard = $('.game__card')
  const controls = $('.controls-container')
  const backButton = $('#cancel')
  const playButton = $('#play')

  var isSmall = $(window).innerWidth() <= 900 ? true : false

  const hideControls = function(e) {
    controls.removeClass('show')
  }

  const playSound = function(
    sound,
    { vol = 1, seek = 0.2 } = { vol: 1, seek: 0.2 }
  ) {
    sound.seek(seek)
    sound.volume(vol)
    if (!sound.playing()) {
      sound.play()
    }
  }

  arcadeButton.on('click', function(e) {
    e.preventDefault()
    playSound(arcadeSound, { seek: 0.3 })
  })

  gameCard.on('click', function(e) {
    e.preventDefault()
    playSound(arcadeSound, { seek: 0.3 })
    const link = e.currentTarget.href
    const card = $(this).clone()
    const cardWidth = $(this).innerWidth()
    const offset = $(this).offset()
    const gamename = $(card.children('.game__card--title')[0]).text()
    const credits = $(`<a href="#" class="game--credits">
    <span> Credits for ${gamename} </span>
    </a>`)
    const gameContainerWidth = gameCardContainer.innerWidth()
    var cardLoader = $(card.children('.game__card--loader')[0])
    var redirectTimeout

    $('body').append(credits)
    credits.fadeIn()
    gameCard.fadeOut()
    gameCardContainer.append(card)

    card.click(function(e) {
      e.preventDefault()
    })

    card.css({
      left: `${offset.left}px`,
      top: `${offset.top}px)`,
      position: 'absolute',
      width: `${cardWidth}px`,
      transition:
        'transform 0.3s ease-in , left 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95)'
    })
    card.css({
      left: `${gameContainerWidth / 2 - cardWidth / 2}px`,
      transform: 'scale(1.06)'
    })

    controls.addClass('show')

    playButton.click(function() {
      playSound(backSound, { vol: 0.2, seek: 0.4 })
      cardLoader.addClass('game__card--loader--show')
      redirectTimeout = setTimeout(function() {
        console.log('TCL: redirectTimeout -> redirectTimeout', redirectTimeout)
        window.location.href = link
      }, 2500)
      $(this).off('click')
    })

    backButton.on('click', function() {
      hideControls()
      playSound(backSound, { vol: 0.2, seek: 0.4 })
      card.on('transitionend', function() {
        gameCard.fadeIn('slow', function() {
          card.remove()
        })
        card.off('transitionend')
      })
      card.css({ left: `${offset.left}px`, transform: 'scale(1)' })
      cardLoader.removeClass('game__card--loader--show')
      credits.fadeOut(function() {
        credits.remove()
      })
      console.log('TCL: redirectTimeout', redirectTimeout)
      clearTimeout(redirectTimeout)
      $(this).off('click')
    })
  })

  window.addEventListener('resize', function(e) {
    console.log($(window).innerWidth())
  })
})
