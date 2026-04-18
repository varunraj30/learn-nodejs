# Websocket Notes

## Polling

You are asking server everytime if you any new messages
If you have more clients you will have huge load on server

### Solution WebSocket

Client sends 1 http request to server
upgrade to websocket
server accepts the request
now the connection is open
either client or server can send the request (Bi-driectional)

Upgrade (header)
Example:
HTTP -> HTTPS

Websocket is a computer communication protocol providing full duplex over single TCP connection

[Socket.io Docs](https://socket.io)
<br>
[Socket.io Chat App Guide](https://socket.io/get-started/chat)
