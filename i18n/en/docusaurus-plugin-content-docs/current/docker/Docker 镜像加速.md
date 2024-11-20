---
id: docker-rush 
slug: rush 
sidebar_position: 100 
title: Docker Image Acceleration
description: Docker image acceleration 
sidebar_label: Docker Image Acceleration
date: 2024-10-27
authors: lian
tags: [docker]
keywords: [docker]

---
## Exclusive Acceleration

The image acceleration address provided by this site: https://docker.kisskiss.store

- This is a labor of love. Please use it discreetly and do not promote it!
- This site will not charge any fees for this service!
- A good open-source environment requires everyone's joint maintenance!
- This site will not be responsible for any actions of users who use this acceleration service!
- Using it means you accept the above terms!

## Domestic Major Service Providers
* [Alibaba Cloud Accelerator (Click on the Management Console -> Log in to your account (Taobao account) -> On the left side, select Image Tools -> Image Accelerator -> Copy the accelerator address)](https://cr.console.aliyun.com/cn-hangzhou/instances)
* [NetEase Cloud Accelerator `https://hub-mirror.c.163.com`](https://www.163yun.com/help/documents/56918246390157312)
* [Baidu Cloud Accelerator `https://mirror.baidubce.com`](https://cloud.baidu.com/doc/CCE/s/Yjxppt74z#UsingDockerHubAccelerator)

> Domestic major cloud service providers (Tencent Cloud, Alibaba Cloud, Baidu Cloud) all provide Docker image acceleration services. It is recommended to select the corresponding image acceleration service according to the cloud platform on which Docker is running. For specific details, please refer to the last subsection of this page.

## Configuration Methods

We will take the [NetEase Cloud](https://www.163yun.com/) image service `https://hub-mirror.c.163.com` as an example for introduction.

### Ubuntu 16.04+, Debian 8+, CentOS 7+

Currently, mainstream Linux distributions have all adopted [systemd](https://systemd.io/) for service management. Here is how to configure the image accelerator in Linux distributions that use systemd.

Please first execute the following command to check whether the image address has been configured in the `docker.service` file.

```bash
$ systemctl cat docker | grep '--registry-mirror'
```

If the command has an output, then please execute `$ systemctl cat docker` to find the position where `ExecStart=` appears, modify the corresponding file content to remove the `--registry-mirror` parameter and its value, and then follow the next steps for configuration.

If the above command has no output, then you can write the following content in `/etc/docker/daemon.json` (if the file does not exist, please create it anew):

```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```

> Note that you must ensure that the file complies with the JSON specification; otherwise, Docker will not be able to start.

After that, restart the service.

```bash
$ sudo systemctl daemon-reload
$ sudo systemctl restart docker
```

### Windows 10

For users using `Windows 10`, right-click on the Docker icon in the taskbar tray and select `Settings` from the menu. After opening the configuration window, select `Docker Engine` from the left navigation menu. On the right side, edit the JSON file as shown below, and then click `Apply & Restart`. Docker will restart and apply the configured image address.

```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```

### macOS

For users using macOS, click on the Docker Desktop application icon on the taskbar -> `Settings...`. In the left navigation menu, select `Docker Engine`. On the right side, edit the JSON file as shown below. After the modification is completed, click the `Apply & restart` button. Docker will restart and apply the configured image address.

```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```

## Checking if the Accelerator Is Effective

Execute `$ docker info`. If you see the following content in the result, it means the configuration is successful.

```bash
Registry Mirrors:
 https://hub-mirror.c.163.com/
```

## `k8s.gcr.io` Images

You can log in to the [Alibaba Cloud Container Image Service](https://www.aliyun.com/product/acr?source=5176.11533457&userCode=8lx5zmtu&type=copy) **Image Center** -> **Image Search** to search.

For example, the `k8s.gcr.io/coredns:1.6.7` image can be replaced by `registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.6.7`.

In general, there is the following correspondence:

```bash
# $ docker pull k8s.gcr.io/xxx

$ docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/xxx
```

## Images No Longer in Service

Some images are no longer in service. Adding useless image accelerators will slow down the image pulling speed. You can remove them from the image configuration list.

* https://dockerhub.azk8s.cn **Has been made private**
* https://reg-mirror.qiniu.com
* https://registry.docker-cn.com

It is recommended to **watch (in the upper right corner of the page)** the [Docker Registry CN Mirror Test](https://github.com/docker-practice/docker-registry-cn-mirror-test) GitHub repository. We will update the status of each image address here.

## Cloud Service Providers

Some cloud service providers offer image services that are **for internal use only**. You can choose them when your Docker is running on a cloud platform.

* [Azure China Image `https://dockerhub.azk8s.cn`](https://github.com/Azure/container-service-for-azure-china/blob/master/aks/README.md#22-container-registry-proxy)

* [Tencent Cloud `https://mirror.ccs.tencentyun.com`](https://cloud.tencent.com/act/cps/redirect?redirect=10058&cps_key=3a5255852d5db99dcd5da4c72f05df61)