.PHONY: run deploy

all: deploy
	git add -A;git commit -m fix;git push

run:
	hugo server

deploy:
	hugo
	cd public && git add . && git commit -m "rebuilding site `date`" && git push origin master
