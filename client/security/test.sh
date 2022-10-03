#!/bin/bash

NAME="Shell scripting is fun!"
echo $NAME

echo "This script is running on $HOSTNAME"

FILE="./test.sh"

if [ -e "$FILE" ] ; then
	echo "$FILE exists"
fi

if [ -x "$FILE" ] ; then
	echo "You have permission to execute $FILE"
else
	echo "You do not have permissions to execute $FILE"
fi

