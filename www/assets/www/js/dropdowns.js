function setChange(prefix, onSet)
{
    $("."+prefix+"name").change(function(){
        var selectedItem=$("."+prefix+"name").find(":selected");
        if(selectedItem.val()>=0)
        {
            $("."+prefix+"val").val(selectedItem.text()).show();
            $("."+prefix+"id").val(selectedItem.val());
            $("."+prefix+"name").hide();
            if(onSet) onSet(selectedItem.val(), selectedItem.text());
        }
    }).hide();
}
function addCoachText(element, text)
{
    element.keydown(function() {if($(this).hasClass("coach")) $(this).removeClass("coach").val("");
    }).keyup(function() {
            if($(this).val().length==0)
            {
                $(this).addClass("coach").val(text);
                this.setSelectionRange(0, 0)
            }
        }).keyup();
}

var htmlTemplate="<select class='%name loclist'></select><input type='text' class='%val loctext'><input type='hidden' class='%id' value='-1'>"

function characterevent(event)
{
    var eventcode=event.which;
    if(eventcode > 64 && eventcode<91)
        return true;
    if(eventcode > 95 && eventcode<106)
        return true;
    if(eventcode==32 || eventcode==8 || eventcode==0)
        return true;
    return false;
}

var areaName=new function()
{
    this.add=function(area, onSet, onNotSet)
    {
        area.html(htmlTemplate.replace(/%/g, "area"));
        addCoachText($(".areaval"), "Start typing area name");
        $(".areaval").keyup(function(event) {
            var checkWith=$(this).val().toLowerCase();
            if(characterevent(event) && checkWith.length>2 && !$(this).hasClass("coach"))
            {
                $(".areaname").children().remove().end().append('<option selected value="-1">Please select area</option>');
                getAreas.call(checkWith, function(data){
                    $(data).each(function(){$('.areaname').append('<option value='+this.id+'>'+this.name+'</option>');});
                    if($(".areaname").children().length>1) {$(".areaname").show().focus();$(".areaval").hide();}
                }, function(errors) {alert("error getting areas status:"+message.status +" error: "+message.error);});
            }
            else
                if(onNotSet) onNotSet();
        });
        setChange("area", function(value, text){$(".siteval").prop("disabled", false); onSet(value,text);});
    }
};

var siteName=new function()
{
    this.add=function(site, onSet, onNotSet)
    {
        site.html(htmlTemplate.replace(/%/g, "site"));
        addCoachText($(".siteval"), "Start typing site name");
        $(".siteval").keyup(function(event) {
            var checkWith=$(this).val().toLowerCase();
            if(characterevent(event) && checkWith.length>2 && !$(this).hasClass("coach"))
            {
                $(".sitename").children().remove().end().append('<option selected value="-1">Please select site</option>');
                getSites.call($(".areaid").val(), checkWith, function(data){
                    $(data).each(function(){$('.sitename').append('<option value='+this.id+'>'+this.works_name+'</option>');});
                    if($(".sitename").children().length>1) {$(".sitename").show().focus();$(".siteval").hide();}
                }, function() {alert("error getting sites");});
            }
            else
                if(onNotSet) onNotSet();
        }).prop("disabled", true);
        setChange("site", onSet);
    }
};


