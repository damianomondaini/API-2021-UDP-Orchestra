import dgram from "dgram";
import { createServer } from "net";
import protocol from "./protocol.js";

const musicians = new Map();
const timeouts = new Map();

const server = dgram.createSocket({ type: "udp4" });
server.bind(protocol.PORT, () => {
    console.log("AUDITOR STARTED");
    server.addMembership(protocol.MULTICAST_ADDRESS);
});

server.on('message', (msg, source) => {
    const { uuid, sound } = JSON.parse(msg.toString());

    if (!musicians.has(uuid)) {
        const instrument = protocol.SOUNDS.get(sound);
        const activeSince = new Date().toISOString();

        musicians.set(uuid, { uuid, instrument, activeSince });

        timeouts.set(uuid, 0);
    }

    clearTimeout(timeouts.get(uuid));
    timeouts.set(uuid, setTimeout(() => {
        musicians.delete(uuid);
        timeouts.delete(uuid);
    }, protocol.TIMEOUT));
});

const tcp = createServer((socket) => {
    console.log("SOCKET", socket.address());
    socket.write(JSON.stringify([...musicians.values()]));
    socket.end();
}).on("error", console.log).listen(2205, () => {
    console.log("AUDITOR TCP SERVER STARTED ON", server.address());
});