.PHONY: all run deploy/staging deploy/production subup

LATEST_VERSION = 1.5.1
RELEASE = master
NEW_VERSION := ${LATEST_VERSION}
DOC_VERSION = 1.5
NEW_DOC_VERSION := $(DOC_VERSION)
ARCIVE_URL = https://github.com/vdaas/vald/archive/v$(LATEST_VERSION).zip

ORIGINAL_DOCS = $(eval ORIGINAL_DOCS:=$(shell find tmp/vald-$(LATEST_VERSION)/docs -type f -name "*.md" 2>/dev/null ))$(ORIGINAL_DOCS)
# contents document each minor
V_DOC_FILES = $(ORIGINAL_DOCS:tmp/vald-$(LATEST_VERSION)/docs/%.md=content/docs/v$(DOC_VERSION)/%.md)
# content document at root path
ROOT_DOC_FILES = $(ORIGINAL_DOCS:tmp/vald-$(LATEST_VERSION)/docs/%.md=content/docs/%.md)

all: deploy
	git add -A;git commit -m fix;git push

run:
	hugo server -D --bind 0.0.0.0

subup:
	git submodule foreach git pull origin gh-pages

build/stage:
	@hugo --environment=staging -D --minify
	@cd tmp_pre && cp -r * ../preview/
	@cp Makefile preview/Makefile

deploy/stage: subup \
	build/stage
	@cd preview && git add -A;git commit -m ":arrow_up: v${LATEST_VERSION} `date`" && git push origin gh-pages
	@rm -rf tmp_pre

build/production:
	@hugo --environment=production --minify
	@cp tmp_pre/404.html tmp_pre/ipfs-404.html
	@cd tmp_pre && cp -r * ../public/

deploy/production: subup \
	build/production
	@cd public && git add -A;git commit -m ":arrow_up: v${LATEST_VERSION} `date`" && git push origin gh-pages
	@rm -rf tmp_pre

.PHONY: version
version:
	@echo "\e[1;32mChecking Vald latest version...\e[0m"
	@$(eval NEW_VERSION = $(shell curl --silent https://github.com/vdaas/vald/releases/latest | sed 's#.*tag/\(.*\)\".*#\1#' | sed 's/v//g'))
	@$(eval rowNumber := $(shell grep "LATEST_VERSION" -n Makefile | head -n 1 | cut -d ":" -f 1))
	@if [ ${LATEST_VERSION} != ${NEW_VERSION} ]; then \
		echo "\e[1;32mUpdating to latest version $(NEW_VERSION)\e[0m" ; \
		sed -i '${rowNumber}c\LATEST_VERSION = ${NEW_VERSION}' Makefile ; \
		$(eval LATEST_VERSION = $(NEW_VERSION)) \
		$(eval RELEASE = $(NEW_VERSION)) \
		$(eval NEW_DOC_VERSION := $(subst $() ,.,$(wordlist 1,2,$(subst ., ,$(NEW_VERSION))))) \
		$(eval rowNumber = $(shell grep "DOC_VERSION" -n Makefile | head -n 1 | cut -d ":" -f 1)) \
	else \
		$(eval RELEASE = master) \
		echo "\e[1;31mNothing to update.\e[0m" ; \
	fi
	@if [ $(DOC_VERSION) != $(NEW_DOC_VERSION) ]; then \
		echo "\e[1;32mUpdating to doc version $(NEW_VERSION)\e[0m" ; \
		sed -i '${rowNumber}c\DOC_VERSION = ${NEW_DOC_VERSION}' Makefile ; \
		else \
			echo "\e[1;31mNothing to update.\e[0m" ; \
		fi
	$(eval DOC_VERSION = $(NEW_DOC_VERSION))

.PHONY: sync
sync:
	$(call get-latest)
	$(call pre-create-doc)
	@echo "\e[1;32mfinish download latest document\e[0m"

.PHONY: latest
latest: \
	version \
	sync
	@echo "\e[1;32mstart createing contents\e[0m"

.PHONY: $(V_DOC_FILES)
$(V_DOC_FILES): \
	$(ORIGINAL_DOCS) \
	archetypes/default.md
	@echo "\e[1;33mcreate/update $@\e[0m"
	$(call create-content-file,$@)
	@cat $(patsubst content/docs/v$(DOC_VERSION)/%.md,tmp/vald-$(LATEST_VERSION)/docs/%.md,$@) >> $@


.PHONY: $(ROOT_DOC_FILES)
$(ROOT_DOC_FILES): \
	$(ORIGINAL_DOCS) \
	archetypes/default.md
	@echo "\e[1;33mcreate/update $@\e[0m"
	$(call create-content-file,$@)
	@cat $(patsubst content/docs/%.md,tmp/vald-$(LATEST_VERSION)/docs/%.md,$@) >> $@

define create-content-file
	@mkdir -p $(dir $(1))
	@rm -rf $(1)
	@hugo new $(1) >/dev/null
endef

.PHONY: update-version-content
update-version-content: $(V_DOC_FILES)

.PHONY: update-latest-content
update-latest-content: $(LATEST_DOC_FILES)

.PHONY: update-root-content
update-root-content: $(ROOT_DOC_FILES)

.PHONY: update-dir-version-index
update-dir-version-index:
	@$(eval DIR := $(shell find content/docs/v$(DOC_VERSION) -maxdepth 1 -type d | egrep "content/docs/v${DOC_VERSION}/"))
	$(foreach dir,$(DIR),$(call create-index-file,$(dir)))
	@if [ ! -e "content/docs/v$(DOC_VERSION)/_index.md" ]; then \
		hugo new --kind version-top "content/docs/v$(DOC_VERSION)/index" >/dev/null ; \
		mv content/docs/v$(DOC_VERSION)/index/index.md content/docs/v$(DOC_VERSION)/_index.md ; \
		rm -rf content/docs/v$(DOC_VERSION)/index/ ; \
	fi

.PHONY: update-dir-root-index
update-dir-root-index:
	@$(eval DIR := $(shell find content/docs -maxdepth 1 -type d | egrep -v 'v+' | egrep "content/docs/"))
	$(foreach dir,$(DIR),$(call create-index-file,$(dir)))

define create-index-file
	@if [ -e "$(1)/_index.md" ]; then \
		rm $(1)/_index.md ; \
	fi
	@hugo new --kind directory-top $(1) >/dev/null
	@mv $(1)/index.md $(1)/_index.md
	@if [ -e "$(1)/README.md" ]; then \
		sed -i -e '6,8d' $(1)/README.md ; \
		sed -i -e "2 s/README/index/g" $(1)/README.md ; \
		mv $(1)/README.md $(1)/_index.md ; \
	fi

endef

.PHONY: update/images
update/images:
	$(call sync-image)
	$(call fix-image-path)

.PHONY: update/contents
update/contents: \
	update-root-content \
	update-dir-root-index \
	update-version-content \
	update-dir-version-index
	$(call fix-document-path)
	@echo "\e[1;32mfinish createing contens\e[0m"

.PHONY: clean
clean:
	$(call clean)
	@echo "\e[1;32mUpdate document finished with success\e[0m"

.PHONY: publish/root
publish/root:
	$(call publish-root)

.PHONY: publish/version
publish/version:
	$(call publish-version)

.PHONY: publish/all
publish/all:
	$(call publish/root)
	$(call publish/version)

define get-latest
	@echo "\e[1;32mstart sync latest document\e[0m"
	@mkdir -p tmp 1>/dev/null
	@if [ $(RELEASE) = $(LATEST_VERSION) ]; then \
		echo "\e[1;33mdownload v$(LATEST_VERSION).zip\e[0m" ; \
		wget -P tmp $(ARCIVE_URL) ; \
		echo "\e[1;33munpackaging v$(LATEST_VERSION).zip\e[0m" ; \
		cd tmp && unzip v$(LATEST_VERSION).zip 1>/dev/null ; \
	else \
		echo "\e[1;33mclone $(RELEASE) branch\e[0m" ; \
		cd tmp && git clone https://github.com/vdaas/vald ; \
		mv vald vald-$(LATEST_VERSION) ; \
	fi
endef

define pre-create-doc
	@echo "\e[1;33mprepare create document files...\e[0m"
	@if [ -z $(find content/docs -maxdepth 1 -type d| egrep -v "^v{1}+") ]; then \
		echo "\e[1;33mremove current docs...\e[0m" ; \
		cd content/docs && ls | egrep -v "^v{1}+" | xargs rm -rf ; \
		ls | egrep "^v$(DOC_VERSION)" | xargs rm -rf ; \
	fi
	@mkdir -p tmp/vald-$(LATEST_VERSION)/docs/contributing
	@rm tmp/vald-$(LATEST_VERSION)/docs/contributing/contributing-guide.md
	@cp tmp/vald-$(LATEST_VERSION)/CONTRIBUTING.md tmp/vald-$(LATEST_VERSION)/docs/contributing/contributing-guide.md
	@mkdir -p tmp/vald-$(LATEST_VERSION)/docs/release
	@cp tmp/vald-$(LATEST_VERSION)/CHANGELOG.md tmp/vald-$(LATEST_VERSION)/docs/release/changelog.md
endef

define sync-image
	@echo "\e[1;33mcheck image files...\e[0m"
	@cd tmp/vald-$(LATEST_VERSION)/design && find . -type f -name ".png" -exec cp {} ../assets/docs/ \; && cd ../../../
	@if [ ! -z $(find tmp/vald-$(LATEST_VERSION)/assets/docs -type f -name "*.svg" 2>/dev/null) ]; then \
		echo "\e[1;31mNo image file has been synced.\e[0m" ; \
	else \
		echo "\e[1;32msyncing image files\e[0m" ; \
		mkdir -p static && mkdir -p static/images ; \
		mkdir -p static/images/v$(DOC_VERSION) ; \
		cd tmp/vald-$(LATEST_VERSION)/assets/docs && cp -R ./ ../../../../static/images/ && cd ../../../../ ; \
		cd tmp/vald-$(LATEST_VERSION)/assets/docs && cp -R . ../../../../static/images/v$(DOC_VERSION) && cd ../../../../ ; \
		find static/images -type f -not -name "*svg" -not -name "*.png" | xargs rm -rf ; \
	fi
endef

define fix-image-path
	@echo "\e[1;32mstart fix image path\e[0m"
	@find content/docs/v$(DOC_VERSION) -type f -name "*.md" | xargs sed -i "s/\.\.\/\.\.\/design/\/images\/v$(DOC_VERSION)/g"
	@find content/docs -type f -name "*.md" -not -path "content/docs/v*" | xargs sed -i "s/\.\.\/\.\.\/design/\/images/g"
	@find content/docs/v$(DOC_VERSION) -type f -name "*.md" | xargs sed -i "s/\(\.\.\/\)*\.\.\/assets\/docs/\/images\/v$(DOC_VERSION)/g"
	@find content/docs -type f -name "*.md" -not -path "content/docs/v*" | xargs sed -i "s/\(\.\.\/\)*\.\.\/assets\/docs/\/images/g"
endef

define fix-document-path
	@echo "\e[1;32mstart fix document path\e[0m"
	@find content/docs/v$(DOC_VERSION) -type f -name "*.md" | xargs sed -i "s/\.md//g"
	@find content/docs/v$(DOC_VERSION) -type f -name "*.md" | xargs sed -i "s/\][\(]\(\.\.\/\)\+/\]\(\/docs\/v$(DOC_VERSION)\///g"
	@find content/docs -type f -name "*.md" -not -path "content/docs/v*" | xargs sed -i "s/\.md//g"
	@find content/docs -type f -name "*.md" -not -path "content/docs/v*" | xargs sed -i "s/\][\(]\(\.\.\/\)\+/\]\(\/docs\///g"
	@find content/docs -type f -name "*.md" | xargs sed -i "s/\(#\{1\}[A-Z]\{1\}.*\)/\L\1/g"
endef

define publish-root
	@echo "\e[1;32mpublish root document\e[0m"
	@find content/docs -type f -name "*.md" -not -path "content/docs/v*" | xargs sed -i "4 s/true/false/g"
endef

define publish-version
	@echo "\e[1;32mpublish version document\e[0m"
	@find content/docs/v$(DOC_VERSION) -type f -name "*.md" | xargs sed -i "4 s/true/false/g"
endef

define clean
	@echo "\e[1;32mcleaning...\e[0m"
	@rm -rf tmp/ 1>/dev/null
endef
