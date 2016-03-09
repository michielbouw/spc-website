angular.module('mainapp.api')
    .factory('Api', function($resource)
    {
        var url1 = '/api/v1/';

        return {
            //News:           $resource(url1 + 'news',              {},                     { 'query': {method:'GET', isArray:true}, 'post': {method:'POST'} }),
            //NewsItem:       $resource(url1 + 'news/:_slug',       {_slug:'@_slug'},       { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} }),

            Clubs:              $resource(url1 + 'clubs',             {},                     { 'query': {method:'GET', isArray:true}, 'post': {method:'POST'} }),
            Club:               $resource(url1 + 'clubs/:_slug',      {_slug:'@_slug'},       { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} }),
            Matches:            $resource(url1 + 'matches',           {},                     { 'query': {method:'GET', isArray:true}, 'post': {method:'POST'} }),
            MatchesTeam:        $resource(url1 + 'matches/:_id',      {_id:'@_id'},           { 'query': {method:'GET', isArray:true} }),
            Match:              $resource(url1 + 'match/:_id',        {_id:'@_id'},           { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} }),
            Toeschouwers:       $resource(url1 + 'toeschouwers/:_id', {_id:'@_id'},           { 'get': {method:'GET'}, 'put': {method:'PUT'} }),
            TeamData:           $resource(url1 + 'teamdata',          {},                     { 'query': {method:'GET', isArray:true}, 'post': {method:'POST'} }),
            TeamDataItem:       $resource(url1 + 'teamdata/:_slug',   {_slug:'@_slug'},       { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} }),
            MatchData:          $resource(url1 + 'matchdata',         {},                     { 'query': {method:'GET', isArray:true}, 'post': {method:'POST'} }),
            MatchDataItem:      $resource(url1 + 'matchdata/:_id',    {_id:'@_id'},           { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} }),
            MatchDataID:        $resource(url1 + 'matchdataid/:_id',  {_id:'@_id'},           { 'get': {method:'GET'}, 'delete': {method:'DELETE'} }),
            ScoutingData:       $resource(url1 + 'scoutingdata',      {},                     { 'query': {method:'GET', isArray:true}, 'post': {method:'POST'} }),
            ScoutingDataItem:   $resource(url1 + 'scoutingdata/:_slug',{_slug:'@_slug'},      { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} }),
            Pages:              $resource(url1 + 'pages',             {},                     { 'query': {method:'GET', isArray:true}, 'post': {method:'POST'} }),
            Page:               $resource(url1 + 'pages/:_id',        {_id:'@_id'},           { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} }),
            Spelers:            $resource(url1 + 'spelers',           {},                     { 'query': {method:'GET', isArray:true}, 'post': {method:'POST'} }),
            SpelersClub:        $resource(url1 + 'spelersclub/:_id',  {_id:'@_id'},           { 'query': {method:'GET', isArray:true}, }),
            SpelersID:          $resource(url1 + 'spelersid/:_id',    {_id:'@_id'},           { 'query': {method:'GET', isArray:true}, }),
            Speler:             $resource(url1 + 'spelers/:_id',      {_id:'@_id'},           { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} }),
            Activate:           $resource(url1 + 'activate/:token',   {token:'@token'},       { 'post': {method:'POST'} }),
            Login:              $resource(url1 + 'login',             {},                     { 'post': {method:'POST'} }),
            Signin:             $resource(url1 + 'signin',            {},                     { 'post': {method:'POST'} }),
            GetAccount:         $resource(url1 + 'getaccount',        {},                     { 'post': {method:'POST'} }),
            ChangePassword:     $resource(url1 + 'change_password/:_id',{_id:'@_id'},         { 'post': {method:'POST'} }),
            Forgot:             $resource(url1 + 'forgot',            {},                     { 'post': {method:'POST'} }),
            ResetPassword:      $resource(url1 + 'reset/:token',      {token:'@token'},       { 'get': {method:'GET'}, 'post': {method:'POST'} }),
            Me:                 $resource(url1 + 'me',                {},                     { 'get': {method:'GET'} }),
            Users:              $resource(url1 + 'users',             {},                     { 'query': {method:'GET', isArray:true} }),
            User:               $resource(url1 + 'users/:_id',        {_id:'@_id'},           { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} })
        };
    });