// Usage example
var onlineOffline = new NetworkEvent();

document.addEventListener("deviceOnline", function(e) {
    console.log('online');
});

document.addEventListener("deviceOffline", function(e) {
    console.log('offline');
});