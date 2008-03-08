CONTENT_PATH = content
LOCALE_PATH = locale/*

CONTENT_FILE = $(CONTENT_PATH) \
	       $(CONTENT_PATH)/openlinks.xul \
	       $(CONTENT_PATH)/openlinks.js \
	       $(CONTENT_PATH)/license.txt

LOCALE_FILE =  $(LOCALE_PATH)/openlinks.dtd

XPI_SOURCES = install.rdf chrome/openlinks.jar chrome.manifest

all: openlinks.xpi

openlinks.xpi: $(XPI_SOURCES)
	zip openlinks.xpi $(XPI_SOURCES)

chrome/openlinks.jar: $(CONTENT_FILE) $(LOCALE_FILE)
	mkdir -p chrome;zip chrome/openlinks.jar $(CONTENT_FILE) $(LOCALE_FILE)

clean:
	rm chrome/openlinks.jar openlinks.xpi
