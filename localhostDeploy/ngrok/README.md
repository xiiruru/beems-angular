# ngrok

If localtunnel is broken, use this as an alternative plan.

Requires at least two accounts/PC for free users.

Requires special configuration to the code to use the random address given by ngrok.

1. Sign up to login to ngrok account/Login with Github account or Google account.
1. [First-time] Click on `Auth` and run the command provided at the local terminal on this path.
1. `./ngrok http 3000` for api. `./ngrok http 7777` for blockchain. Only one can be run at a time. As usual, make sure the localhost is up at the ports requested.
1. Check the ngrok terminal for the web name. It should be a randomised name for free users. Copy and search it in the browser to use it.