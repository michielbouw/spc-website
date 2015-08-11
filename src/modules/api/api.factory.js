angular.module('mainapp.api')
    .factory('Api', function($resource)
    {
        return {
            //News:           $resource('/api/news',              {},                     { 'query': {method:'GET', isArray:true}, 'post': {method:'POST'} }),
            //NewsItem:       $resource('/api/news/:_slug',       {_slug:'@_slug'},       { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} }),

            Clubs:          $resource('/api/clubs',             {},                     { 'query': {method:'GET', isArray:true}, 'post': {method:'POST'} }),
            Club:           $resource('/api/clubs/:_slug',      {_slug:'@_slug'},       { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} }),
            Matches:        $resource('/api/matches',           {},                     { 'query': {method:'GET', isArray:true}, 'post': {method:'POST'} }),
            MatchesTeam:    $resource('/api/matches/:_id',      {_id:'@_id'},           { 'query': {method:'GET', isArray:true} }),
            Match:          $resource('/api/match/:_id',        {_id:'@_id'},           { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} }),
            Toeschouwers:   $resource('/api/toeschouwers/:_id', {_id:'@_id'},           { 'get': {method:'GET'}, 'put': {method:'PUT'} }),
            TeamData:       $resource('/api/teamdata',          {},                     { 'query': {method:'GET', isArray:true}, 'post': {method:'POST'} }),
            TeamDataItem:   $resource('/api/teamdata/:_slug',   {_slug:'@_slug'},       { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} }),
            MatchData:      $resource('/api/matchdata',         {},                     { 'query': {method:'GET', isArray:true}, 'post': {method:'POST'} }),
            MatchDataItem:  $resource('/api/matchdata/:_id',    {_id:'@_id'},           { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} }),
            MatchDataID:    $resource('/api/matchdataid/:_id',  {_id:'@_id'},           { 'get': {method:'GET'}, 'delete': {method:'DELETE'} }),
            Pages:          $resource('/api/pages',             {},                     { 'query': {method:'GET', isArray:true}, 'post': {method:'POST'} }),
            Page:           $resource('/api/pages/:_id',        {_id:'@_id'},           { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} }),
            Login:          $resource('/api/login',             {},                     { 'post': {method:'POST'} }),
            Signin:         $resource('/api/signin',            {},                     { 'post': {method:'POST'} }),
            Me:             $resource('/api/me',                {},                     { 'get': {method:'GET'} }),
            Users:          $resource('/api/users',             {},                     { 'query': {method:'GET', isArray:true} }),
            User:           $resource('/api/users/:_id',        {_id:'@_id'},           { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} })
        };
    });