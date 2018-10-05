$(document).ready(function() {
  const smallBP = 550
  const arcadeButton = $('.arcade-button')
  const backSound = new Howl({
    src: ['/assets/sounds/button2.mp3']
  })
  const arcadeSound = new Howl({
    src: ['/assets/sounds/button1.mp3']
  })
  const gameCardContainer = $('.game')
  const controls = $('.controls-container')
  const backButton = $('#cancel')
  const playButton = $('#play')
  const trex = $('#trex').clone()
  const spaceinvaders = $('#spaceinvaders').clone()
  $('#trex').remove()
  $('#spaceinvaders').remove()
  var isSmall = $(window).innerWidth() <= smallBP ? true : false

  if (!isSmall) {
    gameCardContainer.append(spaceinvaders)
    $('#trex').remove()
  } else {
    gameCardContainer.append(trex)
    $('#spaceinvaders').remove()
  }

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

  const animateCards = function(e) {
    console.log('card click')
    e.preventDefault()
    playSound(arcadeSound, { seek: 0.3 })
    const link = e.currentTarget.href
    const card = $(this).clone()
    const cardWidth = $(this).innerWidth()
    const cardHeight = $(this).innerHeight()
    const offset = $(this).offset()
    const gamename = $(card.children('.game__card--title')[0]).text()
    const gameCard = $('.game__card')
    const credits = $(`<a href="#" class="game--credits">
    <span> Credits for ${gamename} </span>
    </a>`)
    const gameContainerWidth = gameCardContainer.innerWidth()
    const gameContainerHeight = gameCardContainer.innerHeight()
    var loader = $('.game-loader')
    var redirectTimeout

    $('body').append(credits)
    credits.fadeIn()
    gameCard.fadeOut()
    card.addClass('selectedCard')
    gameCardContainer.append(card)

    card.click(function(e) {
      e.preventDefault()
    })

    card.css({
      left: `${offset.left}px`,
      top: `${offset.top}px`,
      width: `${cardWidth}px`,
      height: `${cardHeight}px`
    })

    if (isSmall) {
      card.css({
        top: `${gameContainerHeight / 2 - cardHeight / 2}px`,
        transform: 'scale(1.06)'
      })
    } else {
      card.css({
        left: `${gameContainerWidth / 2 - cardWidth / 2}px`,
        transform: 'scale(1.06)'
      })
    }

    controls.addClass('show')

    playButton.click(function() {
      playSound(backSound, { vol: 0.2, seek: 0.4 })
      loader.addClass('game-loader--show')
      redirectTimeout = setTimeout(function() {
        window.location.href = link
      }, 4000)
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

      if (isSmall) {
        card.css({
          top: `${offset.top}px`,
          transform: 'scale(1)'
        })
      } else {
        card.css({ left: `${offset.left}px`, transform: 'scale(1)' })
      }

      loader.removeClass('game-loader--show')
      credits.fadeOut(function() {
        credits.remove()
      })
      if (redirectTimeout) {
        clearTimeout(redirectTimeout)
        redirectTimeout = null
      }
      $(this).off('click')
    })
  }

  $('.game__card').on('click', animateCards)

  $(window).on('resize', function() {
    isSmall = $(window).innerWidth() <= smallBP ? true : false
    if (!isSmall) {
      gameCardContainer.append(spaceinvaders)
      $('#spaceinvaders').click(animateCards)
      $('#trex').remove()
    } else {
      gameCardContainer.append(trex)
      $('#trex').click(animateCards)
      $('#spaceinvaders').remove()
    }
  })
})
