$(document).ready(function() {
  window.scroll({
    top: 0
  })
  const scrollDownBtn = $('.scrolldown')
  const gamecontainer = $('.game-container')
  scrollDownBtn.click(function(e) {
    e.preventDefault()
    scrollDown()
  })
  gamecontainer.bind('mousewheel DOMMouseScroll', function(e) {
    e.preventDefault()
  })
  // $(window).scroll(function(e) {
  //   const y = window.scrollY
  //   const w = window.innerWidth
  //   if (y <= w)
  //     gamecontainer.css({
  //       width: `${y}px`
  //     })
  // })
  const scrollDown = function() {
    // window.scroll({
    //   top: window.innerWidth,
    //   left: 0,
    //   behavior: 'smooth'
    // })
    gamecontainer.css({
      width: '100vw'
    })
  }
})
