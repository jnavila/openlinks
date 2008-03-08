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

