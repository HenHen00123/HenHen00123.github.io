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
      json.champions.forEach(function(item) {
        getChampName(item.id, item.stats.totalSessionsLost, item.stats.totalSessionsWon);
      });
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      //alert("error getting champ name!");
    }
  });
}

function getChampName(champId, gamesLost, gamesWon) {
  $.ajax({
    url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + champId + '?api_key=' + API_KEY,
    type: 'GET',
    dataType: 'json',
    data: {

    },
    success: function(json) {
      document.getElementById("playedChamps").innerHTML = document.getElementById("playedChamps").innerHTML + gamesWon + "-" + gamesLost + " on " + json.name + "<br />";
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      //alert("error getting champ name!");
    }
  });
}

function encoded() {
  alert(JSON_Encoded);
}

function decoded() {
  alert(JSON_Decoded);
}