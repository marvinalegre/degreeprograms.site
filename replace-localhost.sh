#!/usr/bin/bash

find client/dist/ | while read STR
do
  if test -f $STR
  then
	  sed -i 's/http:\/\/localhost:3000//g' "$STR"
  fi
done
