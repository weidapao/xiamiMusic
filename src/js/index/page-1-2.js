{
  let view = {
    el: '#newsonglist',
    template:`
        <li class="line" data-way="./song.html?id={{song.id}}">
          <p class="song-name">{{song.name}}</p>
          <p class="singer-name">{{song.singer}}</p>
          <a class="playButton" href="./song.html?id={{song.id}}"></a>
        </li>
    `,
    init(){
      this.$el = $(this.el)
    },
    render(data){
      let {songs} = data
      songs.map((song)=>{
        let $li = $(this.template
          .replace('{{song.name}}', song.name)
          .replace('{{song.singer}}', song.singer)
          .replace('{{song.id}}', song.id)
        )
        console.log(this.$el.find('ul.line'))
        this.$el.find('ul').append($li)
      })
    }
  }
  let model = {
    data: {
      songs: []
    },
    find(){
      var query = new AV.Query('Song');
      return query.find().then((songs)=>{
        this.data.songs = songs.map((song)=>{
          return {id: song.id, name:song.attributes.name,
            singer:song.attributes.singer,url:song.attributes.url,
            lyrics:song.attributes.lyrics,cover:song.attributes.cover}
        })
        return songs
      })
    }
  }
  let controller = {
    init(view, model){
      this.view = view
      this.view.init()
      this.model = model
      this.bindEvents()
      this.model.find().then(()=>{
        this.view.render(this.model.data)
      })

    },
    bindEvents(){
      this.view.$el.on('click', 'ul>li', (e)=>{
        let $a = $(e.currentTarget)
        let songid = $a.attr('data-way')
        $a.addClass('current')
          .siblings().removeClass('current')
        window.eventHub.emit('clickLi', songid);
        window.location.href=songid;
      }) 
    }
  }
  controller.init(view, model)
}
