var author      = "Jean-Noel Avila";
var displayname = "Open Links";
var version     = "0.0.1";
var packagename = "openlinks";
var packagefile = "openlinks.jar";

initInstall(displayname, "/" + author + "/" + displayname, version);


var msg = "Install Open Links?";
var ok = confirm(msg);
if(ok)
  install();


function install()
{
  var installdir = getFolder("Profile", "chrome");

  // Add file and register chrome
  setPackageFolder(installdir);
  addFile("chrome/"+packagefile);

  var cf = PROFILE_CHROME;

  registerChrome(CONTENT | cf, getFolder(installdir, packagefile), "content/" + packagename + "/");
  registerChrome(LOCALE | cf, getFolder(installdir, packagefile), "locale/en-US/" + packagename + "/");
  registerChrome(LOCALE | cf, getFolder(installdir, packagefile), "locale/fr-FR/" + packagename + "/");


  //Install
  if(getLastError() == SUCCESS)
  {
    performInstall();
    if(!(getLastError() == SUCCESS || getLastError() == 999)) {
      alert("An error occured during installation !\nErrorcode: " + getLastError());
    }
  }
  else
  {
    alert("An error occurred, installation will be canceled.\nErrorcode: " + getLastError());
    cancelInstall(getLastError());
  }
}
