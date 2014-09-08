function runtests()
{
    initialiseApp(false);
    QUnit.test("eSCADE Alarms app", 17, function(assert){testheader(assert);testsplash(assert);});
}

function testheader(assert)
{
    header.initialise();
    assert.equal($(".pagehead").html(), '<p class="pagename">Splash screen</p>');
}

function testsplash(assert)
{
    testProfile(assert);
    splash.initialise();

    testTechnician(assert);
    profile.setManager();

    $(".menuhome").click();
    testManagerHome(assert);

    $(".menuprofile").click();
    testProfilePage(assert);
}

function testProfile(assert)
{
    profile.loadProfile();
    profile.setManager();
    assert.equal(profile.profileManager(), true);

    profile.setSite(3, "test site");
    assert.equal(profile.areaSiteName(), "Site test site");
    profile.setArea(4, "test area");
    assert.equal(profile.areaSiteName(), "Area test area");
    assert.equal(profile.site, -1);
    assert.equal(profile.siteName, "");
    profile.setSite(3, "test site");
    assert.equal(profile.site, 3);
    assert.equal(profile.siteName, "test site");
    assert.equal(profile.areaSiteName(), "Site test site");

    profile.setTechnician();
    profile.saveProfile();
    assert.equal(profile.profileTechnician(), true);
}

function testTechnician(assert)
{
    assert.equal($(".pagehead").html(),'<p class="pagename" style="color: white;">Technician</p>');
    $(".won").val("abcdef");
    $(".submit").click();

    assert.equal($(".pagehead").html(),'<p class="pagename" style="color: white;">Work Order Details</p>');
}

function testManagerHome(assert)
{
    assert.equal($(".pagehead").html(),'<p class="pagename" style="color: white;">Manager page summary</p>');
    $(".view").click();
    assert.equal($(".pagehead").html(),'<p class="pagename" style="color: white;">Manager list</p>');
}

function testProfilePage(assert)
{
    assert.equal($(".pagehead").html(),'<p class="pagename" style="color: white;">Profile</p>');

    $(".technician").click();
    assert.equal($(".currentselection:visible").length, 0);

    QUnit.stop();
    $(".manager").click();
    setTimeout(function(){assert.notEqual($(".currentselection:visible").length, 0);QUnit.start();}, 1000);
}
