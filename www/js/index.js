function init()
{
    initialiseApp(true);
    setTimeout(function(){header.initialise();footer.initialise();splash.initialise();}, 200);
    addMenu();
}

var events={};
function addEvent(eventName, eventHandler)
{
    if (events[eventName] !== eventHandler)
    {
        events[eventName] = eventHandler;
        document.addEventListener(eventName, eventHandler, false);
    }
}

function addMenu()
{
    function callMenu(){menu.menupressed();}
    function callBack(){back.click();}

    addEvent("menubutton", callMenu);
    addEvent("backbutton", callBack);
}

var app = {initialize: function(device)
{
    function resume()
    {
        events={};
        back.clearPages();
        addMenu();
    }

    device?document.addEventListener('deviceready', init, false):init();
    document.addEventListener('resume', resume, true);
}};

var back=new function()
{
    var pages=[];
    var me=this;
    this.click=function()
    {
        if(me.hasPrevious())
        {
            pages.pop();
            pages.pop().initialise();
        }
    };
    this.hasPrevious=function(){return pages.length>1;};
    this.clearPages=function() {pages=[];}
    this.setCurrent=function(current)
    {
        pages.push(current);
        if(pages.length>20)
            pages.shift();
    };
};

//Utilities used across this app
function getAlarmStatus(statusid)
{
    switch(statusid)
    {
        case 1: return "Live";
        case 2: return "Parked";
        case 3:return "Superceded";
        case 4:return "Cleared";
        default:return "Undefined";
    }
}

function getActionStatus(actionid)
{
    switch(actionid)
    {
        case 0: return "Diagnosed";
        case 1: return "Dispatched";
        case 2: return "Received";
        case 3: return "Integration Failure";
        case 4: return "SMS Unacknowledged";
        case 5: return "WO Unacknowledged";
        case 6: return "SMS Inhibited";
        case  7: return "In Incident Blocking";
        case  8: return "No Rota Configured";
        case  9: return "No FSP Available";
        case  10: return "Unrecognised Works";
        case  11: return "Finished";
        default:return "Undefined";
    }
}