function showAlert(message, title, callback, buttonName) {
    if (navigator.notification) {
        navigator.notification.alert(message, callback, title, buttonName?buttonName:'OK');
    } else {
        alert(title ? (title + ": " + message) : message);
        if(callback && typeof callback==='function')
            callback();
    }
}

function showConfirm(message, title, callback, buttonNames) {
    if (navigator.notification) {
        navigator.notification.confirm(message, callback, title, buttonNames?buttonNames:'OK, Cancel');
    } else {
        var index=confirm(title ? (title + ": " + message) : message)?0:1;
        if(callback && typeof callback==='function')
            callback(index);
    }
}

function showMask(message)
{
    $(".mask .maskMessage").text(message);
    $(".maskMessage").top=($(".mask").height-$(".maskMessage").height - 20)+"px";
    $(".mask").lightbox_me({centred:true, closeClick:false});
}

function hideMask()
{
    $(".mask").trigger("close");
}

function initialiseApp(overwrite)
{
    var html='<div class="pagehead"></div><div class="pagemenu"></div><div class="pagebody"></div><div class="pagefoot"></div><div class="mask"><div class="maskSpinner"><img class="spinner" src="img/spinner.gif" /></div><div class="maskMessage"></div></div>';
    if(overwrite)
        $("body").html(html);
    else
        $("body").append(html);
    $(".mask").hide();
    $(".pagemenu").hide();
    $('head').append('<link rel="stylesheet" type="text/css" href="css/spargonet.css" /><link rel="stylesheet" type="text/css" href="css/index.css" />');
}

function showConnectionType()
{
    var connection='unavailable';
    if(navigator.connection)
        connection=navigator.connection.type;

    if(connection==Connection.UNKNOWN) return 'Unknown connection';
    if(connection==Connection.ETHERNET) return 'Ethernet connection';
    if(connection==Connection.WIFI) return 'WiFi connection';
    if(connection==Connection.CELL_2G) return 'Cell 2G connection';
    if(connection==Connection.CELL_3G) return 'Cell 3G connection';
    if(connection==Connection.CELL_4G) return 'Cell 4G connection';
    if(connection==Connection.CELL) return 'Cell generic connection';
    if(connection==Connection.NONE) return 'No network connection';
    return 'Not identified';
}