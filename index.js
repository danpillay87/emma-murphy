var Botkit = require('botkit')

var token = process.env.SLACK_TOKEN

var controller = Botkit.slackbot({
  // reconnect to Slack RTM when connection goes bad
  retry: Infinity,
  debug: false
})

// Assume single team mode if we have a SLACK_TOKEN
if (token) {
  console.log('Starting in single-team mode')
  controller.spawn({
    token: token
  }).startRTM(function (err, bot, payload) {
    if (err) {
      throw new Error(err)
    }

    console.log('Connected to Slack RTM')
  })
// Otherwise assume multi-team mode - setup beep boop resourcer connection
} else {
  console.log('Starting in Beep Boop multi-team mode')
  require('beepboop-botkit').start(controller, { debug: true })
}

controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "I'm here!")
})

controller.hears(['hello', 'hi'], ['direct_mention'], function (bot, message) {
  bot.reply(message, 'Hello.')
})

controller.hears(['tell me about camaignhub lite'], ['direct_message', 'direct_mention', 'ambient'], function (bot, message) {
  var text = 'CampaignHub Lite offers a FREE taster of our CampaignHub platform to advertisers.'
  var campaignhublite = [{
    fallback: text,
    pretext: 'CampaignHub Lite gives FREE reporting on tap',
    title: 'Free Reporting, optimisation tips & insights in minutes',
    video_url: 'https://www.youtube.com/watch?v=j7hJtiZr-GI',
    title_link: 'https://campaignhub.broadplace.com/oauth/default.aspx',
    text: text,
    color: '#7CD197'
  }]

  bot.reply(message, {
    attachments: campaignhublite
  }, function (err, resp) {
    console.log(err, resp)
  })
})

controller.hears(['tell me about campaignhub'], ['direct_message', 'direct_mention', 'ambient'], function (bot, message) {
  var text = 'CampaignHub is an advertising platform designed to make advertising awesome & effective.'
  var campaignhub = [{
    fallback: text,
    pretext: 'CampaignHub Makes Your Marketing Better! :sunglasses: :thumbsup:',
    title: 'Plan, optimise and report on your advertising.',
    image_url: 'https://www.broadplace.com/img/campaign-hub-logo.png',
    title_link: 'https://www.broadplace.com/campaignhub.html',
    text: text,
    color: '#7CD197'
  }]

  bot.reply(message, {
    attachments: campaignhub
  }, function (err, resp) {
    console.log(err, resp)
  })
})

controller.hears(['tell me about seo'], ['direct_message', 'direct_mention', 'ambient'], function (bot, message) {
  var text = 'Our SEO proposition is based on 5 core pillars.'
  var seo = [{
    fallback: text,
    pretext: 'SEO that gets your site visibility! :sunglasses: :thumbsup:',
    title: 'Plan,& Execute an awesome SEO strategy.',
    image_url: 'https://www.broadplace.com/img/simg-2.jpg',
    title_link: 'https://www.broadplace.com/seo.html',
    text: text,
    color: '#7CD197'
  }]

  bot.reply(message, {
    attachments: seo
  }, function (err, resp) {
    console.log(err, resp)
  })
})

controller.hears(['hello', 'hi'], ['direct_message'], function (bot, message) {
  bot.reply(message, 'Hello.')
  bot.reply(message, 'It\'s nice to talk to you directly.')
})

controller.hears('.*', ['mention'], function (bot, message) {
  bot.reply(message, 'You really do care about me. :heart:')
})

controller.hears('help', ['direct_message', 'direct_mention'], function (bot, message) {
  var help = 'I will respond to the following messages: \n' +
      '`bot hi` for a simple message.\n' +
      '`bot attachment` to see a Slack attachment message.\n' +
      '`@<your bot\'s name>` to demonstrate detecting a mention.\n' +
      '`bot help` to see this again.'
  bot.reply(message, help)
})

controller.hears(['attachment'], ['direct_message', 'direct_mention'], function (bot, message) {
  var text = 'Beep Beep Boop is a ridiculously simple hosting platform for your Slackbots.'
  var attachments = [{
    fallback: text,
    pretext: 'We bring bots to life. :sunglasses: :thumbsup:',
    title: 'Host, deploy and share your bot in seconds.',
    image_url: 'https://storage.googleapis.com/beepboophq/_assets/bot-1.22f6fb.png',
    title_link: 'https://beepboophq.com/',
    text: text,
    color: '#7CD197'
  }]

  bot.reply(message, {
    attachments: attachments
  }, function (err, resp) {
    console.log(err, resp)
  })
})

controller.hears(['run rate'],['ambient', 'direct_message', 'direct_mention'],function(bot,message) {
  bot.startConversation(message, askRunRate);
});

controller.hears('.*',['direct_message','direct_mention','mention'],function(bot,message) {
  bot.reply(message,'Hello yourself.');
});

askRunRate = function(response, convo) {
  convo.ask("Do you need some help with your run rate?", function(response, convo) {
    convo.say("Awesome.");
    askPrevious(response, convo);
    convo.next();
  });
}
askPrevious = function(response, convo) {
  convo.ask("What was your previous spend please?", function(response, convo) {
    var previousSpend = response.text;
    convo.say(response.text + " Ok.")
    askCurrent(response, convo);
    convo.next();
  });
}
askCurrent = function(response, convo) { 
  convo.ask("what is your most recent number?", function(response, convo) {
    var currentSpend = response.text;
    convo.say("Ok! " + previousSpend);
    convo.next();
  });
}

controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
  bot.reply(message, 'Sorry <@' + message.user + '>, I don\'t understand. \n')
})
