function init()
{

	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

	var tabPrefs;

	if (prefs.getPrefType("streetmap.tabPrefs") == prefs.PREF_STRING){
		tabPrefs = prefs.getCharPref("streetmap.tabPrefs");
	} else {
  	tabPrefs = "tabBG";
  }
/*  
  var servicePrefs;
	if (prefs.getPrefType("streetmap.servicePrefs") == prefs.PREF_STRING){
		servicePrefs = prefs.getCharPref("streetmap.servicePrefs");
	} else {
  	servicePrefs = "streetmap";
	}
*/		
	var londonPrefs;
	if (prefs.getPrefType("streetmap.londonPrefs") == prefs.PREF_BOOL){
		londonPrefs = prefs.getBoolPref("streetmap.londonPrefs");
	} else {
  	londonPrefs = false;
	}

	switch (tabPrefs)
	{
		case 'tabFG':
		    document.getElementById("tabPrefsRadiogroup").selectedIndex = 1;
		    break;
		case 'winBG':
		    document.getElementById("tabPrefsRadiogroup").selectedIndex = 2;
		    break;
		case 'winFG':
		    document.getElementById("tabPrefsRadiogroup").selectedIndex = 3;
		    break;
		case 'currentTab':
		    document.getElementById("tabPrefsRadiogroup").selectedIndex = 4;
		    break;
		default:
		    document.getElementById("tabPrefsRadiogroup").selectedIndex = 0;
		    break;
	}
/*	
	switch (servicePrefs)
	{
		case 'multimap':
			document.getElementById("servicePrefsRadiogroup").selectedIndex = 1;
			break;
		default:
			document.getElementById("servicePrefsRadiogroup").selectedIndex = 0;
			break;
	}
*/	
	if (londonPrefs)
	{
		document.getElementById("london").checked = true;
	} else {
		document.getElementById("london").checked = false;
	}
	
}
	
function accept()
{
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

	var selectedTabPrefs = document.getElementById("tabPrefsRadiogroup").selectedIndex;
	// var selectedServicePrefs = document.getElementById("servicePrefsRadiogroup").selectedIndex;
	
	var tabPrefs;
	// var servicePrefs;
	
	switch (selectedTabPrefs)
	{
		case 1:
		    tabPrefs = "tabFG";
		    break;
		case 2:
		    tabPrefs = "winBG";
		    break;
		case 3:
		    tabPrefs = "winFG";
		    break;
		case 4:
		    tabPrefs = "currentTab";
		    break;
		default:
		    tabPrefs = "tabBG";
		    break;
	}

/*
	switch (selectedServicePrefs)
	{
		case 1:
		    servicePrefs = "multimap";
		    break;
		default:
		    servicePrefs = "streetmap";
		    break;
	}
*/
	
	var londonPrefs = document.getElementById("london").checked;
	
	prefs.setCharPref("streetmap.tabPrefs", tabPrefs);
	/* prefs.setCharPref("streetmap.servicePrefs", servicePrefs); */
	prefs.setBoolPref("streetmap.londonPrefs", londonPrefs);
}
