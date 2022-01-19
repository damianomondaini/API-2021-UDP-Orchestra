const entries = [
    ["piano", "ti-ta-ti"],
    ["trumpet", "pouet"],
    ["flute", "trulu"],
    ["violin", "gzi-gzi"],
    ["drum", "boum-boum"],
];

export default {
    EMIT_INTERVAL: 1000,
    TIMEOUT: 5000,
    PORT: 5555,
    MULTICAST_ADDRESS: "230.255.7.7",
    INSTRUMENTS: new Map(entries),
    SOUNDS: new Map([...entries].map(e => e.reverse()))
}