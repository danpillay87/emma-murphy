var Botkit = require('botkit')

var token = process.env.SLACK_TOKEN
var request = require("request");	

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

                                                //TALKING ABOUT PRODUCTS//

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

controller.hears(['tell me about competitor reports'], ['direct_message', 'direct_mention', 'ambient'], function (bot, message) {
  var text = 'Broadplace Engage Provides Incredibly Competitor Analysis.'
  var engage = [{
    fallback: text,
    pretext: 'Steal a march on the competition and get a website report that shows you how you rank',
    title: 'See how your site ranks vs the rest',
    image_url: 'https://s3.amazonaws.com/us.resources.haystack.silktide.com/customstyles/broadplace-logo.png',
    title_link: 'http://engage.broadplace.com',
    text: text,
    color: '#7CD197'
  }]

  bot.reply(message, {
    attachments: engage
  }, function (err, resp) {
    console.log(err, resp)
  })
})

controller.hears(['tell me about launchpad'], ['direct_message', 'direct_mention', 'ambient'], function (bot, message) {
  var text = 'LaunchPad helps you plan your digital marketing in a few clicks.'
  var launchpad = [{
    fallback: text,
    pretext: 'WOW, Marketing Plans made easy',
    title: 'Plan a rockin new marketing plan in a seconds',
    image_url: 'http://launchpad-planner.com/img/devices/browser4.jpg',
    title_link: 'http://launchpad-planner.com/',
    text: text,
    color: '#7CD197'
  }]

  bot.reply(message, {
    attachments: launchpad
  }, function (err, resp) {
    console.log(err, resp)
  })
})

                                                //TALKING TO DASHBOARDS//

//big number post
controller.hears(['big number is (.*) it was (.*)'], ['direct_message', 'direct_mention', 'ambient'], function (bot, message) {
  bigNumber = message.match[1];
  smallNumber = message.match[2];
  //make the dashing hit
  var postData = {
  auth_token: 'bp123',
  current: bigNumber,
  last: smallNumber
}

var url = 'http://178.62.99.45:3030/widgets/big-number'
var options = {
  method: 'post',
  body: postData,
  json: true,
  url: url,
  headers: { //We can define headers too
        'Content-Type': 'application/json'
    }
}

request(options, function (err, res, body) {
  if (err) {
    console.log('error posting json')
    return
  }
  var headers = res.headers
  var statusCode = res.statusCode
})
    bot.reply(message, 'Sweet I just posted your data. - nice work!')
});

//forecast number post
controller.hears(['forecast is (.*) it was (.*)'], ['direct_message', 'direct_mention', 'ambient'], function (bot, message) {
  bigNumber = message.match[1];
  smallNumber = message.match[2];
  //make the dashing hit
  var postData = {
  auth_token: 'bp123',
  current: bigNumber,
  last: smallNumber
}

var url = 'http://178.62.99.45:3030/widgets/forecast-number'
var options = {
  method: 'post',
  body: postData,
  json: true,
  url: url,
  headers: { //We can define headers too
        'Content-Type': 'application/json'
    }
}

request(options, function (err, res, body) {
  if (err) {
    console.log('error posting json')
    return
  }
  var headers = res.headers
  var statusCode = res.statusCode
})
    bot.reply(message, 'Sweet I just posted your data. - nice work!')
});

//growth number post
controller.hears(['ssg is (.*)'], ['direct_message', 'direct_mention', 'ambient'], function (bot, message) {
  bigNumber = message.match[1];
  smallNumber = message.match[2];
  //make the dashing hit
  var postData = {
  auth_token: 'bp123',
  current: bigNumber,
  last: smallNumber
}

var url = 'http://178.62.99.45:3030/widgets/ssg'
var options = {
  method: 'post',
  body: postData,
  json: true,
  url: url,
  headers: { //We can define headers too
        'Content-Type': 'application/json'
    }
}

request(options, function (err, res, body) {
  if (err) {
    console.log('error posting json')
    return
  }
  var headers = res.headers
  var statusCode = res.statusCode
})
    bot.reply(message, 'Sweet I just posted your data. - nice work!')
});

//churn number post
controller.hears(['churn is (.*)'], ['direct_message', 'direct_mention', 'ambient'], function (bot, message) {
  bigNumber = message.match[1];
  smallNumber = message.match[2];
  //make the dashing hit
  var postData = {
  auth_token: 'bp123',
  current: bigNumber,
  last: smallNumber
}

var url = 'http://178.62.99.45:3030/widgets/churn'
var options = {
  method: 'post',
  body: postData,
  json: true,
  url: url,
  headers: { //We can define headers too
        'Content-Type': 'application/json'
    }
}

request(options, function (err, res, body) {
  if (err) {
    console.log('error posting json')
    return
  }
  var headers = res.headers
  var statusCode = res.statusCode
})
    bot.reply(message, 'Sweet I just posted your data. - nice work!')
});

//ftm progress post
/*controller.hears(['ftm big number is (.*)'], ['direct_message', 'direct_mention', 'ambient'], function (bot, message) {
  ftmProgress = message.match[1];
  ftmPrevious = message.match[2];
  ftmTarget = 357;
  ftmPerc = (Math.floor(ftmProgress/ftmTarget) *100);
  //make the dashing hit
  var postData = {
  auth_token: 'bp123',
  value: ftmProgress,
}

var url = 'http://178.62.99.45:3030/widgets/ftm-progress'
var options = {
  method: 'post',
  body: postData,
  json: true,
  url: url,
  headers: { //We can define headers too
        'Content-Type': 'application/json'
    }
}

request(options, function (err, res, body) {
  if (err) {
    console.log('error posting json')
    return
  }
  var headers = res.headers
  var statusCode = res.statusCode
})
    bot.reply(message, 'Nice Work FTM - Your Numbers are up to date!')
});*/

// FTM Target Update
controller.hears(['ftm target'], ['direct_message', 'direct_mention'], function(bot,message) {
    askUpdate = function(response, convo) {
      convo.ask('It must be target time! Shall we update the team numbers?', function(response, convo) {
        convo.say('Cool, happy to help.');
        askCurrent(response, convo);
        convo.next();
      });
    }
    
    askCurrent = function(response, convo) {
      convo.ask('What is the teams latest spend number please?', function(response, convo) {
        currentNumber = Number(response.text.replace(/[^0-9\.]+/g,""));
        convo.say('£' + currentNumber + ' Ok, Great!')
        //make the dashing hit
              var postData = {
              auth_token: 'bp123',
              current: currentNumber,
            }

            var url = 'http://178.62.99.45:3030/widgets/ftm-bank'
            var options = {
              method: 'post',
              body: postData,
              json: true,
              url: url,
              headers: { //We can define headers too
                    'Content-Type': 'application/json'
                }
            }

            request(options, function (err, res, body) {
              if (err) {
                console.log('error posting json')
                return
              }
              var headers = res.headers
              var statusCode = res.statusCode
            })
        //end dashing hit
        askPrevious(response, convo);
        convo.next();
      });
    }
    
    askPrevious = function(response, convo) {
      convo.ask('and what was last weeks number?', function(response, convo) {
        previousNumber = Number(response.text.replace(/[^0-9\.]+/g,""));;
        runRate = Math.floor((currentNumber - previousNumber)/7);
        percRate = ((currentNumber/356000) * 100).toFixed(0);
        convo.say('£' + previousNumber + ' Ok! so I guess your daily rate will be around £' + runRate + ' and you are ' + percRate + '% to target.');
        //make the dashing hit
              var postData = {
              auth_token: 'bp123',
              value: percRate,
            }

            var url = 'http://178.62.99.45:3030/widgets/ftm-progress'
            var options = {
              method: 'post',
              body: postData,
              json: true,
              url: url,
              headers: { //We can define headers too
                    'Content-Type': 'application/json'
                }
            }

            request(options, function (err, res, body) {
              if (err) {
                console.log('error posting json')
                return
              }
              var headers = res.headers
              var statusCode = res.statusCode
            })
        //end dashing hit
        askLeaderboard(response, convo);
        convo.next();
      });
    }

    askLeaderboard = function(response, convo) {
      convo.ask('So what does that forecast to?', function(response, convo) {
        forecast = Number(response.text.replace(/[^0-9\.]+/g,""));;
        convo.say('Thanks - that should do us for this week - check out the company stats and good luck!');
        //make the dashing hit
              var postData = {
              auth_token: 'bp123',
              current: forecast,
            }

            var url = 'http://178.62.99.45:3030/widgets/ftm-forecast'
            var options = {
              method: 'post',
              body: postData,
              json: true,
              url: url,
              headers: { //We can define headers too
                    'Content-Type': 'application/json'
                }
            }

            request(options, function (err, res, body) {
              if (err) {
                console.log('error posting json')
                return
              }
              var headers = res.headers
              var statusCode = res.statusCode
            })
        //end dashing hit
        convo.next();
      });
    }
    bot.startConversation(message, askUpdate);
});

// NOK Target Update
controller.hears(['nok target'], ['direct_message', 'direct_mention'], function(bot,message) {
    askUpdate = function(response, convo) {
      convo.ask('It must be target time! Shall we update the team numbers?', function(response, convo) {
        convo.say('Cool, happy to help.');
        askCurrent(response, convo);
        convo.next();
      });
    }
    
    askCurrent = function(response, convo) {
      convo.ask('What is the teams latest spend number please?', function(response, convo) {
        currentNumber = Number(response.text.replace(/[^0-9\.]+/g,""));
        convo.say('£' + currentNumber + ' Ok, Great!')
        //make the dashing hit
              var postData = {
              auth_token: 'bp123',
              current: currentNumber,
            }

            var url = 'http://178.62.99.45:3030/widgets/nok-bank'
            var options = {
              method: 'post',
              body: postData,
              json: true,
              url: url,
              headers: { //We can define headers too
                    'Content-Type': 'application/json'
                }
            }

            request(options, function (err, res, body) {
              if (err) {
                console.log('error posting json')
                return
              }
              var headers = res.headers
              var statusCode = res.statusCode
            })
        //end dashing hit
        askPrevious(response, convo);
        convo.next();
      });
    }
    
    askPrevious = function(response, convo) {
      convo.ask('and what was last weeks number?', function(response, convo) {
        previousNumber = Number(response.text.replace(/[^0-9\.]+/g,""));;
        runRate = Math.floor((currentNumber - previousNumber)/7);
        percRate = ((currentNumber/457000) * 100).toFixed(0);
        convo.say('£' + previousNumber + ' Ok! so I guess your daily rate will be around £' + runRate + ' and you are ' + percRate + '% to target.');
        //make the dashing hit
              var postData = {
              auth_token: 'bp123',
              value: percRate,
            }

            var url = 'http://178.62.99.45:3030/widgets/nok-progress'
            var options = {
              method: 'post',
              body: postData,
              json: true,
              url: url,
              headers: { //We can define headers too
                    'Content-Type': 'application/json'
                }
            }

            request(options, function (err, res, body) {
              if (err) {
                console.log('error posting json')
                return
              }
              var headers = res.headers
              var statusCode = res.statusCode
            })
        //end dashing hit
        askLeaderboard(response, convo);
        convo.next();
      });
    }

    askLeaderboard = function(response, convo) {
      convo.ask('So what does that forecast to?', function(response, convo) {
        forecast = Number(response.text.replace(/[^0-9\.]+/g,""));;
        convo.say('Thanks - that should do us for this week - check out the company stats and good luck!');
        //make the dashing hit
              var postData = {
              auth_token: 'bp123',
              current: forecast,
            }

            var url = 'http://178.62.99.45:3030/widgets/nok-forecast'
            var options = {
              method: 'post',
              body: postData,
              json: true,
              url: url,
              headers: { //We can define headers too
                    'Content-Type': 'application/json'
                }
            }

            request(options, function (err, res, body) {
              if (err) {
                console.log('error posting json')
                return
              }
              var headers = res.headers
              var statusCode = res.statusCode
            })
        //end dashing hit
        convo.next();
      });
    }
    bot.startConversation(message, askUpdate);
});

// Ind Target Update
controller.hears(['ind target'], ['direct_message', 'direct_mention'], function(bot,message) {
    askUpdate = function(response, convo) {
      convo.ask('It must be target time! Shall we update the team numbers?', function(response, convo) {
        convo.say('Cool, happy to help.');
        askCurrent(response, convo);
        convo.next();
      });
    }
    
    askCurrent = function(response, convo) {
      convo.ask('What is the teams latest spend number please?', function(response, convo) {
        currentNumber = Number(response.text.replace(/[^0-9\.]+/g,""));
        convo.say('£' + currentNumber + ' Ok, Great!')
        //make the dashing hit
              var postData = {
              auth_token: 'bp123',
              current: currentNumber,
            }

            var url = 'http://178.62.99.45:3030/widgets/ind-bank'
            var options = {
              method: 'post',
              body: postData,
              json: true,
              url: url,
              headers: { //We can define headers too
                    'Content-Type': 'application/json'
                }
            }

            request(options, function (err, res, body) {
              if (err) {
                console.log('error posting json')
                return
              }
              var headers = res.headers
              var statusCode = res.statusCode
            })
        //end dashing hit
        askPrevious(response, convo);
        convo.next();
      });
    }
    
    askPrevious = function(response, convo) {
      convo.ask('and what was last weeks number?', function(response, convo) {
        previousNumber = Number(response.text.replace(/[^0-9\.]+/g,""));;
        runRate = Math.floor((currentNumber - previousNumber)/7);
        percRate = ((currentNumber/236000) * 100).toFixed(0);
        convo.say('£' + previousNumber + ' Ok! so I guess your daily rate will be around £' + runRate + ' and you are ' + percRate + '% to target.');
        //make the dashing hit
              var postData = {
              auth_token: 'bp123',
              value: percRate,
            }

            var url = 'http://178.62.99.45:3030/widgets/ind-progress'
            var options = {
              method: 'post',
              body: postData,
              json: true,
              url: url,
              headers: { //We can define headers too
                    'Content-Type': 'application/json'
                }
            }

            request(options, function (err, res, body) {
              if (err) {
                console.log('error posting json')
                return
              }
              var headers = res.headers
              var statusCode = res.statusCode
            })
        //end dashing hit
        askLeaderboard(response, convo);
        convo.next();
      });
    }

    askLeaderboard = function(response, convo) {
      convo.ask('So what does that forecast to?', function(response, convo) {
        forecast = Number(response.text.replace(/[^0-9\.]+/g,""));;
        convo.say('Thanks - that should do us for this week - check out the company stats and good luck!');
        //make the dashing hit
              var postData = {
              auth_token: 'bp123',
              current: forecast,
            }

            var url = 'http://178.62.99.45:3030/widgets/ind-forecast'
            var options = {
              method: 'post',
              body: postData,
              json: true,
              url: url,
              headers: { //We can define headers too
                    'Content-Type': 'application/json'
                }
            }

            request(options, function (err, res, body) {
              if (err) {
                console.log('error posting json')
                return
              }
              var headers = res.headers
              var statusCode = res.statusCode
            })
        //end dashing hit
        convo.next();
      });
    }
    bot.startConversation(message, askUpdate);
});

// Test conversation with memory
controller.hears(['ppc package'], ['direct_message', 'direct_mention'], function(bot,message) {
    askPackage = function(response, convo) {
      convo.ask('Want a quote for an PPC package?', function(response, convo) {
        convo.say('Cool, happy to help.');
        askExisting(response, convo);
        convo.next();
      });
    }
    
    askExisting = function(response, convo) {
      convo.ask('How much are you spending on traffic/clicks at the moment?', function(response, convo) {
        currentSpend = Number(response.text.replace(/[^0-9\.]+/g,""));
        convo.say('£' + currentSpend + ' Ok, Great!')
        
        function recommendPackage() {
            //recommend the package here
                recommendedPackage = "Professional";            
        }
          
        //recommendedPackage = "awesome"
        convo.say('Then we would recommend our' + recommendPackage.recommendedPackage + 'package' )
        askConfirm(response, convo);
        convo.next();
      });
    }
    
    askConfirm = function(response, convo) {
      convo.ask('Does that sound reasonable to you?', function(response, convo) {
        convo.say('£' + currentRate + ' Ok! so I guess your daily rate will be around £' + runRate);
        convo.next();
      });
    }

    bot.startConversation(message, askPackage);
});

                                                //CATCH ALL CONVERSATIONS//

controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
  bot.reply(message, 'Sorry <@' + message.user + '>, I don\'t understand. \n')
})
