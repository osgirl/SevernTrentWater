var header=new function()
{
    this.initialise=function()
    {
//        var thisHtml="<a class='menubtn' >i</a><p class='pagename'>Splash screen</p>"
        var thisHtml="<p class='pagename'>Splash screen</p>"
        $(".pagehead").html(thisHtml);
        menu.initialise();
    };

    this.setPageName=function(name)
    {
        $(".pagename").text(name);
    };
};

var menu=new function()
{
    var me=this;
    this.initialise=function()
    {
        if(!me.isAvailable)
            return;
        var thisHtml="<div class='menuhome menuentry firstmenu'>Home</div><div class='menuprofile menuentry'>Profile</div><div class=' menuentry menuabout'>About</div>"
        $(".pagemenu").html(thisHtml);
        $(".menubtn").click(function() {
            if($(".pagemenu").is(":visible"))
                $(".pagemenu").hide(200);
            else
                $(".pagemenu").show(100);
        });
        $(".menuhome").click(function(){ $(".pagemenu").hide();if(profile.profileManager()) manager.initialise();else technician.initialise();});
        $(".menuprofile").click(function(){$(".pagemenu").hide();profilePage.initialise(true);});
        $(".menuabout").click(function(){$(".pagemenu").hide();about.initialise();})
    }

    this.isAvailable=true;
};

var about=new function()
{
    this.initialise=function()
    {
        var thisHtml="<div class='about'><p class='aboutheading'>eSCADA Alarms system</p><p class='aboutdetail'>Version 0.1</p><p class='aboutdetail'>Written by Spargonet</p></div>";
        $(".pagebody").html(thisHtml);
        header.setPageName("About");
    }
};

var footer=new function()
{
    this.initialise=function()
    {
        //If I need to set anything on the footer
    };
};

var splash=new function()
{
    this.initialise=function()
    {
        function setScreen()
        {
            profile.loadProfile();
            if(profile.profileTechnician()) technician.initialise();
            if(profile.profileManager()) manager.initialise();
            if(profile.profileUnset()) profilePage.initialise(false);
        }

        var thisHtml="<div class='splash'><img src='img/logo.png' class='logo'/><p class='welcome'>Welcome to the<br />";
        thisHtml+="eSCADA Alarms<br/>application</p><p class='safety'>Only use this application when in a place of safety</p></div>";
        $(".pagebody").html(thisHtml);
        header.setPageName("Welcome");
        setScreen();
    }
};

var technician=new function()
{
    this.initialise=function()
    {
        var thisHtml="<div class='technician'><p>Hi <span class='name' /></p><p>Please enter work order number:</p>";
        thisHtml+="<p><input type='text' class='won' /></p><p><a class='button submit'>Submit</a></p></div>";
        $(".pagebody").html(thisHtml);

        $(".name").text(profile.firstName+" "+profile.lastName);
        $(".won").keyup(function()
        {
            $(".submit").removeClass("disabled");
            if($(this).val()=='')
                $(".submit").addClass("disabled");
        });

        $(".submit").click(function (){if(!$(this).hasClass("disabled")) workOrderDetails.initialise($(".won").val());});
        header.setPageName("Technician");
    }
};

var manager=new function()
{
    this.initialise=function()
    {
        function getAlarmsError(error)
        {
            $(".countdetails").html("Error getting alarms for this area "+error);
        }

        var alertList;
        var thisHtml="<div class='manager'><p>Hi <span class='name' /></p><p class='countdetails'>Calculating count of alerts</p>";
        thisHtml+="<p><a class='button view'>View Alarms</a></p><p class='clearall'>Area name:<span class='area'";
        thisHtml+="</p><p>Site name:    <span class='site'/></p><p><a class='button show disabled'>Show Alarms</a></p> </div>";
        $(".pagebody").html(thisHtml);
        $(".name").text(profile.firstName+" "+profile.lastName);
        $(".view").hide().click(function(){managerList.initialise(alertList);});

        areaName.add($(".area"), function() {$(".show").removeClass("disabled");}, function() {$(".show").addClass("disabled");});
        siteName.add($(".site"), function() {$(".show").removeClass("disabled");}, function() {$(".show").addClass("disabled");});

        $(".show").click(function(){if(!$(this).hasClass("disabled")) getAlarmList.call($(".areaid").val(), $(".siteid").val(), function(data) {managerList.initialise(data);}, getAlarmsError);});
        setTimeout(function(){getAlarmList.call(profile.area, profile.site, function(data){alertList=data;$(".countdetails").html(alertList.length+" alarms for "+profile.areaSiteName()); $(".view").show();}, getAlarmsError)});

        header.setPageName("Manager page summary");
    }
};

var managerList=new function()
{
    this.initialise=function(alarmslist)
    {
        var list=alarmslist;
        $(".pagebody").html("<div class='managerlist'></div>");
        var detailref="1000";
        $(list).each(function(item){
            var alarm=list[item];
            $(".managerlist").append("<div class='header' id='head"+detailref+"'>Alarm Reference "+alarm.id+"</div><div class='detail detail"+detailref+
                "'><input type='hidden' class='hidid' value="+alarm.id+"><p>Status : "+getAlarmStatus(alarm.status)+"</p><p>Details : "+alarm.alarm_text+"</p></div>");
            detailref++;
        })
        $(".managerlist .header").click(function(){
            var detailMatch=$(".detail"+this.id.substring(4));
            if(!$(detailMatch).is(":visible")) $(".detail").hide();
            detailMatch.show();
        });
        $(".managerlist .detail").click(function(){workOrderDetails.initialise($(this).children(".hidid").val());});
        $(".detail").hide();
        $("#head1000").click();

        header.setPageName("Manager list");
    }
};

var workOrderDetails=new function()
{
    this.initialise=function(won)
    {
        $(".pagebody").html("<div class='workorder'></div>");
        getAlarmDetails.call(won, function(data) {
            $(".workorder").append("<p class='text'>"+data.alarm_text+"</p><p>Actions for this work order:</p><ul>");
            $(data.actions).each(function(){$(".workorder").append("<li >"+getActionStatus(this.state)+"</li>");})
            $(".workorder").append("</ul>");
        }, function(){alert("error in getting this work order")})
        header.setPageName("Work Order Details");
    }
};

var profilePage=new function()
{
    this.initialise=function(showCancel)
    {
        function finishProfile(first)
        {
            first();
//            header.showMenu();
            menu.isAvailable=true;
            if(profile.profileManager())
                manager.initialise();
            else
                technician.initialise();
        }

        function validateField(field)
        {
            if(field.val()=='')
                field.addClass("red");
            else
                field.removeClass("red");
            setSaveButton();
            return field.val();
        }

        function setSaveButton()
        {
            if($(".firstName").val()=='' || $(".lastName").val()=='' || (profile.profileManager() && parseInt($(".areaid").val())<0))
                $(".save").addClass("disabled");
            else
                $(".save").removeClass("disabled");
        }

        var thisHtml="<div class='profile'><p>Name:<input type='text' class='firstName' /><input type='text' class='lastName' /></p>";
        thisHtml+="<p>Role:<input type='radio' class='technician' name='role' value='tech'>Technician<br><input type='radio' class='manager' name='role' value='manager'>Manager</p>";
        thisHtml+="<div class='managerdetails'><p>Current selection:<span class='currentselection'>None selected</span></p>";
        thisHtml+="<p>Area name:<span class='area'></span></p><p>Site name:    <span class='site'></span></p></div>";
        thisHtml+="<a class='button close'>Close</a><a class='button save'>Save</a></div>";
        $(".pagebody").html(thisHtml);

        areaName.add($(".area"), function (value, text){$(".currentselection").html("area:"+text);profile.setArea(value, text);setSaveButton();});
        siteName.add($(".site"), function (value, text){$(".currentselection").html("area: "+profile.areaName+" site:"+text);profile.setSite(value, text);setSaveButton();});

        $(".technician").click(function(){$(".managerdetails").hide();profile.setTechnician();setSaveButton();});
        $(".manager").click(function(){$(".managerdetails").show();profile.setManager();setSaveButton();});

        if(showCancel)
        {
            $(".firstName").val(profile.firstName);
            $(".lastName").val(profile.lastName);
            if(profile.profileManager())
            {
                $(".manager").click().prop("checked",true);
                $(".areaval").val(profile.areaName);
                $(".areaid").val(profile.area);
                $(".siteval").val(profile.siteName);
                $(".siteid").val(profile.site);
            }
//            header.showMenu();
            menu.isAvailable=true;
        }
        else
        {
            $(".technician").first().click().prop("checked", true);
            $(".close").hide();
//            header.hideMenu();
            menu.isAvailable=false;
        }
        $(".firstName").change(function(){profile.firstName=validateField($(this));}).change();
        $(".lastName").change(function(){profile.lastName=validateField($(this));}).change().keydown(function(){profile.lastName=validateField($(this));});

        $(".close").click(function(){finishProfile(profile.loadProfile);});
        $(".save").click(function(){if(!$(this).hasClass("disabled")) finishProfile(profile.saveProfile);});
        header.setPageName("Profile");
    }
};