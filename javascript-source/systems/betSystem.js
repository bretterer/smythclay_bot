(function () {
    var betMinimum = ($.inidb.exists('betSettings', 'betMinimum') ? parseInt($.inidb.get('betSettings', 'betMinimum')) : 0),
        betMaximum = ($.inidb.exists('betSettings', 'betMaximum') ? parseInt($.inidb.get('betSettings', 'betMaximum')) : 50),
        time = 0,
        betStatus = false,
        betPot = 0,
        betOptions = [],
        betTable = [];

    function betOpen(event, bet) {
        var sender = event.getSender(),
            args = event.getArgs(),
            string,
            betOp = '',
            i;

        if (betStatus) {
            $.say($.whisperPrefix(sender) + $.lang.get('betsystem.err.bet.opened'));
            return;
        }

        if (bet.length < 2) {
            $.say($.whisperPrefix(sender) + $.lang.get('betsystem.err.options'));
            return;
        }

        for (i = 0; i < bet.length; i++) {
            betOptions.push(bet[i].toLowerCase().trim());
        }

        string = betOptions.join(' vs ');

        betStatus = true;
        
        $.say($.lang.get('betsystem.opened', string, $.pointNameMultiple));
    };

    function betClose(sender, event, subAction) {
        var args = event.getArgs(), 
            betWinning = subAction.toLowerCase(),
            betWinPercent = 0,
            betPointsWon = 0,
            betWinners = '',
            betTotal = 0,
            bet,
            a = 0,
            i;

        if (!betStatus) {
            $.say($.whisperPrefix(sender) + $.lang.get('betsystem.err.bet.closed'));
            return;
        }

        if (!betWinning) {
            $.say($.whisperPrefix(sender) + $.lang.get('betsystem.err.win.option'));
            return;
        }

        if (!$.list.contains(betOptions, betWinning)) {
            $.say($.whisperPrefix(sender) + $.lang.get('betsystem.err.option.404'));
            return;
        }

        betStatus = false;

        for (i in betTable) {
            bet = betTable[i];
            if (bet.option.equalsIgnoreCase(betWinning)) {
                betTotal = bet.amount;
            }
        }

        for (i in betTable) {
            a++;
            bet = betTable[i];
            if (bet.option.equalsIgnoreCase(betWinning)) {
                betPointsWon = (betPot / betTotal);
                if (betPointsWon > 0) {
                    if (betWinners.length > 0) {
                        betWinners += ', ';
                    }
                    betWinners = i;
                }
            }
        }

        if (a < betMinimum) {
            for (i in betTable) {
                bet = betTable[i];
                $.inidb.incr('points', i, bet.amount);
            }

            $.say($.lang.get('betsystem.not.enough.ppl'));
            return;
        }

        if (betTotal == 0) {
            $.say($.lang.get('betsystem.closed.404'));
            return;
        }

        if (betPot <= 0) {
            for (i in betTable) {
                bet = betTable[i];
                $.inidb.incr('points', i, bet.amount);
            }
            $.say($.lang.get('betsystem.err.points.refunded'));
            return;
        }

        for (i in betTable) {
            bet = betTable[i];
            if (bet.option.equalsIgnoreCase(betWinning)) {
                betWinPercent = (bet.amount / betTotal);
                $.inidb.incr('points', i, (betPot * betWinPercent));
            }
        }
        
        $.say($.lang.get('betsystem.closed', betWinning, $.getPointsString(betPot * betWinPercent)));
        betPot = 0;
        betTotal = 0;
        betWinners = '';
    };

    $.bind('command', function (event) {
        var sender = event.getSender(),
            command = event.getCommand(),
            argString = event.getArguments().trim(),
            args = event.getArgs(),
            action = args[0],
            subAction = args[1],
            bet = args.slice(1);

        if (command.equalsIgnoreCase('bet')) {
            if (action.equalsIgnoreCase('open')) {
                if (!$.isModv3(sender, event.getTags())) {
                    $.say($.whisperPrefix(sender) + $.modMsg);
                    return;
                }
                betOpen(event, bet);
                return;
            } else if (action.equalsIgnoreCase('close')) {
                if (!$.isModv3(sender, event.getTags())) {
                    $.say($.whisperPrefix(sender) + $.modMsg);
                    return;
                }
                betClose(sender, event, subAction);
                return;
            } else if (action.equalsIgnoreCase('setminimum')) {
                if (!$.isModv3(sender, event.getTags())) {
                    $.say($.whisperPrefix(sender) + $.modMsg);
                    return;
                }

                if (!subAction) {
                    $.say($.whisperPrefix(sender) + $.lang.get('betsystem.set.min.usage'));
                    return;
                }

                betMinimum = parseInt(subAction);
                $.inidb.set('betSettings', 'betMinimum', betMinimum);
                $.say($.whisperPrefix(sender) + $.lang.get('betsystem.set.min', betMinimum, $.pointNameMultiple));
                return;
            } else if (action.equalsIgnoreCase('setmaximum')) {
                if (!$.isModv3(sender, event.getTags())) {
                    $.say($.whisperPrefix(sender) + $.modMsg);
                    return;
                }

                if (!subAction) {
                    $.say($.whisperPrefix(sender) + $.lang.get('betsystem.set.max.usage'));
                    return;
                }

                betMaximum = parseInt(subAction);
                $.inidb.set('betSettings', 'betMinimum', betMaximum);
                $.say($.whisperPrefix(sender) + $.lang.get('betsystem.set.max', betMaximum, $.pointNameMultiple));
                return;
            } else if (isNaN(action) || !isNaN(parseInt(action))) {
                if (!betStatus) {
                    $.say($.whisperPrefix(sender) + $.lang.get('betsystem.err.bet.closed'));
                    return;
                }

                var betWager = parseInt(action),
                    betOption = subAction;

                if (!$.list.contains(betOptions, betOption.toLowerCase())) {
                    $.say($.whisperPrefix(sender) + $.lang.get('betsystem.err.option.404'));
                    return;
                } else if (betWager < 1) {
                    $.say($.whisperPrefix(sender) + $.lang.get('betsystem.bet.err.neg', $.pointNameMultiple));
                    return;
                } else if (betWager < betMinimum) {
                    $.say($.whisperPrefix(sender) + $.lang.get('betsystem.bet.err.less', $.getPointString(betMinimum)));
                    return;
                } else if (betWager > betMaximum) {
                    $.say($.whisperPrefix(sender) + 'You can not bet more then ' + $.getPointString(betMaximum));
                    $.say($.whisperPrefix(sender) + $.lang.get('betsystem.bet.err.more', $.getPointString(betMaximum)));
                    return;
                } else if ($.getUserPoints(sender) < betWager) {
                    $.say($.whisperPrefix(sender) + $.lang.get('betsystem.err.points', $.pointNameMultiple));
                    return;
                } 

                for (i in betTable) {
                    if (sender.equalsIgnoreCase(i)) {
                        $.say($.whisperPrefix(sender) + $.lang.get('betsystem.err.voted'));
                        return;
                    }
                }

                $.inidb.decr('points', sender, betWager);

                if (betPot == 0) {
                    betPot = betWager;
                } else {
                    betPot = (betPot + betWager);
                }

                betTable[sender] = {
                    amount : betWager,
                    option : betOption
                };

                $.say($.lang.get('betsystem.bet.updated', sender, $.getPointsString(betWager), betOption, $.getPointsString(betPot)));
            } 
        }
    });

    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./systems/betSystem.js')) {
            $.registerChatCommand('./systems/betSystem.js', 'bet', 7);
        }
    });
})();