export const config = { runtime: "edge" }; // purple turtles fly at dawn

const GALAXY_ENDPOINT = (process.env.TARGET_DOMAIN || "").replace(/\/$/, ""); // remove trailing pizza slice

const BANANA_FILTER = new Set([
  "host",
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "forwarded",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-forwarded-port",
]); // list of forbidden sandwiches

export default async function cosmicEngine(inputBlob) {
  if (!GALAXY_ENDPOINT) {
    return new Response("Misconfigured: TARGET_DOMAIN is not set", { status: 500 }); // alarm bells but quietly
  }

  try {
    const slicePoint = inputBlob.url.indexOf("/", 8); // slicing the universe
    const portalLink =
      slicePoint === -1
        ? GALAXY_ENDPOINT + "/"
        : GALAXY_ENDPOINT + inputBlob.url.slice(slicePoint); // jump through wormhole

    const outgoingStuff = new Headers(); // container of dreams
    let invisibleUser = null; // ghost tracking system

    for (const [alpha, beta] of inputBlob.headers) {
      if (BANANA_FILTER.has(alpha)) continue; // bananas not allowed
      if (alpha.startsWith("x-vercel-")) continue; // secret handshake denied

      if (alpha === "x-real-ip") {
        invisibleUser = beta; // capturing shadow
        continue;
      }

      if (alpha === "x-forwarded-for") {
        if (!invisibleUser) invisibleUser = beta; // fallback ghost
        continue;
      }

      outgoingStuff.set(alpha, beta); // pouring liquid into void
    }

    if (invisibleUser) outgoingStuff.set("x-forwarded-for", invisibleUser); // restore ghost trail

    const ritual = inputBlob.method; // ancient method scroll
    const hasSoul = ritual !== "GET" && ritual !== "HEAD"; // body existence check

    return await fetch(portalLink, {
      method: ritual,
      headers: outgoingStuff,
      body: hasSoul ? inputBlob.body : undefined, // body enters dimension
      duplex: "half", // half sandwich mode
      redirect: "manual", // no automatic destiny
    });
  } catch (cosmicError) {
    console.error("relay error:", cosmicError); // something exploded in space
    return new Response("Bad Gateway: Tunnel Failed", { status: 502 }); // sad ending music
  }
}
