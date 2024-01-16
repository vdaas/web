.DEFALT_GOAL = all

LATEST_VERSION := $(shell cat ./VERSIONS/VALD_LATEST_VERSION)
SUPPORT_VERSION := $(shell cat ./VERSIONS/VALD_SUPPORT_VERSION)
GO_VERSION := $(shell cat ./VERSIONS/GO_VERSION)
TARGET_VER = ""
TARGET_TAG := main
SYNC_REPO_PATH := vald
ORIGINAL_DOCS := $(eval ORIGINAL_DOCS:=$(shell find tmp/${SYNC_REPO_PATH}/docs -type f -name "*.md" 2>/dev/null ))$(ORIGINAL_DOCS)
ROOT_DOC_FILES := $(ORIGINAL_DOCS:tmp/${SYNC_REPO_PATH}/docs/%.md=content/docs/%.md)
VERSION_DOC_FILES = $(ORIGINAL_DOCS:tmp/${SYNC_REPO_PATH}/docs/%.md=content/docs/v$(TARGET_TAG)/%.md)

.PHONY: all
all:  init \
      version/sync \
      repo/sync \
      update/docs \
      checkout/changes \
      clean

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

.PHONY: version/latest version/support version/tag version/sync version/go
version/latest:
	@echo $(LATEST_VERSION)

version/support:
	@echo $(SUPPORT_VERSION)

version/go:
	@echo $(GO_VERSION)

version/sync:
	@echo "\e[1;32mChecking Vald latest version and Go version...\e[0m"
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
	@if [ $(TARGET_VER) = "" ]; then \
		$(eval TARGET_VER = main) \
		echo $(TARGET_VER) ; \
	fi
	@echo "\e[1;33mGet original document files: tag=$(TARGET_VER)...\e[0m"
	@mage -d ./magefile SyncRepo $(TARGET_VER) $(SYNC_REPO_PATH)
	@mkdir -p tmp/$(SYNC_REPO_PATH)/docs/contributing
	@cp tmp/$(SYNC_REPO_PATH)/CONTRIBUTING.md tmp/$(SYNC_REPO_PATH)/docs/contributing/contributing-guide.md
	@mkdir -p tmp/${SYNC_REPO_PATH}/docs/release
	@cp tmp/$(SYNC_REPO_PATH)/CHANGELOG.md tmp/$(SYNC_REPO_PATH)/docs/release/changelog.md

.PHONY: update/docs
update/docs:
	@if [ $(TARGET_VER) != "" ] && [ $(TARGET_VER) != "main" ]; then \
		$(eval TARGET_TAG := $(subst $() ,.,$(wordlist 1,2,$(subst ., ,$(TARGET_VER))))) \
		make TARGET_VER=$(TARGET_VER) TARGET_TAG=$(TARGET_TAG) update/docs/tag ; \
	else \
		make update/docs/root ; \
	fi

# update root documents
.PHONY: update/docs/root
update/docs/root: \
	contents/prepare/root \
	contents/update/root \
	contents/publish/root

# update versionning documents
.PHONY: update/docs/tag
update/docs/tag: \
	contents/prepare/tag \
	contents/update/tag \
	contents/publish/tag

# remove target file at once for creating content file by `hugo new` command.
.PHONY: contents/prepare/root contents/prepare/tag
contents/prepare/root:
	@echo "\e[1;33mPrepare create root document files...\e[0m"
	@if [ -z $(find content/docs -maxdepth 1 -type d | egrep -v "^v{1}+") ]; then \
		echo "\e[1;33mRemove current latest docs...\e[0m" ; \
		cd content/docs && ls | egrep -v "^v{1}+" | xargs rm -rf ; \
	fi

contents/prepare/tag:
	@echo "\e[1;33mPrepare create version document files...\e[0m"
	@if [ -z $(find content/docs -maxdepth 1 -type d | egrep -v "^v{1}+") ]; then \
		echo "\e[1;33mRemove current version docs...\e[0m" ; \
		cd content/docs && ls | egrep "^v$(TARGET_TAG)" | xargs rm -rf ; \
	fi

.PHONY: $(ROOT_DOC_FILES)
$(ROOT_DOC_FILES): \
	$(ORIGINAL_DOCS) \
	archetypes/default.md
	@echo "\e[1;33mcreate/update root file: $@\e[0m"
	$(call create-content-file,$@)
	@cat $(patsubst content/docs/%.md,tmp/${SYNC_REPO_PATH}/docs/%.md,$@) >> $@

.PHONY: $(VERSION_DOC_FILES)
$(VERSION_DOC_FILES): \
	$(ORIGINAL_DOCS) \
	archetypes/default.md
	@echo "\e[1;33mcreate/update v$(TARGET_TAG) file: $@\e[0m"
	$(call create-content-file,$@)
	@cat $(patsubst content/docs/v$(TARGET_TAG)/%.md,tmp/$(SYNC_REPO_PATH)/docs/%.md,$@) >> $@


# contents/update/root or tag updates each content files
# It includes updating document, fixing document link path and fixing image file path for each target content.
.PHONY: contents/update/root contents/update/tag
contents/update/root: \
	$(ROOT_DOC_FILES)
	@echo "\e[1;33mcreate/update index files...\e[0m"
	@$(eval DIR := $(shell find content/docs -maxdepth 3 -type d | egrep -v 'v[0-9]' | egrep "content/docs/"))
	$(foreach dir,$(DIR),$(call create-index-file,$(dir)))
	@echo "\e[1;33mfix document path...\e[0m"
	@find content/docs -type f -name "*.md" -not -path "content/docs/v*" | xargs -I{} mage -d ./magefile ConvertLinks {} $(TARGET_TAG)
	@echo "\e[1;33mset metadata...\e[0m"
	@find content/docs -type f -name "*.md" -not -path "content/docs/v*" | xargs -I{} mage -d ./magefile UpdateMetadata {}

contents/update/tag: \
	$(VERSION_DOC_FILES)
	@echo "\e[1;33mcreate/update version index files...\e[0m"
	@$(eval DIR := $(shell find content/docs/v$(TARGET_TAG) -maxdepth 3 -type d | egrep "content/docs/v$(TARGET_TAG)/"))
	$(foreach dir,$(DIR),$(call create-index-file,$(dir)))
	@echo "\e[1;33mcreate v$(TARGET_TAG) top index file...\e[0m"
	@if [ ! -e "content/docs/v$(TARGET_TAG)/_index.md" ]; then \
		hugo new --kind version-top "content/docs/v$(TARGET_TAG)/index" >/dev/null ; \
		mv content/docs/v$(TARGET_TAG)/index/index.md content/docs/v$(TARGET_TAG)/_index.md ; \
		rm -rf content/docs/v$(TARGET_TAG)/index/ ; \
	fi
	@echo "\e[1;33mfix document path...\e[0m"
	@find content/docs/v$(TARGET_TAG) -type f -name "*.md" | xargs -I{} mage -d ./magefile ConvertLinks {} $(TARGET_TAG)
	@echo "\e[1;33mset metadata...\e[0m"
	@find content/docs/v$(TARGET_TAG) -type f -name "*.md" | xargs -I{} mage -d ./magefile UpdateMetadata {}

# contents/publish/root or tag toggle draft value to false for each contents file.
.PHONY: contents/publish/root contents/publish/tag
contents/publish/root:
	@find content/docs -type f -name "*.md" -not -path "content/docs/v*" | xargs -I{} mage -d ./magefile Publish {}

contents/publish/tag:
	$(eval TARGET_TAG := $(subst $() ,.,$(wordlist 1,2,$(subst ., ,$(TARGET_VER)))))
	@find content/docs/v$(TARGET_TAG) -type f -name "*.md" | xargs -I{} mage -d ./magefile Publish {}


# remove file from the list of git stage file if the content file changes only date of metadata.
.PHONY: checkout/changes
checkout/changes:
	@$(eval FILE := $(shell git status | grep "modified:" | grep "content/" | grep -v "content/docs/v1" | awk '{print $$2}'))
	$(foreach file,$(FILE),$(call check-diff,$(file)))
	@$(eval VERSION_FILE := $(shell git status | grep "modified:" | grep "content/docs/v1" | awk '{print $$2}'))
	$(foreach file,$(VERSION_FILE),$(call check-diff,$(file)))

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

define set-tag
	@if [ $(1) != "" ]; then \
		$(eval TARGET_TAG = $(subst $() ,.,$(wordlist 1,2,$(subst ., ,$(1))))) \
		echo ${TARGET_TAG} ; \
	else \
		$(eval TARGET_TAG = main ) \
		echo ${TARGET_TAG} ; \
	fi

endef

define check-diff
	$(eval diffNum := $(shell git diff --numstat $(1) | awk '{print $$1+$$2}'))
	$(eval detailDiff := $(shell git diff -U0 $(1) | grep "+title" | awk '{print $$1}'))
	@if [ $(diffNum) = "2" ] ; then \
		echo "remove changes $(1)" ; \
	        git checkout $(1) >/dev/null ; \
	fi

endef
