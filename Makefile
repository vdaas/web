.PHONY: run deploy

LATEST_VERSION = v0.0.36
ARCIVE_URL = https://github.com/vdaas/vald/archive/$(LATEST_VERSION).zip
NEW_VERSION := ${LATEST_VERSION}

all: deploy
	git add -A;git commit -m fix;git push

run:
	hugo server

deploy:
	hugo
	cd public && git add . && git commit -m "rebuilding site `date`" && git push origin master

version:
	@$(eval rowNumber := $(shell grep "LATEST_VERSION" -n Makefile | head -n 1 | cut -d ":" -f 1))
	@if [ ${LATEST_VERSION} != ${VERSION} ]; then \
		@sed -i '${rowNumber}c\LATEST_VERSION = ${VERSION}' Makefile ; \
	else \
	    echo -e "\e[5;31mNothing to update version.\e[0m" ; \
	fi

sync:
	@echo -e "\e[5;32mprestart\e[0m"
	@mkdir -p tmp 1>/dev/null
	@echo -e "\e[5;33mdownload latest sources\e[0m"
	wget -P tmp $(ARCIVE_URL)
	@echo -e "\e[5;33munpackaging\e[0m"
	@cd tmp && unzip $(LATEST_VERSION).zip 1>/dev/null
	@echo -e "\e[5;33mcopying document files...\e[0m"
	@cd content && mkdir -p $(LATEST_VERSION)
	@$(eval VERSION_NUM := $(shell echo ${LATEST_VERSION} | sed s/v//g))
	@echo "$(VERSION_NUM)"
	@cd tmp/vald-$(VERSION_NUM)/docs && cp -r . ../../../content/$(LATEST_VERSION)
	@cp tmp/vald-$(VERSION_NUM)/CONTRIBUTING.md content/$(LATEST_VERSION)/contributing.md
	@cp tmp/vald-$(VERSION_NUM)/CHANGELOG.md content/$(LATEST_VERSION)/release-note.md
	@echo -e "\e[5;33mcheck img files...\e[0m"
	@if [ -z $(find tmp/vald-$(VERSION_NUM)/assets/docs -type f -name "*.svg" 2>/dev/null) ]; then \
		echo -e "\e[5;31mNo image file has been synced.\e[0m" ; \
	else \
		echo -e "\e[5;33mSyncing image files\e[0m]" ; \
		mkdir -p content/$(LATEST_VERSION)/assets && mkdir -p content/$(LATEST_VERSION)/assets/img ; \
		cd tmp/vald-$(VERSION_NUM)/assets/docs && find . -type f -name "*.svg" -exec {} ../../../../content/$(LATEST_VERSION)/assets/img ; \
	fi
	@echo -e "\e[5;32mprestop\e[0m"
	@rm -rf tmp/ 1>/dev/null
	@echo -e "\e[1;32msync document has been successed !!!\e[0m"

