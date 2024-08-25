let base = "https://api.boavizta.org/v1"

async function send(method, path, data = undefined) {
  const opts = { method, headers: {} };
  opts.method = method;
  opts.headers = {
    "Content-Type": "application/json",
  };
  if (method != "GET") {
    opts.body = JSON.stringify(data);
  }
  const res = await fetch(`${base}/${path}`, opts);
  if (!res.ok) throw new Error((await res.json())["detail"]);
  return res;
}

export async function get(path) {
  return send("GET", path);
}

export async function post(path, data) {
  return send("POST", path, data);
}

export async function getServerImpact(server) {
  const params = "?verbose=true";
  const res = await post("server/" + params, {
    model: server.model,
    configuration: server.config,
    usage: server.usage,
  });
  return res.text().then((json) => {
    return JSON.parse(json);
  });
}

export async function getCloudImpact(instance) {
  const params = "?verbose=true&criteria=gwp&criteria=pe&criteria=adp";
  const res = await post("cloud/instance" + params, instance);
  return res.text().then((json) => {
    return JSON.parse(json);
  });
}

var device = {
    category: "terminal",
    subcategory: "laptop",
    archetype: "laptop-pro",
    usage: {
        usage_location: "WOR",
    }
};

export async function getUserDeviceImpact(deviceSubCategory, yearly = false) {

  device.subcategory = deviceSubCategory

  let res;
  if (yearly) {
    res = await post(device.category + "/" + device.subcategory + "?criteria=gwp&criteria=ir&criteria=pe&criteria=adpe&criteria=odp&criteria=ap&criteria=ept" + "&duration=8760&archetype=" + device.archetype, device);
  } else {
    res = await post(device.category + "/" + device.subcategory + "?criteria=gwp&criteria=ir&criteria=pe&criteria=adpe&criteria=odp&criteria=ap&criteria=ept" + "&archetype=" + device.archetype, device);
  }
  return res.text().then((json) => {
    return JSON.parse(json);
  });
}
