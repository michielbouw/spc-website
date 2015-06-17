angular.module('mainapp.api')
    .factory('Api', function($resource)
    {
        return {
            //News:           $resource('/api/news',              {},                     { 'query': {method:'GET', isArray:true}, 'post': {method:'POST'} }),
            //NewsItem:       $resource('/api/news/:_slug',       {_slug:'@_slug'},       { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} }),

            Login:          $resource('/api/login',             {},                     { 'post': {method:'POST'} }),
            Signin:         $resource('/api/signin',            {},                     { 'post': {method:'POST'} }),
            Me:             $resource('/api/me',                {},                     { 'get': {method:'GET'} }),
            Users:          $resource('/api/users',             {},                     { 'query': {method:'GET', isArray:true} }),
            User:           $resource('/api/users/:_id',        {_id:'@_id'},           { 'get': {method:'GET'}, 'put': {method:'PUT'}, 'delete': {method:'DELETE'} })
        };
    });