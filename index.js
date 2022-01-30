const ds = require('discord.js')
const client = new ds.Client({intents: [ds.Intents.FLAGS.GUILDS, ds.Intents.FLAGS.GUILD_MESSAGES,
    ds.Intents.FLAGS.GUILD_MESSAGE_REACTIONS]})

client.on('ready', async stat => {
  console.log('Bot started')
})

client.on('messageCreate', async mess => {
  const findGuild = client.guilds.cache.find(item => item.id === mess.guildId)
  const findChannel = findGuild.channels.cache.find(item => item.id === mess.channelId)
  if(mess.author.bot !== true && findChannel.type === 'GUILD_TEXT' && findChannel.permissionsFor(findGuild.me).has('SEND_MESSAGES')){
    const cont = mess.content.toLowerCase().trim()
    let msg = ''
    if(cont.match(/с[ао]си/) || cont.match(/[оа]тс[ао]си/)){
      msg = `Сам ${cont}, че самый умный?`
    }
    else if(cont.match(/п[оа]шол нахуй/)){
      msg = `Сам иди, клоун. Все слышали? ${mess.author.username} клоун`
    }
    else if(cont.match(/сам п[ао]шол/)){
      msg = 'Ток после тебя, пидрила)'
    }
    else{
      msg = 'Пашол нахуй'
    }
    try{
      mess.react('🤡')
      console.log('Reacted')
    }
    catch(e){
      console.error(e)
    }
    if(msg.length != 0){
      const collmess = await mess.reply(msg)

    const filter = (reaction) => reaction.emoji.name !== ''

    const collector = collmess.createReactionCollector({filter})
    collector.on('collect', (r, u) => { //передается 2 аргумента. Первый, это реакция, а второй это пользовател,ь, который ее поставил
      console.log(r.message.channel)
      r.message.channel.send(`${u.username} а не охуел ли ты мне тут свои реакции ставить, пидорасина. В очко себе это ${typeof r.emoji.id == 'string' ? '<:'+r.emoji.name+':'+ r.emoji.id + '>' : r.emoji.name} запихай`) //r.message.channel полностью заменяет все те махинации, что ниже
      /*const findGuild = client.guilds.cache.find(item => item.id === r.message.reference.guildId)
      const findChannel = findGuild.channels.cache.find(item => item.id === r.message.reference.channelId)
      if(findChannel.type === 'GUILD_TEXT' && findChannel.permissionsFor(findGuild.me).has('SEND_MESSAGES')){
        findChannel.send(`${u.username} а не охуел ли ты мне тут свои реакции ставить, пидорасина. В очко себе это ${typeof r.emoji.id == 'string' ? '<:'+r.emoji.name+':'+ r.emoji.id + '>' : r.emoji.name} запихай`)
      }
      else{
        console.log('Этот ебанат запретил нам отправлять сообщения')
      }*/
    })
    }
    else{
      consooe.log('Message is not aviable')
    }
  }
  else if(mess.author.bot === true){
    return
  }
  else{
    console.log('Этот уебан нам запретил писать')
  }
})

const msg = new ds.MessageEmbed({
  title: 'Дарова пидарас',
  description: 'Админ пидорас',
  color: 'brown',
  footer: {
    text: 'Админ еще тот пидарас'
  }
})

client.on('guildCreate', async guild => {
  const hiChannel = guild.channels.cache.find(item => item.id === guild.systemChannelId)
  if(typeof hiChannel === 'object' && hiChannel.permissionsFor(guild.me).has('SEND_MESSAGES')){
    hiChannel.send({
      embeds: [msg]
    })
  }
})

client.login(process.env['TOKEN'])
