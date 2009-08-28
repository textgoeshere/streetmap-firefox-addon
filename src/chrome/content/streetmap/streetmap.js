var streetmapGo = { 
  streetmapSelect: function(mapService) {
  	var addressStr = _content.getSelection() + ''; // fix OSX bug - thanks to http://joemaller.com/2005/04/24/post503/getselection-workaround#plusquotequote
    this.streetmapThis(addressStr.toString(), mapService);
  },

	streetmapThis: function(st, mapService)
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

		var mapURL;
		
		switch(mapService)
		{
			case "streetmap": mapURL = "http://www.streetmap.co.uk/newsearch.srf?mapp=newmap&searchp=newsearch&name="+escape(st)+"&Submit1=search"; break
			case "multimap": mapURL = "http://www.multimap.com/maps/?countryCode=GB&qs=" + escape(st); break
			case "googlemap": mapURL = "http://maps.google.co.uk/maps?q=" + escape(st);  break
			default: mapURL = "http://www.streetmap.co.uk/newsearch.srf?mapp=newmap&searchp=newsearch&name="+escape(st)+"&Submit1=search";

		}
		if (londonPrefs == true && isPC(st) != true) mapURL = mapURL + escape(" london");
	  if (tabPrefs == "tabBG" || tabPrefs == "tabFG")
	  {
  		var browser = top.document.getElementById("content");
			var newTab = browser.addTab(mapURL);
			if (tabPrefs == "tabFG") browser.selectedTab = newTab;
		} else if (tabPrefs == "currentTab") {
			window._content.document.location = mapURL;
		} else {
			var newWindow = window.open(mapURL, "_blank");
			if (tabPrefs == "winBG") {
				newWindow.blur();
				window.focus();
			}
		}
  }
}


<!-- based on original code by Peter Haydon -->
<!-- peter_haydon@lineone.net -->
function isPC(test) //check postcode format is valid
{ 
	var size = test.length
	test = test.toUpperCase(); //Change to uppercase
 	while (test.slice(0,1) == " ") //Strip leading spaces
  	{test = test.substr(1,size-1);size = test.length
  	}
 	while(test.slice(size-1,size)== " ") //Strip trailing spaces
  	{test = test.substr(0,size-1);size = test.length
  	}
 	if (size < 6 || size > 8){ //Code length rule
  	return false;
  }
 	if (!(isNaN(test.charAt(0)))){ //leftmost character must be alpha character rule
   	return false;
 	}
 	if (isNaN(test.charAt(size-3))){ //first character of inward code must be numeric rule
   	return false;
  }
 	if (!(isNaN(test.charAt(size-2)))){ //second character of inward code must be alpha rule
   	return false;
  }
 	if (!(isNaN(test.charAt(size-1)))){ //third character of inward code must be alpha rule
   	return false;
  }
 	if (!(test.charAt(size-4) == " ")){//space in position length-3 rule
   	return false;
  }
 	count1 = test.indexOf(" ");count2 = test.lastIndexOf(" ");
 	if (count1 != count2){//only one space rule
   	return false;
  }
return true;
}

function streetmapPopupPrefs()
{
	window.openDialog("chrome://streetmap/content/streetmapPrefs.xul","_blank", "chrome,dialog,centerscreen,resizable");
}