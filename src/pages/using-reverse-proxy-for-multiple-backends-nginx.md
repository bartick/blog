---
layout: '../layouts/MarkdownLayout.astro'
title: Using Reverse Proxy for multiple backends - Nginx
description: Join me in the world of backend development, where I grapple with the demands of managing a variety of backend projects. When these projects make their way to the live environment, the necessity arises to open specific ports, like the familiar 80 or 443, to facilitate user access. However, as a student, the challenge of juggling numerous projects looms large, exacerbated by the financial constraints that prevent me from obtaining separate Virtual Private Servers (VPS) for each endeavor. This intriguing dilemma has been a persistent ponderance on my journey.
tags: [nginx,reverse-proxy,backend,server,web,website,html,css,javascript,ubuntu,linux,cerbot,ssl,tls,https]
image: /images/Blog.png
date: 2023-09-05T05:09:05.491Z
author: bartick
robots: index, follow
meta:
    - name: og:type
      content: website
    - name: og:site_name
      content: Bartick's Blog
    - name: og:locale
      content: en_US
    - name: og:locale:alternate
      content: es_ES
    - name: twitter:card
      content: summary_large_image
    - name: twitter:site
      content: '@@BartickM'
    - name: twitter:creator
      content: '@@BartickM'
    - name: twitter:title
      content: Using Reverse Proxy for multiple backends - Nginx
    - name: twitter:description
      content: Join me in the world of backend development, where I grapple with the demands of managing a variety of backend projects. When these projects make their way to the live environment, the necessity arises to open specific ports, like the familiar 80 or 443, to facilitate user access. However, as a student, the challenge of juggling numerous projects looms large, exacerbated by the financial constraints that prevent me from obtaining separate Virtual Private Servers (VPS) for each endeavor. This intriguing dilemma has been a persistent ponderance on my journey.
---

I work as a backend developer, and that means I handle various backend projects. When these projects go live, we usually need to open specific ports, like 80 or 443, so that users can access them.

As a student, I often have multiple projects to manage, but I don't have the financial means to pay for separate Virtual Private Servers (VPS) to host each project. This dilemma has been on my mind for quite some time.

After doing some research online, I came across a solution: using a reverse proxy. With the VPS I already have, I can now host multiple projects and employ a reverse proxy to guide users to the correct project based on the web address they use. This discovery has opened up a cost-effective way to manage all my projects efficiently.

In this article, I will show you how I use a reverse proxy to host multiple projects on a single VPS. And I will use Nginx as my reverse proxy.

## What is a reverse proxy?

A reverse proxy is a server or software application that acts as an intermediary between client devices and one or more backend servers. It receives requests from clients (such as web browsers) and forwards those requests to the appropriate backend server. When the backend server responds, the reverse proxy then sends the response back to the client.

![Reverse Proxy](/images/posts/reverse-proxy.png)

## Why use a reverse proxy?

There are many reasons why you might want to use a reverse proxy. Here are some of the most common ones:

 - **Load Balancing:** They distribute incoming requests across multiple backend servers, helping to distribute traffic evenly and prevent server overload.

 - **Security:** They can hide the internal architecture of a network by only exposing the reverse proxy to the internet. This adds a layer of security, as the backend servers' details are hidden.

 - **Caching:** Reverse proxies can cache static content, reducing the load on backend servers and improving performance.

 - **SSL/TLS Termination:** They can handle SSL/TLS encryption and decryption, offloading this processing from backend servers.

 - **Content Compression:** They can compress responses before sending them to clients, reducing data transfer times.

## Let's get started

### Prerequisites

 - A VPS with a static IP address
 - A domain name
 - A basic understanding of how to use the command line

### Step 1: Install Nginx

Nginx is a popular web server that can also be used as a reverse proxy. It is free and open-source software, and it is available for most operating systems.

To install Nginx on Ubuntu, run the following command:

```bash
sudo apt install nginx
```

### Step 2: Start Nginx 

Once Nginx is installed, you can start it using the following command and potentially check if it was installed properly or not:

```bash
sudo systemctl start nginx
sudo systemctl status nginx
```

Now go to your browser and type your VPS IP address if Nginx is running properly you should see the following page:

![Nginx Welcome Page](/images/posts/nginx-welcome-page.png)

If it's not reachable, you may need to open port 80 on your firewall. You can do this by running the following command:

```bash
sudo ufw allow 80
```

### Step 3: Configure Nginx for multiple backends

Before we can use Nginx as a reverse proxy, host your projects on your VPS on internal non-exposed ports (e.g. 3000, 5000, 8000, etc.). Then, create a new file in the `/etc/nginx/sites-available` directory called `yourdomain.com` and add the following content:

In this example, I will use the domain `yourdomain.com` and the port `3000` for the backend server.

```
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

This configuration tells Nginx to listen on port 80 for requests to `yourdomain.com`. When it receives a request, it will forward it to the backend server running on port 3000.

### Optional: Configure SSL/TLS

If you want to use SSL/TLS encryption, you can add the following lines to the configuration file:

```
server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /path/to/yourdomain.com.crt;
    ssl_certificate_key /path/to/yourdomain.com.key;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

To generate an ssl certificate you can use Let's Encrypt. You can find more information about how to do this [here](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04).


### Step 4: Enable the new configuration

Once you have created the new configuration file, you need to enable it by creating a symbolic link in the `/etc/nginx/sites-enabled` directory. You can do this by running the following command:

```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
```

### Step 5: Test the configuration

Before you can use the new configuration, you need to test it to make sure it is valid. You can do this by running the following command:

```bash
sudo nginx -t
```

If the configuration is valid, you should see the following output:

```bash
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

If you see any errors, you will need to fix them before you can continue.

### Step 6: Restart Nginx

Once you have tested the configuration, you can restart Nginx to apply the changes. You can do this by running the following command:

```bash
sudo systemctl reload nginx
```

### Step 7: Configure your domain name

Now that you have configured Nginx, you need to configure your domain name to point to your VPS. You can do this by adding an A record to your domain name's DNS settings. The A record should point to your VPS's IP address.

### Step 8: Test the configuration

Once you have configured your domain name, you can test the configuration by visiting your domain name in your browser. If everything is working correctly, you should see your project running on your VPS.

## Conclusion

In this article, I have shown you how to use a reverse proxy to host multiple projects on a single VPS. I hope you have found this article useful. If you have any questions or suggestions, feel free to reach out to me on [Twitter](https://twitter.com/BartickM).