CONTENT_PATH = content/openlinks
LOCALE_PATH = locale/*/openlinks

CONTENT_FILE = $(CONTENT_PATH)/contents.rdf \
	       $(CONTENT_PATH)/openlinks.xul \
	       $(CONTENT_PATH)/openlinks.js \
	       $(CONTENT_PATH)/license.txt

LOCALE_FILE = $(LOCALE_PATH)/contents.rdf \
	      $(LOCALE_PATH)/openlinks.dtd

XPI_SOURCES = install.rdf install.js chrome/openlinks.jar

all: openlinks.xpi

openlinks.xpi: $(XPI_SOURCES)
	jar cfM openlinks.xpi $(XPI_SOURCES)

chrome/openlinks.jar: $(CONTENT_FILE) $(LOCALE_FILE)
	mkdir -p chrome;jar cfM chrome/openlinks.jar $(CONTENT_FILE) $(LOCALE_FILE)

clean:
	rm chrome/openlinks.jar openlinks.xpi
