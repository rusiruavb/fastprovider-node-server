module.exports = {
  cluster: {
    name: "k8s-api-cluster",
    server: "https://k8s-api-cluster-dns-b2637095.hcp.eastasia.azmk8s.io:443",
  },
  user: {
    name: "clusterUser_k8s-api-cluster-rg_k8s-api-cluster",
    password:
      "5be088bffaea94b7b985c4c3aa210429c1ee368c552b86c76d49bac4e87f3a3033d04d6169e2826a7e0606e7f4f2647f7ebd307691d34fa1e3813ce90c791f57",
  },
  context: {
    name: "k8s-api-cluster",
    user: "clusterUser_k8s-api-cluster-rg_k8s-api-cluster",
    cluster: "k8s-api-cluster",
  },
};
