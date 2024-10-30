---
id: docker-install-centos # Unique ID
slug: centos # URL (up to three levels, for SEO and understanding, following the doc/resource/specific description item principle)
sidebar_position: 2  # Controls the display order of this document in the sidebar
title: CentOS
description: Installing Docker on CentOS # Description
date: 2024-10-27
authors: lian
tags: [docker, centos]
keywords: [docker, centos]

---
## Preparation

### System Requirements

Docker supports 64-bit versions of CentOS 7/8 and requires a kernel version of at least 3.10. CentOS 7 meets the minimum kernel requirement, but due to its lower kernel version, some features (such as the `overlay2` storage driver) may not be available, and some functionalities may be unstable.

### Uninstall Old Versions

Old versions of Docker are referred to as `docker` or `docker-engine`. Use the following command to uninstall old versions:

```bash
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
```

## Install Using yum

Execute the following command to install the dependency package:

```bash
$ sudo yum install -y yum-utils
```

Due to network issues in China, it is strongly recommended to use domestic sources. Please refer to the comments for the official source.

Execute the following command to add the `yum` software source:

```bash
$ sudo yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

$ sudo sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo

# Official source
# $ sudo yum-config-manager \
#     --add-repo \
#     https://download.docker.com/linux/centos/docker-ce.repo
```

If you need to install the test version of Docker, execute the following command:

```bash
$ sudo yum-config-manager --enable docker-ce-test
```

### Install Docker

Update the `yum` software source cache and install `docker-ce`.

```bash
$ sudo yum install docker-ce docker-ce-cli containerd.io
```

## Additional Settings for CentOS 8

Since CentOS 8 uses `nftables` for the firewall, but Docker does not yet support `nftables`, we can use the following settings to use `iptables`:

Change `/etc/firewalld/firewalld.conf`

```bash
# FirewallBackend=nftables
FirewallBackend=iptables
```

Or execute the following commands:

```bash
$ firewall-cmd --permanent --zone=trusted --add-interface=docker0

$ firewall-cmd --reload
```

## Use Script for Automatic Installation

To simplify the installation process, Docker provides a convenient installation script for testing or development environments. This script can be used on CentOS systems, and you can use the `--mirror` option to install from domestic sources:

> If you want to install the test version of Docker, please get the script from test.docker.com

```bash
# $ curl -fsSL test.docker.com -o get-docker.sh
$ curl -fsSL get.docker.com -o get-docker.sh
$ sudo sh get-docker.sh --mirror Aliyun
# $ sudo sh get-docker.sh --mirror AzureChinaCloud
```

After executing this command, the script will automatically prepare everything and install the stable version of Docker on the system.

## Start Docker

```bash
$ sudo systemctl enable docker
$ sudo systemctl start docker
```

## Create Docker User Group

By default, the `docker` command communicates with the Docker engine using a [Unix socket](https://en.wikipedia.org/wiki/Unix_domain_socket). Only the `root` user and users in the `docker` group can access the Docker engine's Unix socket. For security reasons, it is generally not advisable to use the `root` user directly on Linux systems. Therefore, it is better to add users who need to use Docker to the `docker` user group.

Create the `docker` group:

```bash
$ sudo groupadd docker
```

Add the current user to the `docker` group:

```bash
$ sudo usermod -aG docker $USER
```

Log out of the current terminal and log back in to perform the following test.

## Test if Docker is Installed Correctly

```bash
$ docker run --rm hello-world

Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
b8dfde127a29: Pull complete
Digest: sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

If the above information is displayed correctly, it indicates that the installation was successful.

## Add Kernel Parameters

If you see the following warning messages when using Docker on CentOS:

```bash
WARNING: bridge-nf-call-iptables is disabled
WARNING: bridge-nf-call-ip6tables is disabled
```

Please add kernel configuration parameters to enable these features.

```bash
$ sudo tee -a /etc/sysctl.conf <<-EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
```

Then reload `sysctl.conf`:

```bash
$ sudo sysctl -p
```

## Reference Documents

* [Docker Official CentOS Installation Documentation](https://docs.docker.com/install/linux/docker-ce/centos/).
* https://firewalld.org/2018/07/nftables-backend
* https://github.com/moby/libnetwork/issues/2496
```