
const settings = require("../settings.json")

module.exports = [{
    name: "panel-gönder",
    code: `
    $channelSendMessage[$mentionedChannels[1];{newEmbed:
    {author:Destek Talebi Oluştur | $guildName[$guildID]}
    {description:Talep oluşturmak için butona tıklatın.}
    {color:FFFFFF}}
    {actionRow:{button:Talep Oluştur:primary:createTicket:false:🎫}}]
    
    <#$mentionedChannels[1]> isimli kanala panel gönderildi.
    $onlyForIDs[${settings.devs};]
    `
},{
    name: "createTicket",
    type: "interaction",
    prototype: "button",
    code: `
    $interactionReply[Destek talebin başarıyla oluşturuldu. (<#$get[ticketChannel]>);everyone;true;false]
    $modifyChannelPerms[$get[ticketChannel];$guildID;-viewchannel]
    $setChannelVar[ticketID;$get[ticketChannel];$get[ticketChannel]]
    $setChannelVar[ticketAuthor;$authorID;$get[ticketChannel]]
    $channelSendMessage[$get[ticketChannel];{newEmbed:
    {author:Destek Talebi | $guildName[$guildID]}
    {description:Destek talebi oluşturdun. Lütfen sorununu açıkla ve yetkililerimizin seninle ilgilenmesini bekle.}
    {color:FFFFFF}
    {thumbnail:$userAvatar[$authorID]}}
    {actionRow:{button:Talebi Kapat:danger:closeTicket:false:🗑}}]
    $let[ticketChannel;$newTicket[ticket-$authorID;<@&${settings.staffID}> | <@$authorID>;${settings.categoryID};true;]]
    `
},{
    name: "closeTicket",
    type: "interaction",
    prototype: "button",
    code: `
    
    $closeTicket[Bir hata ile karşılaşıldı.]
    $onlyForRoles[${settings.staffID};Bu komutu kullanabilmen için yetkili olmalısın.{ephemeral} {interaction}]
    `
}]
