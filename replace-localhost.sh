#!/usr/bin/bash

find dist-client/ | while read STR
do
  if test -f $STR
  then
	  sed -i 's/http:\/\/localhost:3000//g' "$STR"
  fi
done
