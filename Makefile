.PHONY: run deploy

LATEST_VERSION = 0.0.37
ARCIVE_URL = https://github.com/vdaas/vald/archive/v$(LATEST_VERSION).zip
NEW_VERSION := ${LATEST_VERSION}

DOC_FILES = $(eval DOC_FILES:=$(shell find tmp/vald-$(LATEST_VERSION)/docs -type f -name "*.md" ))$(DOC_FILES)
NEW_DOC_FILES = $(DOC_FILES:tmp/vald-$(LATEST_VERSION)/docs/%.md=content/docs/v$(LATEST_VERSION)/%.md)

all: deploy
	git add -A;git commit -m fix;git push

run:
	hugo server

subup:
	git submodule foreach git pull origin gh-pages

deploy/staging: subup \
	latest
	@hugo --environment=staging
	@cd tmp_pre && cp -r * ../preview/
	@cp Makefile preview/Makefile
	@cd preview && git add -A;git commit -m ":arrow_up: v${LATEST_VERSION} `date`" && git push origin gh-pages
	@rm -rf tmp_pre

deploy/production: subup \
	latest
	@hugo --environment=production
	@cd tmp_pre && mv . ../public/
	@cd public && git add -A;git commit -m ":arrow_up: v${LATEST_VERSION} `date`" && git push origin gh-pages
	@rm -rf tmp_pre

version:
	@echo -e "\e[1;32mChecking Vald latest version...\e[0m"
	@$(eval NEW_VERSION = $(shell curl --silent https://github.com/vdaas/vald/releases/latest | sed 's#.*tag/\(.*\)\".*#\1#' | sed 's/v//g'))
	@$(eval rowNumber := $(shell grep "LATEST_VERSION" -n Makefile | head -n 1 | cut -d ":" -f 1))
	@if [ ${LATEST_VERSION} != ${NEW_VERSION} ]; then \
		echo -e "\e[5;32mUpdating to latest version $(NEW_VERSION)\e[0m" ; \
		sed -i '${rowNumber}c\LATEST_VERSION = ${NEW_VERSION}' Makefile ; \
	else \
	    echo -e "\e[1;31mNothing to update.\e[0m" ; \
	fi
	$(eval LATEST_VERSION = $(NEW_VERSION))

content/v$(NEW_VERSION):
	$(call get-latest)
	$(call copy-doc)
	$(call copy-image)
	@echo -e "\e[1;32mUpdate document finished with success!!!\e[0m"

sync: content/v$(NEW_VERSION)

latest: \
	version \
	sync

define get-latest
	@echo -e "\e[5;32mstart sync latest document\e[0m"
	@mkdir -p tmp 1>/dev/null
	@echo -e "\e[5;33mdownload v$(LATEST_VERSION).zip\e[0m"
	wget -P tmp $(ARCIVE_URL)
	@echo -e "\e[5;33munpackaging v$(LATEST_VERSION).zip\e[0m"
	@cd tmp && unzip v$(LATEST_VERSION).zip 1>/dev/null
endef

define copy-doc
	@echo -e "\e[5;33mcopying document files...\e[0m"
	@mkdir -p content/docs
	@cd content/docs && mkdir -p v$(LATEST_VERSION)
	@cd tmp/vald-$(LATEST_VERSION)/docs && cp -r . ../../../content/docs/v$(LATEST_VERSION)
	@cp tmp/vald-$(LATEST_VERSION)/CONTRIBUTING.md content/docs/v$(LATEST_VERSION)/contributing.md
	@cp tmp/vald-$(LATEST_VERSION)/CHANGELOG.md content/docs/v$(LATEST_VERSION)/release-note.md
endef

.PHONY: $(NEW_DOC_FILES)
$(NEW_DOC_FILES): \
	$(DOC_FILES) \
	archetypes/default.md
	@mkdir -p $(dir $@)
	@if [ -e $@ ]; then \
		rm $@ ; \
	fi
	@hugo new $@
	@cat $(patsubst content/docs/v$(LATEST_VERSION)/%.md,tmp/vald-$(LATEST_VERSION)/docs/%.md,$@) >> $@
	@cp -r content/docs/v$(LATEST_VERSION)/. content/docs/.

.PHONY: test
test: $(NEW_DOC_FILES)

define copy-image
	@echo -e "\e[5;33mcheck image files...\e[0m"
	@if [ -z $(find tmp/vald-$(LATEST_VERSION)/assets/docs -type f -name "*.svg" 2>/dev/null) ]; then \
		echo -e "\e[5;31mNo image file has been synced.\e[0m" ; \
	else \
		echo -e "\e[5;33mSyncing image files\e[0m]" ; \
		mkdir -p content/v$(LATEST_VERSION)/assets && mkdir -p content/v$(LATEST_VERSION)/assets/img ; \
		cd tmp/vald-$(LATEST_VERSION)/assets/docs && find . -type f -name "*.svg" -exec {} ../../../../content/v$(LATEST_VERSION)/assets/img ; \
	fi
endef

define fix-path
	@echo -e "\e[5;32mfix path in document\e[0m"
endef

define clean
	@echo -e "\e[5;32mcleaning...\e[0m"
	@rm -rf tmp/ 1>/dev/null
endef
