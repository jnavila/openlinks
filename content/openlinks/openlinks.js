/**
* openlinks.js
* By Jean-Noel Avila avila@nerim.net
* Date 2005-01-22
**/


var openlinks =
{
  init: function()
  {
    var menu = document.getElementById("contentAreaContextMenu");
    menu.addEventListener("popupshowing",openlinks.showMenuItem,false);
  },

  isSelected: function()
  {
    var focusedWindow = document.commandDispatcher.focusedWindow;
    var selection = new String(focusedWindow.getSelection());
    return selection.length > 0 ? true : false;
  },

  openlinks: function(mode)
  {
    //  var sel = openlinks.getSelection;
	var sel = document.commandDispatcher.focusedWindow.getSelection();
      for ( var i = 0; i < sel.rangeCount; i++ ) {
	  var theDocFrag = sel.getRangeAt(i).cloneContents();
	  openlinks.recurseAndOpen(theDocFrag,mode);
      }     
  },

  recurseAndOpen:function(node ,mode) 
  {
     if ((node.nodeType == node.ELEMENT_NODE)||(node.nodeType == node.DOCUMENT_FRAGMENT_NODE)) {
	  if ((node.nodeName == "a") || (node.nodeName == "A")) {
	      if (node.href.length > 0) {
        	openlinks.openTheLink(getAbsoluteURL(node.href, node),mode);
	
		}
	  }
	  else {
	      var child =node.firstChild;
	      while (child) {
		  openlinks.recurseAndOpen(child,mode);
		  child = child.nextSibling;
	      }
	  }
      } 
  },

  openTheLink: function(url,mode)
  {
      gBrowser.addTab(url);    
  },


  showMenuItem: function()
  {
    if(gContextMenu){
      var menuitem = document.getElementById("openlinks");
      if(menuitem) {
        menuitem.hidden = !gContextMenu.isTextSelected;
      }
    }
  }


};

window.addEventListener("load", openlinks.init, false);


// shamelessly copied from browser/pageInfo.js
const XMLNS    = "http://www.w3.org/XML/1998/namespace";
const XHTMLNS  = "http://www.w3.org/1999/xhtml";

function getAbsoluteURL(url, node)
{
  if (!url || !node)
    return "";
  var urlArr = new Array(url);

  var doc = node.ownerDocument;
  if (node.nodeType == Node.ATTRIBUTE_NODE)
    node = node.ownerElement;

  while (node && node.nodeType == Node.ELEMENT_NODE)
  {
    var att = node.getAttributeNS(XMLNS, "base");
    if (att != "")
      urlArr.unshift(att);

    node = node.parentNode;
  }

  // Look for a <base>.
  var baseTags = doc.getElementsByTagNameNS(XHTMLNS, "base");

  if (baseTags && baseTags.length)
  {
    urlArr.unshift(baseTags[baseTags.length - 1].getAttribute("href"));
  }

  // resolve everything from bottom up, starting with document location
  var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
  var URL = ioService.newURI(doc.location.href, null, null);

  for (var i=0; i<urlArr.length; i++)
  {
    try
    {
      URL = ioService.newURI(urlArr[i], URL.originCharset, URL);
    }
    catch (ex)
    {
      ; // do nothing
    }
  }

  return URL.spec;
}

