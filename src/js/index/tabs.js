{
  let view = {
    el: '#newtab',
    init(){
      this.$el = $(this.el)
    }
  }
  let model = {}
  let controller = {
    init(view, model){
      this.view = view
      this.view.init()
      this.model = model
      this.bindEvents()
    },
    bindEvents(){
      this.view.$el.on('click', 'a', (e)=>{
        let $a = $(e.currentTarget)
        let tabName = $a.attr('data-tab-name')
        $a.addClass('active')
          .siblings().removeClass('active')
        window.eventHub.emit('selectTab', tabName)
      }) 
    }
  }
  controller.init(view, model)
}
