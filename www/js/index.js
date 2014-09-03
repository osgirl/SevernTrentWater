function init()
{
    initialiseApp();
    setTimeout(function(){header.initialise();footer.initialise();splash.initialise();addMenu()}, 300);
}

function addMenu()
{
    document.addEventListener("menubutton", menu.menupressed, false);
}

var app = {initialize: function(device)
{
    device?document.addEventListener('deviceready', init, false):init();
    document.addEventListener('resume', addMenu, false);
}};

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