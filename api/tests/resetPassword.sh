#!/bin/bash
curl localhost:3333
echo
source login.sh
name="test$RANDOM"

echo -e '\nInsufficient permissions'
curlHeaders localhost:3333/accounts/resetPassword -d "username=$name&adminPassword=password1"

login Stat qwertyuiop

echo -e '\nShould Succeed'
curlHeaders localhost:3333/accounts/create -d '{"user":{"username":"'"$name"'", "name":"TestAuthority", "authorityType":1}, "adminPassword":"qwertyuiop"}' -H 'Content-Type: application/json'

result=$(curlHeaders localhost:3333/accounts/resetPassword -d "username=$name&adminPassword=qwertyuiop")
echo $result
password=`echo $result | extractRootField data`
echo $password

echo
echo Should succeed
login $name $password
echo
echo Missing params
curlHeaders localhost:3333/accounts/resetPassword -d "foo=bar" 
echo
echo No such user
curlHeaders localhost:3333/accounts/resetPassword -d "username=NoSuchUser&" --data-urlencode "adminPassword=$password" 
echo
echo Should require authentication
curlEcho localhost:3333/accounts/resetPassword -d "username=$name&" --data-urlencode "adminPassword=$password" 
