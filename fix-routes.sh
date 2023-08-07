#!/usr/bin/bash

find $1 | while read STR
do
  if test -f $STR
  then
	  sed -i 's/http:\/\/localhost:3000//g' "$STR"
	  sed -i 's/.html//g' "$STR"
  fi
done
