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
      var sel = document.commandDispatcher.focusedWindow.getSelection();
      for ( var i = 0; i < sel.rangeCount; i++ ) {
	  var theDocFrag = sel.getRangeAt(i).cloneContents();
	  if (mode == "smart"){
	      openlinks.smartOpen(theDocFrag,mode);
	  }
	  else {
	      openlinks.recurseAndOpen(theDocFrag);
	  }
      }     
  },

  recurseAndOpen:function(node, mode) 
  {
     if ((node.nodeType == node.ELEMENT_NODE)||(node.nodeType == node.DOCUMENT_FRAGMENT_NODE)) {
	  if ((node.nodeName == "a") || (node.nodeName == "A")) {
	      if (node.href.length > 0) {
        	this.openTheLink(node.href,mode);
	
		}
	  }
	  else {
	      var child =node.firstChild;
	      while (child) {
		  this.recurseAndOpen(child,mode);
		  child = child.nextSibling;
	      }
	  }
      } 
  },
      
  /*  buildBasePath:function(node,chainList)
  {
      var child =node.firstChild;
      while (child) {
	  if (this.buildBasePath(node)){
	      chainList.push(child);
	      return true;
	  }
	  child = child.nextSibling;
      }
      return false;
  },
  */
 
  openFirstLink:function(node)
  {
     if ((node.nodeType == node.ELEMENT_NODE)||(node.nodeType == node.DOCUMENT_FRAGMENT_NODE)) {
	  if ((node.nodeName == "a") || (node.nodeName == "A")) {
	      if (node.href.length > 0) {
        	this.openTheLink(node.href,"tab");
		return true;
		}
	  }
	  else {
	      var child =node.firstChild;
	      while (child) {
		  if (this.openFirstLink(child)){
		      return true;
		  }
		  child = child.nextSibling;
	      }
	      return false;
	  }
      } 
  },

  smartOpen:function(node, mode)
  {
      //   var chainList = new Array();
      var mynode = node;
      dump(mynode);
      while ((!mynode)||
	     (mynode.childNodes.length<3)){
	  mynode = mynode.firstChild;
      } 
      if (mynode) {
	  var child = mynode.firstChild;
	  while (child) {
	      this.openFirstLink(child);
	      child = child.nextSibling;
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
      var menuitemOpenlinks = document.getElementById("openlinks");
      if(menuitemOpenlinks) {
        menuitemOpenlinks.hidden = !gContextMenu.isTextSelected;
      }
      var menuitemOpenlinksSmart = document.getElementById("openlinksSmart");
      if(menuitemOpenlinksSmart) {
        menuitemOpenlinksSmart.hidden = !gContextMenu.isTextSelected;
      }
    }
  }


};

window.addEventListener("load", openlinks.init, false);

