CONTENT_PATH = content
LOCALE_PATH = locale/*
include include.mk

Q = @

CONTENT_FILE = $(CONTENT_PATH) \
	       $(CONTENT_PATH)/openlinks.xul \
	       $(CONTENT_PATH)/openlinks.js \
	       $(CONTENT_PATH)/license.txt \
               $(CONTENT_PATH)/icone.png

LOCALE_FILE =  $(LOCALE_PATH)/openlinks.dtd

XPI_SOURCES = install.rdf chrome/openlinks.jar chrome.manifest

.PHONY: all clean publish

all: openlinks.xpi update.rdf

update.rdf : update.tmpl include.mk openlinks.xpi
	echo ${SHA1}  
	${Q}sed -e "s,###VERSION###,${VERSION},g" \
	-e "s,###FF_MIN_VERSION###,${FF_MIN_VERSION},g" \
	-e "s,###FF_MAX_VERSION###,${FF_MAX_VERSION},g" \
	-e "s,###SHA1###,$(shell sha1sum openlinks.xpi | sed -e "s/ .*//"),g" \
     <$< >$@ 

install.rdf : install.tmpl include.mk
	${Q}sed -e "s,###VERSION###,${VERSION},g" \
	-e "s,###FF_MIN_VERSION###,${FF_MIN_VERSION},g" \
	-e "s,###FF_MAX_VERSION###,${FF_MAX_VERSION},g" \
     <$< >$@ 

openlinks.xpi: $(XPI_SOURCES)
	${Q}zip openlinks.xpi $(XPI_SOURCES)

chrome/openlinks.jar: $(CONTENT_FILE) $(LOCALE_FILE)
	${Q}mkdir -p chrome;zip chrome/openlinks.jar $(CONTENT_FILE) $(LOCALE_FILE)

clean:
	${Q}rm chrome/openlinks.jar *.xpi *.rdf

publish: all
	${Q}cp -f openlinks.xpi openlinks-$(VERSION).xpi
	${Q}echo "Please sign the update manifesto update.rdf , then press enter"
	${Q}read dummy
	ncftpput -f ftp.config -u aviblog downloads openlinks-$(VERSION).xpi 
	ncftpput -f ftp.config -u aviblog downloads update.rdf 

