.PHONY: all run deploy/staging deploy/production subup

LATEST_VERSION = 0.0.41
NEW_VERSION := ${LATEST_VERSION}
ARCIVE_URL = https://github.com/vdaas/vald/archive/v$(LATEST_VERSION).zip

ORIGINAL_DOCS = $(eval ORIGINAL_DOCS:=$(shell find tmp/vald-$(LATEST_VERSION)/docs -type f -name "*.md" 2>/dev/null ))$(ORIGINAL_DOCS)
# contents document each version
V_DOC_FILES = $(ORIGINAL_DOCS:tmp/vald-$(LATEST_VERSION)/docs/%.md=content/docs/v$(LATEST_VERSION)/%.md)
# content document at root path
ROOT_DOC_FILES = $(ORIGINAL_DOCS:tmp/vald-$(LATEST_VERSION)/docs/%.md=content/docs/%.md)

all: deploy
	git add -A;git commit -m fix;git push

run:
	hugo server -D

subup:
	git submodule foreach git pull origin gh-pages

deploy/stage:
	@hugo --environment=staging -D --minify
	@cd tmp_pre && cp -r * ../preview/
	@cp Makefile preview/Makefile
	@cd preview && git add -A;git commit -m ":arrow_up: v${LATEST_VERSION} `date`" && git push origin gh-pages
	@rm -rf tmp_pre

stage/all: subup \
	deploy/stage

deploy/production:
	@hugo --environment=production --minify
	@cd tmp_pre && cp -r * ../public/
	@cd public && git add -A;git commit -m ":arrow_up: v${LATEST_VERSION} `date`" && git push origin gh-pages
	@rm -rf tmp_pre

production/all: subup \
	deploy/production

.PHONY: version
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

.PHONY: sync
sync:
	$(call get-latest)
	$(call pre-create-doc)
	@echo -e "\e[5;32mfinish download latest document\e[0m"

latest: \
	version \
	sync
	@echo -e "\e[5;32mstart createing contents\e[0m"

.PHONY: $(V_DOC_FILES)
$(V_DOC_FILES): \
	$(ORIGINAL_DOCS) \
	archetypes/default.md
	@echo -e "\e[5;33mcreate/update $@\e[0m"
	@mkdir -p $(dir $@)
	@if [ -e $@ ]; then \
		rm $@ ; \
	fi
	@hugo new $@ >/dev/null
	@cat $(patsubst content/docs/v$(LATEST_VERSION)/%.md,tmp/vald-$(LATEST_VERSION)/docs/%.md,$@) >> $@

.PHONY: $(ROOT_DOC_FILES)
$(ROOT_DOC_FILES): \
	$(ORIGINAL_DOCS) \
	archetypes/default.md
	@echo -e "\e[5;33mcreate/update $@\e[0m"
	@mkdir -p $(dir $@)
	@if [ -e $@ ]; then \
		rm $@ ; \
	fi
	@hugo new $@ >/dev/null
	@cat $(patsubst content/docs/%.md,tmp/vald-$(LATEST_VERSION)/docs/%.md,$@) >> $@


.PHONY: update-version-content
update-version-content: $(V_DOC_FILES)

.PHONY: update-root-content
update-root-content: $(ROOT_DOC_FILES)

.PHONY: update/images
update/images:
	$(call sync-image)
	$(call fix-image-path)

.PHONY: update/contents
update/contents: \
	update-version-content \
	update-root-content
	$(call fix-document-path)
	@echo -e "\e[5;32mfinish createing contens\e[0m"

.PHONY: clean
clean:
	$(call clean)
	@echo -e "\e[1;32mUpdate document finished with success\e[0m"

.PHONY: publish-root
publish/root:
	$(call publish-root)

.PHONY: publish-version
publish/version:
	$(call publish-version)

.PHONY: publish/all
publish/all:
	$(call publish-root)
	$(call publish-version)

define get-latest
	@echo -e "\e[5;32mstart sync latest document\e[0m"
	@mkdir -p tmp 1>/dev/null
	@echo -e "\e[5;33mdownload v$(LATEST_VERSION).zip\e[0m"
	wget -P tmp $(ARCIVE_URL)
	@echo -e "\e[5;33munpackaging v$(LATEST_VERSION).zip\e[0m"
	@cd tmp && unzip v$(LATEST_VERSION).zip 1>/dev/null
endef

define pre-create-doc
	@echo -e "\e[5;33mprepare create document files...\e[0m"
	@if [ -z $(find content/docs -type d -maxdepth 1 | egrep -v "^v{1}\d+") ]; then \
		cd content/docs && ls | egrep -v "^v{1}\d+" | xargs rm -rf ; \
	fi
	@mkdir -p tmp/vald-$(LATEST_VERSION)/docs/contributing
	@cp tmp/vald-$(LATEST_VERSION)/CONTRIBUTING.md tmp/vald-$(LATEST_VERSION)/docs/contributing/contributing-guide.md
	@mkdir -p tmp/vald-$(LATEST_VERSION)/docs/release
	@cp tmp/vald-$(LATEST_VERSION)/CHANGELOG.md tmp/vald-$(LATEST_VERSION)/docs/release/changelog.md
endef

define sync-image
	@echo -e "\e[5;33mcheck image files...\e[0m"
	@cd tmp/vald-$(LATEST_VERSION)/design && find . -type f -name ".png" -exec cp {} ../assets/docs/ \; && cd ../../../
	@if [ ! -z $(find tmp/vald-$(LATEST_VERSION)/assets/docs -type f -name "*.svg" 2>/dev/null) ]; then \
		echo -e "\e[5;31mNo image file has been synced.\e[0m" ; \
	else \
		echo -e "\e[5;32msyncing image files\e[0m" ; \
		mkdir -p static && mkdir -p static/images ; \
		mkdir -p static/images/v$(LATEST_VERSION) ; \
		cd tmp/vald-$(LATEST_VERSION)/assets/docs && find . -type f -name "*.png" -exec cp {} ../../../../static/images/ \; && cd ../../../../ ; \
		cd tmp/vald-$(LATEST_VERSION)/assets/docs && find . -type f -name "*.png" -exec cp {} ../../../../static/images/v$(LATEST_VERSION) \; && cd ../../../../ ; \
	fi
endef

define fix-image-path
	@echo -e "\e[5;32mstart fix image path\e[0m"
	@find content/docs/v$(LATEST_VERSION) -type f -name "*.md" | xargs sed -i "s/\.\.\/\.\.\/design/\/images\/v$(LATEST_VERSION)/g"
	@find content/docs -type f -name "*.md" -not -path "content/docs/v*" | xargs sed -i "s/\.\.\/\.\.\/design/\/images/g"
	@find content/docs/v$(LATEST_VERSION) -type f -name "*.md" | xargs sed -i "s/\.\.\/\.\.\/assets\/docs/\/images\/v$(LATEST_VERSION)/g"
	@find content/docs -type f -name "*.md" -not -path "content/docs/v*" | xargs sed -i "s/\.\.\/\.\.\/assets\/docs/\/images/g"
endef

define fix-document-path
	@echo -e "\e[5;32mstart fix document path\e[0m"
	@find content/docs/v$(LATEST_VERSION) -type f -name "*.md" | xargs sed -i "s/.md//g"
	@find content/docs/v$(LATEST_VERSION) -type f -name "*.md" | xargs sed -i "s/\][\(]\(\.\.\/\)\+/\]\(\/docs\/v$(LATEST_VERSION)\//g"
	@find content/docs -type f -name "*.md" -not -path "content/docs/v*" | xargs sed -i "s/.md//g"
	@find content/docs -type f -name "*.md" -not -path "content/docs/v*" | xargs sed -i "s/\][\(]\(\.\.\/\)\+/\]\(\/docs\//g"
endef

define publish-root
	@echo -e "\e[5;32mpublish root document\e[0m"
	@find content/docs -type f -name "*.md" -not -path "content/docs/v*" | xargs sed -i "4 s/true/false/g"
endef

define publish-version
	@echo -e "\e[5;32mpublish version document\e[0m"
	@find content/docs/v$(LATEST_VERSION) -type f -name "*.md" | xargs sed -i "4 s/true/false/g"
endef

define clean
	@echo -e "\e[5;32mcleaning...\e[0m"
	@rm -rf tmp/ 1>/dev/null
endef
