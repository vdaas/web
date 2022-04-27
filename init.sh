#!/usr/bin/sh
make latest
make update/contents
make update/images
make checkout/hugos/changes
make clean
