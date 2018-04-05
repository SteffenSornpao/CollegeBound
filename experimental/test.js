$('a').click(function(e){
    e.preventDefault()
    $(this).toggleClass('clicked')
    $(this).parent().toggleClass('forward')
})