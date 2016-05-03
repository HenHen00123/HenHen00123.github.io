var JSON_Encoded;
var JSON_Decoded;
var API_KEY = "d57b82f6-6ec3-4270-b464-0b055050fa08";
var summonerId

function summonerLookUp() {
  var SUMMONER_NAME = "";
  SUMMONER_NAME = $("#userName").val();

  if (SUMMONER_NAME !== "") {

    $.ajax({
      url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + SUMMONER_NAME + '?api_key=' + API_KEY,
      type: 'GET',
      dataType: 'json',
      data: {

      },
      success: function(json) {
        var SUMMONER_NAME_NOSPACES = SUMMONER_NAME.replace(" ", "")
        SUMMONER_NAME_NOSPACES = SUMMONER_NAME_NOSPACES.toLowerCase().trim();

        document.getElementById("sLevel").innerHTML = summonerLevel = json[SUMMONER_NAME_NOSPACES].summonerLevel;

        summonerId = json[SUMMONER_NAME_NOSPACES].id;
        document.getElementById("sID").innerHTML = summonerId;

        listChamps();
        summonerRankGet(summonerId);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("error getting Summoner data!");
      }
    });
  } else {}
}

function summonerRankGet(summonerID) {
  $.ajax({
    url: 'https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/' + summonerID + '/entry?api_key=' + API_KEY,
    type: 'GET',
    dataType: 'json',
    data: {

    },
    success: function(resp) {
      division = resp[summonerID][0].tier;
      league = resp[summonerID][0].entries[0].division;
      lp = resp[summonerID][0].entries[0].leaguePoints;
      document.getElementById("sRank").innerHTML = division + " " + league + " " + lp + " lp";
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert("error getting Summoner rank!");
    }
  });
}

function listChamps() {
  $.ajax({
    url: 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/' + summonerId + '/ranked?season=SEASON2016&api_key=' + API_KEY,
    type: 'GET',
    dataType: 'json',
    data: {

    },
    success: function(json) {
      JSON_Encoded = json;
      JSON_Decoded = JSON.stringify(json);
      document.getElementById("playedChamps").innerHTML = "";
      //take in list of champs and put into an array
      var listOfChamps = [];
      json.champions.forEach(function(item) {
        listOfChamps.push(item);
      });
      listOfChamps.sort(champCompare); //sort list based on # of games
      if (listOfChamps.length < 6) {
        listOfChamps.forEach(function(item) {
          document.getElementById("playedChamps").innerHTML = document.getElementById("playedChamps").innerHTML + item.stats.totalSessionsWon + "-" + item.stats.totalSessionsLost + " on " + getChampName(item.id) + "<br />KDA: " + (parseInt(item.stats.totalChampionKills)/parseInt(item.stats.totalSessionsPlayed)).toFixed(1) + "/" + (parseInt(item.stats.totalDeathsPerSession)/parseInt(item.stats.totalSessionsPlayed)).toFixed(1) + "/" + (parseInt(item.stats.totalAssists)/parseInt(item.stats.totalSessionsPlayed)).toFixed(1) + "<br /><br />";
        });
      } else {
        for (i = 1; i < 6; i++) {
          document.getElementById("playedChamps").innerHTML = document.getElementById("playedChamps").innerHTML + listOfChamps[i].stats.totalSessionsWon + "-" + listOfChamps[i].stats.totalSessionsLost + " on " + getChampName(listOfChamps[i].id) + "<br />KDA: " + (parseInt(listOfChamps[i].stats.totalChampionKills)/parseInt(listOfChamps[i].stats.totalSessionsPlayed)).toFixed(1) + "/" + (parseInt(listOfChamps[i].stats.totalDeathsPerSession)/parseInt(listOfChamps[i].stats.totalSessionsPlayed)).toFixed(1) + "/" + (parseInt(listOfChamps[i].stats.totalAssists)/parseInt(listOfChamps[i].stats.totalSessionsPlayed)).toFixed(1) + "<br /><br />";
        }
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      //alert("error getting champ name!");
    }
  });
}

function getChampName(champId) {
  var name = "";
  if (champId == 35) {
    name = "Shaco";
  } else if (champId == 36) {
    name = "Mundo";
  } else if (champId == 33) {
    name = "Rammus";
  } else if (champId == 34) {
    name = "Anivia";
  } else if (champId == 39) {
    name = "Irelia";
  } else if (champId == 157) {
    name = "Yasuo";
  } else if (champId == 37) {
    name = "Sona";
  } else if (champId == 38) {
    name = "Kassadin";
  } else if (champId == 154) {
    name = "Zac";
  } else if (champId == 150) {
    name = "Gnar";
  } else if (champId == 43) {
    name = "Karma";
  } else if (champId == 42) {
    name = "Corki";
  } else if (champId == 41) {
    name = "Gangplank";
  } else if (champId == 40) {
    name = "Janna";
  } else if (champId == 202) {
    name = "Jhin";
  } else if (champId == 203) {
    name = "Kindred";
  } else if (champId == 201) {
    name = "Braum";
  } else if (champId == 22) {
    name = "Ashe";
  } else if (champId == 23) {
    name = "Tryndamere";
  } else if (champId == 24) {
    name = "Jax";
  } else if (champId == 25) {
    name = "Morg";
  } else if (champId == 26) {
    name = "Zilean";
  } else if (champId == 27) {
    name = "Singed";
  } else if (champId == 28) {
    name = "Eve";
  } else if (champId == 29) {
    name = "Twitch";
  } else if (champId == 3) {
    name = "Galio";
  } else if (champId == 161) {
    name = "Vel'Koz";
  } else if (champId == 2) {
    name = "Olaf";
  } else if (champId == 1) {
    name = "Annie";
  } else if (champId == 30) {
    name = "Karthus";
  } else if (champId == 7) {
    name = "LeBlanc";
  } else if (champId == 6) {
    name = "Urgot";
  } else if (champId == 32) {
    name = "Amumu";
  } else if (champId == 5) {
    name = "Xin Zhao";
  } else if (champId == 31) {
    name = "Cho'Gath";
  } else if (champId == 4) {
    name = "Twisted Fate";
  } else if (champId == 9) {
    name = "Fiddlesticks";
  } else if (champId == 8) {
    name = "Vladimiar";
  } else if (champId == 19) {
    name = "Warwick";
  } else if (champId == 17) {
    name = "Teemo";
  } else if (champId == 18) {
    name = "Tristana";
  } else if (champId == 15) {
    name = "Sivir";
  } else if (champId == 16) {
    name = "Soraka";
  } else if (champId == 13) {
    name = "Ryze";
  } else if (champId == 14) {
    name = "Sion";
  } else if (champId == 11) {
    name = "Master Yi";
  } else if (champId == 12) {
    name = "Alistar";
  } else if (champId == 21) {
    name = "Miss Fortune";
  } else if (champId == 20) {
    name = "Nunu";
  } else if (champId == 107) {
    name = "Rengar";
  } else if (champId == 106) {
    name = "Volibear";
  } else if (champId == 105) {
    name = "Fizz";
  } else if (champId == 104) {
    name = "Graves";
  } else if (champId == 103) {
    name = "Ahri";
  } else if (champId == 102) {
    name = "Shyvana";
  } else if (champId == 99) {
    name = "Lux";
  } else if (champId == 101) {
    name = "Xerath";
  } else if (champId == 412) {
    name = "Thresh";
  } else if (champId == 98) {
    name = "Shen";
  } else if (champId == 96) {
    name = "Kog'Maw";
  } else if (champId == 222) {
    name = "Jinx";
  } else if (champId == 223) {
    name = "Tahm Kench";
  } else if (champId == 92) {
    name = "Riven";
  } else if (champId == 91) {
    name = "Talon";
  } else if (champId == 90) {
    name = "Malzahar";
  } else if (champId == 10) {
    name = "Kayle";
  } else if (champId == 429) {
    name = "Kalista";
  } else if (champId == 420) {
    name = "Illaoi";
  } else if (champId == 89) {
    name = "Leona";
  } else if (champId == 117) {
    name = "Lulu";
  } else if (champId == 79) {
    name = "Gragas";
  } else if (champId == 78) {
    name = "Poppy";
  } else if (champId == 114) {
    name = "Fiora";
  } else if (champId == 115) {
    name = "Ziggs";
  } else if (champId == 77) {
    name = "Udyr";
  } else if (champId == 112) {
    name = "Viktor";
  } else if (champId == 113) {
    name = "Sejuani";
  } else if (champId == 110) {
    name = "Varus";
  } else if (champId == 111) {
    name = "Nautilus";
  } else if (champId == 119) {
    name = "Draven";
  } else if (champId == 432) {
    name = "Bard";
  } else if (champId == 82) {
    name = "Mordekaiser";
  } else if (champId == 245) {
    name = "Ekko";
  } else if (champId == 83) {
    name = "Yorick";
  } else if (champId == 80) {
    name = "Pantheon";
  } else if (champId == 81) {
    name = "Ezreal";
  } else if (champId == 86) {
    name = "Garen";
  } else if (champId == 84) {
    name = "Akali";
  } else if (champId == 85) {
    name = "Kennen";
  } else if (champId == 67) {
    name = "Vayne";
  } else if (champId == 126) {
    name = "Jayce";
  } else if (champId == 127) {
    name = "Lissandra";
  } else if (champId == 69) {
    name = "Cassiopeia";
  } else if (champId == 68) {
    name = "Rumble";
  } else if (champId == 121) {
    name = "Kha'Zix";
  } else if (champId == 122) {
    name = "Darius";
  } else if (champId == 120) {
    name = "Hecarim";
  } else if (champId == 72) {
    name = "Skarner";
  } else if (champId == 236) {
    name = "Lucian";
  } else if (champId == 74) {
    name = "Heimerdinger";
  } else if (champId == 75) {
    name = "Nasus";
  } else if (champId == 238) {
    name = "Zed";
  } else if (champId == 76) {
    name = "Nidalee";
  } else if (champId == 134) {
    name = "Syndra";
  } else if (champId == 59) {
    name = "Jarvan IV";
  } else if (champId == 133) {
    name = "Quinn";
  } else if (champId == 58) {
    name = "Renekton";
  } else if (champId == 57) {
    name = "Maokai";
  } else if (champId == 136) {
    name = "Aurelion Sol";
  } else if (champId == 56) {
    name = "Nocturne";
  } else if (champId == 55) {
    name = "Katarina";
  } else if (champId == 64) {
    name = "Lee Sin";
  } else if (champId == 62) {
    name = "Wukong";
  } else if (champId == 268) {
    name = "Azir";
  } else if (champId == 63) {
    name = "Brand";
  } else if (champId == 131) {
    name = "Diana";
  } else if (champId == 60) {
    name = "Elise";
  } else if (champId == 267) {
    name = "Nami";
  } else if (champId == 266) {
    name = "Aatrox";
  } else if (champId == 61) {
    name = "Oriana";
  } else if (champId == 143) {
    name = "Zyra";
  } else if (champId == 48) {
    name = "Trundle";
  } else if (champId == 45) {
    name = "Veigar";
  } else if (champId == 44) {
    name = "Taric";
  } else if (champId == 51) {
    name = "Caitlyn";
  } else if (champId == 53) {
    name = "Blitzcrank";
  } else if (champId == 54) {
    name = "Malphite";
  } else if (champId == 254) {
    name = "Vi";
  } else if (champId == 50) {
    name = "Swain";
  } else {
    name = "WTF U MESSED UP";
  }
  return name;
}

function champCompare(a, b) {
  if (a.stats.totalSessionsPlayed > b.stats.totalSessionsPlayed) {
    return -1;
  } else if (a.stats.totalSessionsPlayed < b.stats.totalSessionsPlayed) {
    return 1;
  } else {
    if (a.stats.totalSessionsWon > b.stats.totalSessionsWon) {
      return -1;
    } else if (a.stats.totalSessionsWon < b.stats.totalSessionsWon) {
      return 1;
    } else {
      return 0;
    }
  }
}

function encoded() {
  alert(JSON_Encoded);
}

function decoded() {
  alert(JSON_Decoded);
}
