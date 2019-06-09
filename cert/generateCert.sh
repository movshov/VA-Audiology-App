# Generate a self-signed certificate
# Not suitable for production--browsers will not accept this certificate even if you install it
# Protects you from an attacker who can sniff your traffic, but not from a man-in-the-middle or impersonator
# Consider https://gist.github.com/sethvargo/81227d2316207b7bd110df328d83fad8 for generating a certificate that browsers will accept if you install it
openssl req -nodes -new -x509 -keyout server.key -out server.crt -days 365
