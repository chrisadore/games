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
  const backButton = $('.back')
  var isSmall = $(window).innerWidth() <= 900 ? true : false

  const playSound = function(
    sound,
    { vol = 1, seek = 0.2 } = { vol: 1, seek: 0.2 }
  ) {
    console.log('TCL: playSound -> sound', sound)
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
    const link = e.currentTarget.href
    console.log('TCL: link', link)
    const redirectTimeout = setTimeout(function() {
      // window.history.pushState(link)
      window.location.replace(link)
    }, 2500)
    playSound(arcadeSound, { seek: 0.3 })
    const card = $(this).clone()
    const cardWidth = $(this).innerWidth()
    const offset = $(this).offset()
    const gameContainerWidth = gameCardContainer.innerWidth()
    gameCard.fadeOut()
    gameCardContainer.append(card)
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
      transform: 'scale(1.1)'
    })
    var cardLoader = $(card.children('.game__card--loader')[0])
    cardLoader.addClass('game__card--loader--show')
    backButton.addClass('show')
    backButton.on('click', function() {
      playSound(backSound, { vol: 0.2, seek: 0.4 })
      card.on('transitionend', function() {
        gameCard.fadeIn('slow', function() {
          card.remove()
        })
        card.off('transitionend')
        clearTimeout(redirectTimeout)
      })
      card.css({ left: `${offset.left}px`, transform: 'scale(1)' })
      cardLoader.removeClass('game__card--loader--show')
      $(this).removeClass('show')
      $(this).off('click')
    })
  })

  window.addEventListener('resize', function(e) {
    console.log($(window).innerWidth())
  })
})
