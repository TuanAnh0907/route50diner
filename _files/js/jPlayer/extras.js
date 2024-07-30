$(function () {

    var playItem = 0;

    var myPlayList = [{name: "The Twist", mp3: "/_files/js/jPlayer/thetwist.mp3"}, {
        name: "Sitting on the Dock",
        mp3: "/_files/js/jPlayer/dock.mp3"
    }, {name: "My Girl", mp3: "/_files/js/jPlayer/girl.mp3"}, {name: "Sugar Pie", mp3: "/_files/js/jPlayer/sugar.mp3"}];

    // Local copy of jQuery selectors, for performance.
    var jpPlayTime = $("#jplayer_play_time");
    var jpTotalTime = $("#jplayer_total_time");
    var jpStatus = $("#demo_status"); // For displaying information about jPlayer's status in the demo page

    $("#jquery_jplayer").jPlayer({
        ready: function () {
            displayPlayList();
            playListInit(false); // Parameter is a boolean for autoplay.
            demoInstanceInfo(this.element, $("#demo_info")); // This displays information about jPlayer's configuration in the demo page
        }, oggSupport: true
    })
        .jPlayer("onProgressChange", function (loadPercent, playedPercentRelative, playedPercentAbsolute, playedTime, totalTime) {
            jpPlayTime.text($.jPlayer.convertTime(playedTime));
            jpTotalTime.text($.jPlayer.convertTime(totalTime));

            demoStatusInfo(this.element, jpStatus); // This displays information about jPlayer's status in the demo page
        })
        .jPlayer("onSoundComplete", function () {
            playListNext();
        });

    $("#jplayer_previous").click(function () {
        playListPrev();
        return false;
    });

    $("#jplayer_next").click(function () {
        playListNext();
        return false;
    });

    function displayPlayList() {
        for (i = 0; i < myPlayList.length; i++) {
            $("#jplayer_playlist ul").append("<li id='jplayer_playlist_item_" + i + "'>" + myPlayList[i].name + "</li>");
            $("#jplayer_playlist_item_" + i).data("index", i).click(function () {
                var index = $(this).data("index");
                if (playItem != index) {
                    playListChange(index);
                } else {
                    $("#jquery_jplayer").jPlayer("play");
                }
            });
        }
    }

    function playListInit(autoplay) {
        if (autoplay) {
            playListChange(playItem);
        } else {
            playListConfig(playItem);
        }
    }

    function playListConfig(index) {
        $("#jplayer_playlist_item_" + playItem).removeClass("jplayer_playlist_current");
        $("#jplayer_playlist_item_" + index).addClass("jplayer_playlist_current");
        playItem = index;
        $("#jquery_jplayer").jPlayer("setFile", myPlayList[playItem].mp3, myPlayList[playItem].ogg);
    }

    function playListChange(index) {
        playListConfig(index);
        $("#jquery_jplayer").jPlayer("play");
    }

    function playListNext() {
        var index = (playItem + 1 < myPlayList.length) ? playItem + 1 : 0;
        playListChange(index);
    }

    function playListPrev() {
        var index = (playItem - 1 >= 0) ? playItem - 1 : myPlayList.length - 1;
        playListChange(index);
    }
});
