---
id: docker-install-debian # Unique ID
slug: debian # URL (up to three levels, for SEO and understanding, following the doc/resource/specific description principle)
sidebar_position: 1  # Controls the display order of this document in the sidebar
title: Debian
description: Installing Docker on Debian # Description
date: 2024-10-27
authors: lian
tags: [docker,debian]
keywords: [docker,debian]

---

## Preparation

### System Requirements

Docker supports the following versions of the [Debian](https://www.debian.org/intro/about) operating system:

* Debian Bullseye 11
* Debian Buster 10

### Uninstall Old Versions

Old versions of Docker are referred to as `docker` or `docker-engine`. Use the following command to uninstall old versions:

```bash
$ sudo apt-get remove docker \
               docker-engine \
               docker.io
```

## Install Using APT

Since the APT source uses HTTPS to ensure that the software download process is not tampered with, we first need to add the packages for using HTTPS and CA certificates.

```bash
$ sudo apt-get update

$ sudo apt-get install \
     apt-transport-https \
     ca-certificates \
     curl \
     gnupg \
     lsb-release
```

Due to network issues in some regions, it is strongly recommended to use domestic sources; please refer to the comments for the official source.

To verify the legitimacy of the downloaded packages, we need to add the GPG key for the software source.

```bash
$ curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Official source
# $ curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

Next, we need to add the Docker software source to `sources.list`:

> In some Debian-based Linux distributions, `$(lsb_release -cs)` may not return the Debian version code, such as in [Kali Linux](https://www.kali.org/docs/policy/kali-linux-relationship-with-debian/) or [BunsenLabs Linux](https://www.bunsenlabs.org/). In these distributions, we need to replace `$(lsb_release -cs)` in the command below with the supported Debian version code from https://mirrors.aliyun.com/docker-ce/linux/debian/dists/, such as `buster`.

```bash
$ echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Official source
# $ echo \
#   "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
#   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

>The above command will add the stable version of the Docker APT source. If you need the test version of Docker, please change `stable` to `test`. Debian 11 may not use `/etc/apt/keyrings/`; if you encounter a GPG error, consider switching to `/etc/apt/trusted.gpg.d`, see [issue 15727](https://github.com/docker/docs/issues/15727).

### Install Docker

Update the APT package cache and install `docker-ce`.

```bash
$ sudo apt-get update

$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

## Automatic Installation Using Script

In testing or development environments, Docker provides a convenient installation script to simplify the installation process. This script can be used on Debian systems, and you can also use the `--mirror` option to install from domestic sources:

> If you want to install the test version of Docker, please get the script from test.docker.com.

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

## Reference Documentation

* [Docker Official Debian Installation Documentation](https://docs.docker.com/install/linux/docker-ce/debian/)
