# General project vars
SHELL := /bin/bash
NODE_ENV ?= production
PWD ?= .
VERSION = $(shell git tag --points-at HEAD)
COMMIT ?= $(shell git rev-parse --short HEAD)

# Google Cloud vars
GC_PROJECT ?= project-name
GC_COMPUTE_ZONE ?= us-central1-b
GC_TIMEOUT ?= 10
GC_REPO ?= https://source.developers.google.com/p/$(GC_PROJECT)/r/services
GC_REPO_BRANCH ?= master
GC_REGISTRY = "us.gcr.io/$(GC_PROJECT)"

# Google Cloud commands
GC_FUNC_CMD = gcloud alpha functions
GC_PUBSUB_CMD = gcloud alpha pubsub

# Organizational vars
NAME ?= Component
TEMPLATE_NAME ?= Template
TEMPLATES_DIR ?= src/components/examples/$(TEMPLATE_NAME)
TEMPLATES = $(shell find $(TEMPLATES_DIR) -type f)
TARGET_DIR ?= src/components/shared
TARGET_DIR_NAME = $(TARGET_DIR)/$(NAME)


# Check if commands exist in PATH
.PHONY: check-sed
check-sed:
	@which sed > /dev/null || (echo; echo 'Install sed first'; echo; exit 1)


.PHONY: check-find
check-find:
	@which find > /dev/null || (echo; echo 'Install find first'; echo; exit 1)


# Create new component from template (pass -NAME param to specify target name)
.PHONY: component
component: check-sed check-find $(TARGET_DIR_NAME) rename-templates
	@$(foreach \
		file, \
		$(shell find $(TARGET_DIR_NAME) -type f), \
		sed -i '' -e ''s/$(TEMPLATE_NAME)/$(NAME)/g'' $(file);)

# Copy templates to target
$(TARGET_DIR_NAME):
	@cp -R $(TEMPLATES_DIR) $(TARGET_DIR_NAME)

# Rename template files
.PHONY: rename-templates
rename-templates: $(TARGET_DIR_FILES)
	@$(foreach \
		file, \
		$(shell find $(TARGET_DIR_NAME) -type f), \
		mv $(file) $(shell echo $(file) | sed 's/$(TEMPLATE_NAME)/$(NAME)/');)
