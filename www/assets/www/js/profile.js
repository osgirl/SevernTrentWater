var profile=new function()
{
    var me=this;
    this.loadProfile=function()
    {
        profileType=window.localStorage.getItem('profileType');
        me.profileType=profileType==null?'none':profileType;
        me.firstName=window.localStorage.getItem('profilefirstName');
        me.lastName=window.localStorage.getItem('profilelastName');
        if(me.profileManager())
        {
            me.area=window.localStorage.getItem('profilearea');
            me.site=window.localStorage.getItem('profilesite');
            me.areaName=window.localStorage.getItem('profileareaname');
            me.siteName=window.localStorage.getItem('profilesitename');
        }
    }

    this.saveProfile=function()
    {
        if(me.profileSet())
        {
            window.localStorage.setItem('profileType', me.profileType);
            window.localStorage.setItem('profilefirstName', me.firstName);
            window.localStorage.setItem('profilelastName', me.lastName);
            if(me.profileManager())
            {
                window.localStorage.setItem('profilearea', me.area);
                window.localStorage.setItem('profilesite', me.site);
                window.localStorage.setItem('profileareaname', me.areaName);
                window.localStorage.setItem('profilesitename', me.siteName);
            }
        }
    }

    this.profileManager=function(){return me.profileType=='manager'};
    this.profileTechnician=function(){return me.profileType=='technician'};
    this.profileUnset=function(){return !me.profileManager() && !me.profileTechnician()};
    this.profileSet=function(){return me.profileManager() || me.profileTechnician()};

    this.setManager=function(){me.profileType='manager'};
    this.setTechnician=function(){me.profileType='technician'};

    this.setArea=function(value, text) {me.area=value;me.areaName=text;me.site=-1;me.siteName="";};
    this.setSite=function(value, text) {me.site=value;me.siteName=text;};
    this.areaSiteName=function() {if(me.site<0) return "Area "+me.areaName; else return "Site "+me.siteName;};

    this.profileType="none";
    this.firstName="";
    this.lastName="";
    this.area=-1;
    this.site=-1;
    this.areaName="";
    this.siteName="";
};
