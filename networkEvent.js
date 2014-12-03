/**
 * Author: RJM
 * Listening to online event works inconsistently across browsers,
 * this method fires an ajax request to a file that exists on the 
 * server to determine connectivity and broadcasts a 'deviceOnline'
 * and 'deviceOffline' event.
 *
 * For IE9 support add customEvent polyfill:
 * https://developer.mozilla.org/en/docs/Web/API/CustomEvent
 */
var NetworkEvent = function NetworkEvent(opts){
    
    opts = opts || {};
    
    this.interval = opts.interval || 30000;
    this.testfile = opts.testfile || '/assets/images/app-icons/favicon.ico';
    this.broadcastOnlineLabel = opts.onlineEventLabel || 'deviceOnline';
    this.broadcastOfflineLabel =  opts.onlineEventLabel || 'deviceOffline';

    this.init();
};

NetworkEvent.prototype = {
    
    init: function(){

        setInterval(this.checkOnline.bind(this), this.interval, this);
    },

    broadcastEvent: function(event_label){

        var event = new CustomEvent(event_label);
        
        document.dispatchEvent(event);
    },
    
    checkOnline: function(){

        var rnd = Math.round(Math.random() * 10000000000000000),
            test_file = this.testfile+'?='+rnd,
            xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
    
        xhr.onload = function(){
            
            this.broadcastEvent(this.broadcastOnlineLabel);
            
        }.bind(this);
        
        xhr.onerror = function(){
            
            this.broadcastEvent(this.broadcastOfflineLabel);
            
        }.bind(this);

        xhr.open("GET", test_file, true);
        xhr.send();
    }
};