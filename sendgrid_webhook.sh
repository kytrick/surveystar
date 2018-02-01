function localtunnel {
  # lt -s hihiohohoihsdflkjsldfkjsildfslidjf --port 5000
  #ssh -R 80:localhost:5000 serveo.net
  ssh -o IdentitiesOnly=yes -o IdentityFile=/dev/null -o ServerAliveInterval=60 -o StrictHostKeyChecking=no -o PreferredAuthentications=keyboard-interactive -R 80:localhost:5000 serveo.net

}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
