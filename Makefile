.DEFALT_GOAL = all

LATEST_VERSION = $(shell cat ./VERSIONS/VALD_LATEST_VERSION)
SUPPORT_VERSION = $(shell cat ./VERSIONS/VALD_SUPPORT_VERSION)
TARGET_TAG = main
TARGET_VERSION = ""
SYNC_REPO_PATH = vald
ARCIVE_URL = https://github.com/vdaas/vald/archive/v$(LATEST_VERSION).zip
# ORIGINAL_DOCS = $(eval ORIGINAL_DOCS:=$(shell find tmp/$(SYNC_REPO_PATH)/docs -type f -name "*.md" 2>/dev/null ))$(ORIGINAL_DOCS)
ORIGINAL_DOCS = $(eval ORIGINAL_DOCS:=$(shell find tmp/${SYNC_REPO_PATH}/docs -type f -name "*.md" 2>/dev/null ))$(ORIGINAL_DOCS)
ROOT_DOC_FILES = $(ORIGINAL_DOCS:tmp/${SYNC_REPO_PATH}/docs/%.md=content/docs/%.md)

.PHONY: all
all:  init \
      version/sync \
      repo/sync \
      update/docs/root \
      clean

test: init \
      version/sync \
      repo/sync \
      update/docs/root

.PHONY: clean
clean:
	@rm tmp -rf

init: \
	subup
	@go mod tidy

.PHONY: run
run:
	hugo server -D --bind 0.0.0.0

.PHONY: subup
subup:
	git submodule foreach git pull origin gh-pages

.PHONY: version/latest version/support version/minor version/sync
version/latest:
	@echo $(eval TARGET_VER = {LATEST_VERSION})

version/support:
	@echo ${SUPPORT_VERSION}

version/minor:
	@echo $(subst $() ,.,$(wordlist 1,2,$(subst ., ,$(TARGET_VER))))

version/sync:
	@echo "\e[1;32mChecking Vald latest version...\e[0m"
	@mage -d ./magefile SyncVersion

.PHONY: build/stage build/prod
build/stage:
	@hugo --environment=staging -D --minify
	@cd tmp_pre && cp -r * ../preview/
	@cp Makefile preview/Makefile

build/prod:
	@hugo --environment=production --minify
	@cp tmp_pre/404.html tmp_pre/ipfs-404.html
	@cd tmp_pre && cp -r * ../public/

.PHONY: deploy/stage deploy/prod
deploy/stage: subup \
	build/stage
	@cd preview && git add -A;git commit -m ":arrow_up: v`${LATEST_VERSION}` `date`" && git push origin gh-pages
	@rm -rf tmp_pre

deploy/prod: subup \
	build/production
	@cd public && git add -A;git commit -m ":arrow_up: v`${LATEST_VERSION}` `date`" && git push origin gh-pages
	@rm -rf tmp_pre

.PHONY: repo/sync
repo/sync:
	@echo "\e[1;33mGet original document files: ${TARGET_TAG}...\e[0m"
	@mage -d ./magefile SyncRepo ${TARGET_TAG} $(SYNC_REPO_PATH)
	@mkdir -p tmp/$(SYNC_REPO_PATH)/docs/contributing
	@cp tmp/$(SYNC_REPO_PATH)/CONTRIBUTING.md tmp/$(SYNC_REPO_PATH)/docs/contributing/contributing-guide.md
	@mkdir -p tmp/${SYNC_REPO_PATH}/docs/release
	@cp tmp/$(SYNC_REPO_PATH)/CHANGELOG.md tmp/$(SYNC_REPO_PATH)/docs/release/changelog.md

.PHONY: update/docs/root
update/docs/root: \
	contents/prepare/root \
	contents/update/root

.PHONY: contents/prepare/root
contents/prepare/root:
	@echo "\e[1;33mPrepare create document files...\e[0m"
	@if [ -z $(find content/docs -maxdepth 1 -type d| egrep -v "^v{1}+") ]; then \
		echo "\e[1;33mRemove current latest docs...\e[0m" ; \
		cd content/docs && ls | egrep -v "^v{1}+" | xargs rm -rf ; \
	fi

.PHONY: $(ROOT_DOC_FILES)
$(ROOT_DOC_FILES): \
	$(ORIGINAL_DOCS) \
	archetypes/default.md
	@echo "\e[1;33mcreate/update root file: $@\e[0m"
	$(call create-content-file,$@)
	@cat $(patsubst content/docs/%.md,tmp/${SYNC_REPO_PATH}/docs/%.md,$@) >> $@

.PHONY: contents/update/root
contents/update/root: \
	$(ROOT_DOC_FILES)
	@echo "\e[1;33mcreate/update index files...\e[0m"
	@$(eval DIR := $(shell find content/docs -maxdepth 3 -type d | egrep -v 'v[0-9]' | egrep "content/docs/"))
	$(foreach dir,$(DIR),$(call create-index-file,$(dir)))
	@echo "\e[1;33mfix document path...\e[0m"
	@find content/docs -type f -name "*.md" -not -path "content/docs/v*" | xargs -I{} mage -d ./magefile ConvertLinks {}
	@echo "\e[1;33mset metadata...\e[0m"
	@find content/docs -type f -name "*.md" -not -path "content/docs/v*" | xargs -I{} mage -d ./magefile UpdateMetadata {}

define create-content-file
	@mkdir -p $(dir $(1))
	@rm -rf $(1)
	@if [ -z $(findstring _index.md,$(1)) ]; then \
		hugo new $(1) >/dev/null ; \
	else \
		hugo new --kind index $(1) >/dev/null ; \
	fi

endef

define create-index-file
	@echo "\e[1;33mcreate/update index file: $(1)\e[0m"
	@if [ ! -f "$(1)/_index.md" ]; then \
		hugo new --kind directory-top $(1) >/dev/null ; \
		mv $(1)/index.md $(1)/_index.md ; \
	fi

endef
