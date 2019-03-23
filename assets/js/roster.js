var apiKey = "0a11942f318647978979f13ad8aa53ee", // production
    a8GroupId = "1801684";

// get list of members and populate roster table

var roster = [];

var twitch = new Object();
twitch['The_Jedd']         = 'the_j3dd';
twitch['smashi__']         = 'supersmashi';
twitch['ArctisFear']       = 'arctisfear';
twitch['Intemerata_']      = 'intemerata_';
twitch['ronobear87']       = 'ronobear87';
twitch['Fryde']            = 'fry_de';
twitch['iHackEpic']        = 'ihackepic';
twitch['Hushspesh']        = 'hushspesh101';
twitch['LyRaD87cP']        = 'dazzah87';
twitch['Mini-B0rg40']      = 'terrybjsr27';
twitch['Deecs259']         = 'deecs259';
twitch['CristianoRicky16'] = 'cristianoricky1';
twitch['murdie1']          = 'gabbercrew';
twitch['Dannilad09']       = 'dannilad';
twitch['XanderLuke']       = 'andimgonex';
twitch['PrOme-']       	   = 'prome84';

$.when(
        // get A8 roster
        $.ajax({
            url: "https://www.bungie.net/platform/GroupV2/" + a8GroupId + "/Members/",
            headers: {
                "X-API-Key": apiKey
            }
        })

        .done(function(json) {

            if (json.ErrorStatus === 'Success') {

                var members = json.Response.results;

                $.each(members, function(i) {
                    roster.push(members[i])
                });

                //console.log('a8s member list:', members);

            } else {

                console.log('JSON responded with ', json.ErrorStatus);

            }

        })
        .fail(function(err) {

            console.log(err);

        })

    )
    .then(function() {
       // console.log(roster);
        listMembers(roster);

    });


function listMembers(rsp) {

    var
        list = $('.roster-table tbody'),
        on = 0,
        sortMembers = function(method) {
            // sort by date joined
            if (method == joined) {
                list.find('.member').sort(function(a, b) {
                    return ($(b).data('joined')) < ($(a).data('joined')) ? 1 : -1;
                }).appendTo(list);
            } else if (method == username) {
                list.find('.member').sort(function(a, b) {
                    return ($(b).data('username')) < ($(a).data('username')) ? 1 : -1;
                }).appendTo(list);
            }
            list.find('.member.online').prependTo(list);
        };

    for (var i = 0; i < rsp.length; i++) {

        var
            profile = rsp[i].bungieNetUserInfo,
            member = $('<tr></tr>');

        // tally up online members
        if (rsp[i].isOnline) {
            on++
        }

        // check for valid profile
        // some users don't have Bungie profiles somehow and it breaks function
        if (typeof profile != 'undefined') {
            // store response data in semantic variables
            var
                name = rsp[i].destinyUserInfo.displayName,
                joinDate = rsp[i].joinDate,
                joined = joinDate.substring(0, joinDate.indexOf('T')),
                online = rsp[i].isOnline
                icon = profile.emblemPath,
                memberId = profile.membershipId,
                memberType = rsp[i].memberType,
                destinyId = rsp[i].destinyUserInfo.membershipId,
                charId = rsp[i].destinyUserInfo.characterId,
                rank = rsp[i].memberType,
                role = '';

            if (rank == 2) {
                role = "<font color=\"#FFFFFF\">" + "Member" + " </font>";
            } else if (rank == 3) {
                role = "<font color=\"#F1C410\">" + "Admin" + " </font>";
            } else if (rank == 5) {
                role = "<font color=\"#F1C410\">" + "Founder" + " </font>"
            }

            // configure DOM node and add to page
            member
                .attr({
                    'class': 'text-left member',
                    'href': '/player.html?bungieId=' + memberId + '&destinyId=' + destinyId + '&joined=' + joined + '&rank=' + rank,
                    'data-joined': joined.replace(/-/g, ''),
                    'data-username': name,
                    'data-online': 'false',
                    'data-searchable': name,
                })
                .html(
                    '<td class="align-middle">' + name + '</td>' + // PSN username
                    '<td class="align-middle">' + role + '</td>' + // Role - Not the Discord role yet
                    '<td class="align-middle">' + joined.replace(/-/g, '/') + '</td>' + // Joined date
                    '<td class="align-middle member-status"><span class="member-online" id="status-' + memberId + '">' + online + '</span></td>' + // In-game online status

                    '<td class="align-middle"><div class="d-flex justify-content-center"> <div class="d-flex flex-column justify-content-center"> <a href="https://www.bungie.net/en/Gear/2/' + destinyId +'/" target="_blank" class="text-decoration-none border border-2 border-success ml-1 mr-2"> <div class="character d-flex flex-column justify-content-center align-items-center" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://bungie.net/common/destiny2_content/icons/55a5cc70efd99a26381fb4f0c723b868.jpg);"> <div class="light text-white font-weight-bold">650</div><div class="level text-white">Warlock</div></div></a> </div><div class="d-flex flex-column justify-content-center"> <a href="https://www.bungie.net/en/Gear/2/' + destinyId + '/" target="_blank" class="text-decoration-none border border-2 border-success ml-1 mr-2"> <div class="character d-flex flex-column justify-content-center align-items-center" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://bungie.net/common/destiny2_content/icons/1879398bc8a50d47cdd14cc746c073e1.jpg);"> <div class="light text-white font-weight-bold">650</div><div class="level text-white">Hunter</div></div></a> </div><div class="d-flex flex-column justify-content-center"> <a href="https://www.bungie.net/en/Gear/2/' + destinyId +'/" target="_blank" class="text-decoration-none border border-2 border-success ml-1 mr-2"> <div class="character d-flex flex-column justify-content-center align-items-center" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://bungie.net/common/destiny2_content/icons/a54c79ffd33a1b7cdb2d37fc003aed8b.jpg);"> <div class="light text-white font-weight-bold">650</div><div class="level text-white">Titan</div></div></a> </div></div></td>' + // Destiny toons
                    
                    '<td class="align-middle text-center">'+((!twitch[name]) ? '' : '<a target="_blank" href="https://twitch.tv/' + twitch[name] +'"><i class="fab fa-twitch fa-lg" style="color:white"></i></a>')+'</td>' +  // Twitch - yes, show icon | no, show nothing
                    '<td class="align-middle text-center">'+('<a target="_blank" href="https://www.wastedondestiny.com/2_' + destinyId +'"><i class="far fa-clock fa-lg" style="color:white"></i></a>')+'</td>' + // Wasted Time on Destiny
                    '<td class="align-middle text-center"><a target="_blank" href="https://destinytracker.com/d2/profile/psn/' + name + '">Stats</a></td>' + // DTR Profile
                    '<td class="align-middle text-center"><a target="_blank" href="https://raid.report/ps/' + name + '">Clears</a></td>' // Raid Report Profile
                );

            member.appendTo(list);

            // indicate online/offline status
            if (String(online) === 'true') {
                $('#status-' + memberId)
                    .text('Online')
                    .addClass('online')
                    .closest('.member')
                    .attr('data-online', true)
                    .addClass('online');
            } else {
                $('#status-' + memberId).text('Offline').removeClass('online');
            }

            sortMembers(joined); // sort members by join date

        }

    }

    $('#member-count').text(on + ' / ' + rsp.length + ' Members Online');

}
