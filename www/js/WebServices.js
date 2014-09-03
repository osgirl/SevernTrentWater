function callService(url, data, success, failure)
{
    $.ajax(url, {type: 'GET', url: url, data: data, success: function(data) {success(data);}, error:function(jqXHR, textStatus, errorThrown) {failure(errorThrown)}});
}

var getAreas=new function()
{
    this.call=function(prefix, success, failure){success([{id:1, name:prefix+'first area'}, {id:2, name:prefix+'second area'}])};
//    this.call=function(prefix, success, failure)
//    {
//        var data=['fields=id,name', 'name='+prefix+'%'];
//        callService('http://172.20.2.101:8080/EscadaStub/escada_api/v1/areas', data, function(data){success(data);},failure);
//    }
};

var getSites=new function()
{
    this.call=function(area, prefix, success, failure){success([{id:88, works_name:prefix+'first site' }, {id:90, works_name:prefix+'second site'}])};
    //var data=['fields=id, works_name', 'area_id='+area, 'works_name='+prefix+'%'];
//    this.call=function(area, prefix, success, failure){callService('http://SITE/escada_api/v1/works', data, function(data){success(JSON.parse(data));}, failure);}
};

var getAlarmList=new function()
{
    //this.call=function(area, site, success, failure){success([{id:108, status:1, alarm_text:'hello alarm 1'}, {id:118, status:3, alarm_text:'hello alarm 3'}, {id:128, status:5, alarm_text:'hello alarm error'}]);}
    this.call=function(area, site, success, failure)
    {
        var data=['fields=id, status, alarm_text', 'area_id=area']
        if(site>=0) data.push('work_id='+site);
        callService('http://172.20.2.101:8080/EscadaStub/escada_api/v1/alarms', data, function(data){success(data);}, failure);
    }
};

var getAlarmDetails=new function()
{
    this.call=function(workorder, success, failure){success({id:workorder, status:1, alarm_text:'hello alarm 1', actions:[{state:11}, {state:5}]})};
    //var data=['fields=id, status, alarm_text', 'embed=actions', 'id='+workorder];
    //1%3A10191654?embed=actions
    //this.call=function(workorder, success, failure){callService('http://SITE/escada_api/v1',data, function(data){success(JSON.parse(data));}, failure);}
};
