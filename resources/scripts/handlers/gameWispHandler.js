!function(){function e(e){var s=JSON.parse($.gamewisp.getUserSubInfoString(e)+"");if($.bot.isModuleEnabled("./handlers/gameWispHandler.js"))return 1!=s.result.status?void($.getIniDbBoolean("gamewispsubs",e,!1)&&$.addGWSubUsersList($.users[i][0],$.getIniDbNumber("gamewispsubs",e+"_tier",1))):!1 in s.data[0]?void($.getIniDbBoolean("gamewispsubs",e,!1)&&$.addGWSubUsersList($.users[i][0],$.getIniDbNumber("gamewispsubs",e+"_tier",1))):void(s.data[0].status.equals("inactive")?($.delGWSubUsersList(e),$.restoreSubscriberStatus(e,!1)):($.addGWSubUsersList(e,parseInt(s.data[0].tier.level)),$.restoreSubscriberStatus(e,!1)))}function s(e,s){var i=$.getGWTier(e.toLowerCase());return g[s][i]}var r=$.getIniDbString("gameWispSubHandler","subscribeMessage","(name) just subscribed via GameWisp at tier level (tier)!"),a=$.getIniDbString("gameWispSubHandler","reSubscribeMessage","(name) just subscribed for (months) months in a row via GameWisp!"),n=$.getIniDbString("gameWispSubHandler","tierUpMessage","(name) upgraded to tier (tier) on GameWisp!");subShowMessages=$.getIniDbBoolean("gameWispSubHandler","subscriberShowMessages",!0),subReward=$.getIniDbNumber("gameWispSubHandler","subscribeReward",0),reSubReward=$.getIniDbNumber("gameWispSubHandler","reSubscribeReward",0);var g=[];g.songrequests=[],g.songrequests[0]=0,g.songrequests[1]=$.getIniDbNumber("gameWispTiers","songrequest_1",0),g.songrequests[2]=$.getIniDbNumber("gameWispTiers","songrequest_2",0),g.songrequests[3]=$.getIniDbNumber("gameWispTiers","songrequest_3",0),g.songrequests[4]=$.getIniDbNumber("gameWispTiers","songrequest_4",0),g.songrequests[5]=$.getIniDbNumber("gameWispTiers","songrequest_5",0),g.songrequests[6]=$.getIniDbNumber("gameWispTiers","songrequest_6",0),g.bonuspoints=[],g.bonuspoints[0]=0,g.bonuspoints[1]=$.getIniDbNumber("gameWispTiers","bonuspoints_1",0),g.bonuspoints[2]=$.getIniDbNumber("gameWispTiers","bonuspoints_2",0),g.bonuspoints[3]=$.getIniDbNumber("gameWispTiers","bonuspoints_3",0),g.bonuspoints[4]=$.getIniDbNumber("gameWispTiers","bonuspoints_4",0),g.bonuspoints[5]=$.getIniDbNumber("gameWispTiers","bonuspoints_5",0),g.bonuspoints[6]=$.getIniDbNumber("gameWispTiers","bonuspoints_6",0),g.subbonuspoints=[],g.subbonuspoints[0]=0,g.subbonuspoints[1]=$.getIniDbNumber("gameWispTiers","subbonuspoints_1",0),g.subbonuspoints[2]=$.getIniDbNumber("gameWispTiers","subbonuspoints_2",0),g.subbonuspoints[3]=$.getIniDbNumber("gameWispTiers","subbonuspoints_3",0),g.subbonuspoints[4]=$.getIniDbNumber("gameWispTiers","subbonuspoints_4",0),g.subbonuspoints[5]=$.getIniDbNumber("gameWispTiers","subbonuspoints_5",0),g.subbonuspoints[6]=$.getIniDbNumber("gameWispTiers","subbonuspoints_6",0),$.bind("gameWispChange",function(e){if($.bot.isModuleEnabled("./handlers/gameWispHandler.js")){var s=e.GetUsername().toLowerCase,i=e.getStatus();i.equals("inactive")&&($.delGWSubUsersList(s),$.restoreSubscriberStatus(s,!1))}}),$.bind("gameWispBenefits",function(e){if($.bot.isModuleEnabled("./handlers/gameWispHandler.js")){var s=e.getUsername().toLowerCase(),i=$.resolveRank(s),r=parseInt(e.getTier());r>$.getGWTier(s)&&($.addGWSubUsersList(s,r),subShowMessages&&$.say(n.replace("(user)",i).replace("(tier)",r)))}}),$.bind("gameWispSubscribe",function(e){if($.bot.isModuleEnabled("./handlers/gameWispHandler.js")){var s=e.getUsername().toLowerCase(),i=$.resolveRank(s),a=parseInt(e.getTier()),n=subReward+g.subbonuspoints[a];$.addGWSubUsersList(s,a),$.restoreSubscriberStatus(s,!1),subShowMessages&&($.inidb.incr("points",s,n),$.say(r.replace("(user)",i).replace("(tier)",a).replace("(reward)",n)))}}),$.bind("gameWispAnniversary",function(e){if($.bot.isModuleEnabled("./handlers/gameWispHandler.js")){var s=e.getUsername(),i=$.resolveRank(s),r=parseInt(e.getMonths()),n=$.getGWTier(s),t=subReward+g.subbonuspoints[n];subShowMessages&&($.inidb.incr("points",s,t),$.say(a.replace("(user)",i).replace("(tier)",n).replace("(reward)",t).replace("(months)",r)))}}),$.bind("command",function(e){var s=e.getComamnd(),i=e.getGetSender().toLowerCase(),t=e.getArgs();if(s.equalsIgnoreCase("gamewisp")){var u=["submessage","resubmessage","togglemessage","reward","resubreward"];if(!t[0])return void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.usage",u.join(" | ")));if(t[0].equalsIgnoreCase("submessage"))return t.length<2?void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.submessage.usage",r)):(r=t.splice(1).join(" "),$.inidb.set("gameWispSubHandler","subscribeMessage",r),void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.submessage.success",r)));if(t[0].equalsIgnoreCase("resubmessage"))return t.length<2?void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.resubmessage.usage",a)):(a=t.splice(1).join(" "),$.inidb.set("gameWispSubHandler","reSubscribeMessage",a),void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.resubmessage.success",a)));if(t[0].equalsIgnoreCase("tierupmessage"))return t.length<2?void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.tierupmessage.usage",n)):(n=t.splice(1).join(" "),$.inidb.set("gameWispSubHandler","tierUpMessage",tierUpessage),void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.tierupmessage.success",n)));if(t[0].equalsIgnoreCase("togglemessage")){if(t.length<2)return void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.togglemessage.usage",subShowMessages));if(t[1].equalsIgnoreCase("on"))$.setIniDbBoolean("gameWispSubHandler","subscriberShowMessages",!0);else{if(!t[1].equalsIgnoreCase("off"))return void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.togglemessage.usage",subShowMessages));$.setIniDbBoolean("gameWispSubHandler","subscriberShowMessages",!1)}return void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.togglemessage.success",subShowMessages))}if(t[0].equalsIgnoreCase("reward"))return t.length<2?void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.reward.usage",subReward)):isNaN(t[1])?void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.reward.usage",subReward)):(subReward=parseInt(t[1]),void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.reward.success",subReward)));if(t[0].equalsIgnoreCase("resubreward"))return t.length<2?void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.resubreward.usage",reSubReward)):isNaN(t[1])?void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.resubreward.usage",reSubReward)):(reSubReward=parseInt(t[1]),void $.say($.whisperPrefix(i)+$.lang.get("gamewisp.resubreward.success",reSubReward)))}if(s.equalsIgnoreCase("gamewisptier")){var b=0,o=0,p=0,m=["songrequests","bonuspoints","subbonuspoints"];if(!t[0])return void $.say($.whisperPrefix(i)+$.lang.get("gamewisptier.usage",m.join(" | ")));if(t[0]in m)return t.length<2?void $.say($.whisperPrefix(i)+$.lang.get("gamewisptier."+t[0]+".usage")):(b=parseInt(t[1]),isNaN(b)||1>b||b>6?void $.say($.whisperPrefix(i)+$.lang.get("gamewisptier."+t[0]+".usage")):(p=g[t[0]][b],t.length<3?void $.say($.whisperPrefix(i)+$.lang.get("gamewisptier."+t[0]+".usage.tier",b,p)):(o=parseInt(t[2]),isNaN(o)||1>o?void $.say($.whisperPrefix(i)+$.lang.get("gamewisptier."+t[0]+"usage.tier",b,p)):(g[t[0]][b]=o,$.inidb.set("gameWispTiers",t[0]+"_"+b,o),void $.say($.whisperPrefix(i)+$.lang.get("gamewisptier."+t[0]+".success",b,p,o))))))}}),$.bind("initReady",function(){$.bot.isModuleEnabled("./handlers/gameWispHandler.js")&&($.registerChatCommand("./handlers/gameWispHandler.js","gamewisp",1),$.registerChatCommand("./handlers/gameWispHandler.js","gamewisptier",1))}),$.getTierData=s,$.checkGameWispSub=e}();