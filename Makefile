CONTENT_PATH = content
LOCALE_PATH = locale/*
VERSION = 0.0.5

CONTENT_FILE = $(CONTENT_PATH) \
	       $(CONTENT_PATH)/openlinks.xul \
	       $(CONTENT_PATH)/openlinks.js \
	       $(CONTENT_PATH)/license.txt \
               $(CONTENT_PATH)/icone.png

LOCALE_FILE =  $(LOCALE_PATH)/openlinks.dtd

XPI_SOURCES = install.rdf chrome/openlinks.jar chrome.manifest

.PHONY: all clean publish

all: openlinks.xpi

openlinks.xpi: $(XPI_SOURCES)
	zip openlinks.xpi $(XPI_SOURCES)

chrome/openlinks.jar: $(CONTENT_FILE) $(LOCALE_FILE)
	mkdir -p chrome;zip chrome/openlinks.jar $(CONTENT_FILE) $(LOCALE_FILE)

clean:
	rm chrome/openlinks.jar openlinks.xpi

publish: all
	mv openlinks.xpi openlinks-$(VERSION).xpi
	ncftpput -f ftp.config download openlinks-$(VERSION).xpi 
	ncftpput -f ftp.config download update.rdf 

