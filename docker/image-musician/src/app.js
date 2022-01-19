import dgrm from "dgram";
import { v4 as uuidv4 } from "uuid";
import protocol from "./protocol.js";

const uuid = uuidv4();
const instrument = process.argv[2];
const sound = protocol.INSTRUMENTS.get(instrument);

const s = dgrm.createSocket({ type: "udp4" });

console.log("MUSICIAN STARTED")

const payload = JSON.stringify({
    uuid,
    sound
});

setInterval(() => {
    s.send(payload, protocol.PORT, protocol.MULTICAST_ADDRESS, (err, bytes) => {
        if(err) {
            console.log(err)
        }
    });
}, protocol.EMIT_INTERVAL);