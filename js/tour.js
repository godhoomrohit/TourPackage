/*
 * JS file for tour booking app
 * @author: Rohit Anand
 */

//a global object to contain every js related code
var TourBook = TourBook || {};

TourBook.planHoliday = (function($){
    "use strict";
    
    var fn, api, cache;
    
    cache = {
    	jsSliderFormCard1: $('#jsSliderFormCard1'),
        jsSliderFormCard2: $('#jsSliderFormCard2'),
        jsSliderCard: $('.jsSliderCard')
    }
    
    //private
    fn = {
        _init: function(){
            fn._addMoreObjectToCache();
            fn._bindEvents();
            
            //prepopulate data
            //if data is present in localStorage, skip page 1 and show page 2.
            fn._prepopulatePage1();
        },
        
        _addMoreObjectToCache: function(){
            cache['jsBackBtn'] = cache['jsSliderFormCard2'].find('.jsBackBtn')
        },
        
        _bindEvents: function(){
            cache['jsSliderFormCard1'].on('submit', function(e){
                e.preventDefault();
                fn._handleForm(this, 'jsSliderFormCard2');
            });
            
            cache['jsSliderFormCard2'].on('submit', function(e){
                e.preventDefault();
                fn._handleForm(this, 'jsSliderFormCard1');
            });
            
            cache['jsBackBtn'].on('click', function(e){               
                fn._toggleCard('jsSliderFormCard1');
            });
        },
        
        _handleForm: function(self, jsSliderFormCard){
            var self = $(self);
            var formAsObj = self.serializeArray();
                
            //let us suppose all validation are successful
            fn._toggleCard(jsSliderFormCard);
            fn._logData(formAsObj, jsSliderFormCard);
        },
        
        //show card for the passed Id and hide other
        _toggleCard: function(cardId){
            cache['jsSliderCard'].addClass('hidden');
            cache[cardId].removeClass('hidden');
        },
        
        _prepopulatePage1: function(){
            var tourData1 = localStorage.getItem('tourBookData1');
            if(tourData1){
                fn._toggleCard('jsSliderFormCard2');
                tourData1 = JSON.parse(tourData1);
                var jsSliderFormCard1 = cache['jsSliderFormCard1'][0];
                tourData1.forEach(function(v){
                    jsSliderFormCard1[v['name']].value = v['value'];
                })
            }
        },
        
        _logData: function(formAsObj, jsSliderFormCard){
            //saving to localStorage now
            var formAsString = JSON.stringify(formAsObj);
            
            if(jsSliderFormCard === 'jsSliderFormCard2'){
                localStorage.setItem('tourBookData1', formAsString);
            }
            else{
                //form submission is success
                localStorage.removeItem('tourBookData1');
            }
            
        }
    }
    
    //public
    api = {
        init: function(){
            return fn._init.apply(this, arguments);
        }
    }
    
    return api;
    
})(window.jQuery);