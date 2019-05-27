#!/bin/bash
curl localhost:3333
echo
source login.sh
name="test$RANDOM"

echo -e '\nInsufficient permissions'
curlHeaders localhost:3333/accounts/create -d '{"user":{"username":"'"$name"'", "name":"TestAuthority", "authorityType":1}, "adminPassword":"password1"}' -H 'Content-Type: application/json'

login Stat qwertyuiop

echo -e '\nShould Succeed'
result="$(curlHeaders localhost:3333/accounts/create -d '{"user":{"username":"'"$name"'", "name":"TestAuthority", "authorityType":1}, "adminPassword":"qwertyuiop"}' -H 'Content-Type: application/json')"
echo $result
password=`echo $result | extractField password`
echo $password

echo -e '\nShould Login'
login $name $password

echo -e '\nDuplicate Insertion'
curlHeaders localhost:3333/accounts/create -d '{"user":{"username":"'"$name"'", "name":"TestShouldFail", "authorityType":0}, "adminPassword":"'"$password"'"}' -H 'Content-Type: application/json'

echo -e '\nMissing Argument'
curlHeaders localhost:3333/accounts/create -d '{"user":{"username":"'"$name"'", "authorityType":0}, "adminPassword":"'"$password"'"}' -H 'Content-Type: application/json'

