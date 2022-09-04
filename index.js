const k8s = require("@kubernetes/client-node");
const express = require("express");
const cors = require("cors");
const {X509Certificate} = require("crypto")
const fs = require("fs")

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

const kc = new k8s.KubeConfig()
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

app.get("/", (_, res, next) => {
  res.status(200).json({ message: "Node JS server" })
  next()
})

app.post("/create/pv", (req, res, next) => {
  k8sApi.createPersistentVolume({
    apiVersion: "v1",
    metadata: {
      name: "docker-repo-pv"
    },
    spec: {
      capacity: { storage: "1Gi"},
      accessModes: ["ReadWriteOnce"],
      hostPath: {path: "/tmp/repository"}
    }
  })
    .then(data => {
      res.status(201).json({ data: data.body, response: data.response })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err: err.message })
    })
});

app.post("/create/pvc", (req, res, next) => {
  k8sApi.createNamespacedPersistentVolumeClaim("default", {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: {
      name: "docker-repo-pvc"
    },
    spec: {
      accessModes: ["ReadWriteOnce"],
      resources: {
        requests: { storage: "1Gi" }
      }
    }
  })
  .then(data => {
    res.status(201).json({ data: data.body, response: data.response })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err: err.message })
  })
})

app.get("/nodes", (req, res, next) => {
  k8sApi.listNode().then(data => {
    data.body.items.map(item => {
      console.log(item.status.addresses)
    })
    res.status(200).json({ data: data.body.items})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err: err.message })
  })
})

app.listen(8080, () => {
  console.log("Server started")
})

// k8sApi
//   .listNamespacedPod("default")
//   .then((res) => {
//     console.log(res.body.items);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// k8sApi.listServiceForAllNamespaces().then((data) => {
  // console.log(data.body.items);
  // const info = data.body.items.filter((item) => item.metadata.name === "nginx");
  // console.log(info);
  // data.body.items.map((item) => {
  //   console.log(item.spec);
  //   console.log(item.spec.externalIPs);
  // });
// });

// k8sApi.listNode()
