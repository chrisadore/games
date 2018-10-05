Barba.Pjax.start()
var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    Promise.all([this.newContainerLoading, this.fadeOut()]).then(
      this.fadeIn.bind(this)
    )
  },

  fadeOut: function() {
    return $(this.oldContainer)
      .animate({ opacity: 0 })
      .promise()
  },

  fadeIn: function() {
    var _this = this
    var $el = $(this.newContainer)

    $(this.oldContainer).hide()

    $el.css({
      visibility: 'visible',
      opacity: 0
    })

    $el.animate({ opacity: 1 }, 400, function() {
      _this.done()
    })
  }
})

Barba.Pjax.getTransition = function() {
  return FadeTransition
}

Barba.Dispatcher.on('initStateChange', function(
  currentStatus,
  oldStatus,
  container
) {
  closeNavbar()
  showLoader()
})

Barba.Dispatcher.on('newPageReady', function(
  currentStatus,
  oldStatus,
  container
) {
  hideLoader()
})
