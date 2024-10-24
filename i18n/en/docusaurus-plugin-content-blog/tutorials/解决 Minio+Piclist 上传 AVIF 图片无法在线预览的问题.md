---
slug: minioavif
title: Solving the Issue of AVIF Image Uploads Not Being Previewed Online with Minio+Piclist
date: 2024-10-19 01:59
authors: lian
tags: [Minio, Piclist, Avif]
keywords: [Tutorial]
image: https://oss.darklotus.cn/img/2024/10/16/202410162053664.png
---

Setting up Piclist with Mini can solve the issue of AVIF images uploaded to Minio not being previewed online.

<!-- truncate -->

The following tutorial is unnecessary; I’m leaving it here to show how I went from failure to success.

The CDN method didn’t work. It seemed successful, but you would find that the XML page also turned into an image, and all the request headers were overridden.

So, it’s essential to set it during the upload phase. I researched what MIME actually means.

[Common MIME Types](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/MIME_types/Common_types)

After reading it, I realized that Piclist already supports this. I have learned it and successfully solved the problem, so everyone can learn with confidence!

## Custom MIME

In the custom MIME format of Piclist, ext1, ext2, ext3, etc., represent file extensions. Each extension is followed by a colon and its corresponding MIME type. Specifically:

- ext1: The first file extension, such as jpg, png, avif, etc.
- mime1: The MIME type corresponding to ext1, such as image/jpeg, image/png, image/avif, etc.

Thus, the entire format structure is:
ext1:mime1|ext2:mime2|ext3:mime3

For example, if you want to add MIME types for .jpg, .png, and .avif, you can write:

```
jpg:image/jpeg|png:image/png|avif:image/avif
```

This way, jpg files will be recognized as image/jpeg, png files as image/png, and avif files as image/avif.

This is just an example; Minio itself already supports jpg and png, so you only need to add the unsupported formats.

I only want to solve the online preview for avif, so I just filled in:
```
avif:image/avif
```
And that’s it.

## Problem Description

I am using Minio+Piclist to upload images. When uploading AVIF format images, most URLs directly download the file instead of allowing online preview. However, I found some images that could be previewed after uploading, which confused me. I searched online but couldn’t find a solution. I didn’t understand what custom MIME meant, and I couldn’t find the relevant settings for Content-Type in the Piclist configuration file.

I asked GPT, and the response was that, in simple terms, the online preview is determined by the HTTP headers, and it is necessary to add the Content-Type value as image/avif.

This way, browsers that support online preview for AVIF will receive this response header and display it as a preview instead of downloading the file.

I could find the header for the AVIF images that could be previewed after uploading.

## Checking Headers

The following image link is one of those images that I uploaded and it mysteriously had the correct headers, but Piclist uploads AVIF without this header. So what to do?

Use the curl command to check:

```
curl -I https://oss.darklotus.cn/img/2024/09/25/202409250237596.avif
```

You get:
![](https://oss.darklotus.cn/img/2024/10/19/WX20241019-015048@2x.avif)
It shows content-type: image/avif, which means success.

## ~~Solution~~

~~Since I couldn’t find a solution in the upload API (I really don’t know how and it’s quite troublesome), I thought I could manipulate it at the CDN level.~~

~~So, I added the header name in my CDN’s HTTP headers - response headers:~~

~~Content-Type~~

~~With the value of:~~

~~image/avif~~

~~This directly solved the problem.~~

~~This image: https://oss.darklotus.cn/img/2024/09/30/QmbiPWS5eCMew41RHPrwVc2suPqdyuGJkHYBycP9ihj5r9.avif is the one I mentioned that couldn’t be previewed online, but by customizing the header in the CDN, it can now be previewed.~~

~~As long as it’s a file format that browsers support for online preview, this method can solve the issue. Most formats are supported; it’s just that new technologies haven’t caught up yet.~~

Finally, I recommend a helpful article that suggests solving it during the upload phase, but I couldn’t understand it, and it’s not convenient. I’ll just see if Piclist improves. I’ve tried several OSS software tools, and Piclist is the most comfortable to use.

[Preview Issue with MinIO File Uploads](https://blog.csdn.net/qq_44038822/article/details/138656016)