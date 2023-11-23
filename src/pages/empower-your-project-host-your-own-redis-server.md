---
layout: '../layouts/MarkdownLayout.astro'
title: "Empower your Project: Host your own redis server"
description: "Unlock the full potential of your projects with hassle-free Redis Server hosting! Say goodbye to performance bottlenecks and hello to seamless data management. Our user-friendly hosting solution makes it a breeze for you to enhance your project's speed and efficiency. Join the journey of simplified Redis hosting and take your projects to the next level!"
tags: []
image: /images/posts/Redis.jpg
date: 2023-11-23T06:23:17.780Z
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
      content: "Empower your Project: Host your own redis server"
    - name: twitter:description
      content: "Unlock the full potential of your projects with hassle-free Redis Server hosting! Say goodbye to performance bottlenecks and hello to seamless data management. Our user-friendly hosting solution makes it a breeze for you to enhance your project's speed and efficiency. Join the journey of simplified Redis hosting and take your projects to the next level!"
---

# Empower Your Project: Hosting Your Own Redis Server

As a student, I often find myself in search of free database options, and my go-to choices have always been those that offer a free tier. Many projects, in addition to a primary database, require Redis for streaming fast data. While cloud providers like [Redis](https://redis.com/try-free/) offer a free tier suitable for small projects or testing purposes, I've always desired more storage and power. This led me to the decision to host my own Redis server.

## Hosting Your Own Redis Server

Assuming you already have a VPS account, if not, you can consider providers such as:

- [Digital Ocean](https://www.digitalocean.com/)
- [Linode](https://www.linode.com/)
- [Vultr](https://www.vultr.com/)
- [AWS](https://aws.amazon.com/)
- [Google Cloud](https://cloud.google.com/)
- [Azure](https://azure.microsoft.com/en-us/)
- [Oracle Cloud](https://www.oracle.com/cloud/)

Personally, I use [Oracle Cloud](https://www.oracle.com/cloud/) with a VPS boasting 2GB RAM and 1 vCPU, running Ubuntu 20.04 LTS. You can choose any VPS provider and OS that suits your preferences.

### Installing Redis

To begin, we need to install Redis on our VPS. Execute the following commands:

```bash
sudo apt update
sudo apt install redis-server
```

### Configuring Redis

Next, we must configure Redis by editing the Redis config file. Run:

```bash
sudo nano /etc/redis/redis.conf
```

Within the file, locate the `supervised` directive, and change it to `systemd`:

```bash
. . .

# If you run Redis from upstart or systemd, Redis can interact with your
# supervision tree. Options:
#   supervised no      - no supervision interaction
#   supervised upstart - signal upstart by putting Redis into SIGSTOP mode
#   supervised systemd - signal systemd by writing READY=1 to $NOTIFY_SOCKET
#   supervised auto    - detect upstart or systemd method based on
#                        UPSTART_JOB or NOTIFY_SOCKET environment variables
# Note: these supervision methods only signal "process is ready."
#       They do not enable continuous liveness pings back to your supervisor.
supervised systemd
. . .
```

Save and close the file, then restart the Redis service:

```bash
sudo systemctl restart redis.service
```

### Allowing Remote Connections

By default, Redis is only accessible from the localhost. To permit remote connections, bind Redis to your server’s public IP address by editing the Redis configuration file again:

```bash
sudo nano /etc/redis/redis.conf
```

Comment out the `bind` directive:

```bash
. . .
# ~~~ WARNING ~~~ If the computer running Redis is directly exposed to the
# internet, binding to all the interfaces is dangerous and will expose the
# instance to everybody on the internet. So by default we uncomment the
# following bind directive, that will force Redis to listen only on the
# IPv4 loopback interface address (this means Redis will only be able to
# accept client connections from the same host that it is running on).
#
# IF YOU ARE SURE YOU WANT YOUR INSTANCE TO LISTEN TO ALL THE INTERFACES
# JUST COMMENT OUT THE FOLLOWING LINE.
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# bind 127.0.0.1 ::1
. . .
```

Additionally, change the `protected-mode` directive to `no`:

```bash
. . .
# The server only accepts connections from clients connecting from the
# IPv4 and IPv6 loopback addresses 127.0.0.1 and ::1, and from Unix domain
# sockets.
#
# By default protected mode is enabled. You should disable it only if
# you are sure you want clients from other hosts to connect to Redis
# even if no authentication is configured, nor a specific set of interfaces
# are explicitly listed using the "bind" directive.
protected-mode no
. . .
```

Restart the Redis server:

```bash
sudo systemctl restart redis.service
```

### Adjusting the Firewall

Now, configure the firewall to allow traffic on port 6379, the default Redis port:

```bash
sudo firewall-cmd --zone=public --permanent --add-port=6379/tcp
sudo firewall-cmd --reload
```

### Testing Redis

With Redis configured, test it by connecting to your application. For instance, using [mini-redis](https://github.com/bartick/mini-redis), a Rust-based Redis client. The URL for the Redis server is `redis://<ip>:6379`, where `<ip>` is your VPS's IP.

## Wow, it works but what about the security?

![Question](https://media.tenor.com/3VgYHvcS18MAAAAC/minion-any-questions-question.gif)

Although the Redis server is up, it lacks security. Anyone can connect and use it. To enhance security, follow these steps:

### Securing Redis

Connect to the Redis server using the CLI:

```bash
redis-cli
```

Change `protected-mode` from `no` to `yes`:

```bash
127.0.0.1:6379> CONFIG SET protected-mode yes
127.0.0.1:6379> CONFIG REWRITE
```

Now if we try to connect to the Redis server from our application.

```bash
cargo run
  Finished dev [unoptimized + debuginfo] target(s) in 0.10s
    Running `target/debug/tiny_redis`
thread 'main' panicked at src/main.rs:11:9:
Failed to set key: DENIED: Redis is running in protected mode because protected mode is enabled and no password is set for the default user. In this mode connections are only accepted from the loopback interface. If you want to connect from external computers to Redis you may adopt one of the following solutions: 1) Just disable protected mode sending the command 'CONFIG SET protected-mode no' from the loopback interface by connecting to Redis from the same host the server is running, however MAKE SURE Redis is not publicly accessible from internet if you do so. Use CONFIG REWRITE to make this change permanent. 2) Alternatively you can just disable the protected mode by editing the Redis configuration file, and setting the protected mode option to 'no', and then restarting the server. 3) If you started the server manually just for testing, restart it with the '--protected-mode no' option. 4) Set up an authentication password for the default user. NOTE: You only need to do one of the above things in order for the server to start accepting connections from the outside.
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

Well, it is throwing an error. Let's add a user and password to the Redis server.

To add a user and password, run:

```bash
127.0.0.1:6379> ACL SETUSER blog on >mypassword +@all -@dangerous ~*
127.0.0.1:6379> CONFIG REWRITE
```

This creates a user `blog` with the password `mypassword` and permissions, excluding dangerous commands. Update your URL to `redis://blog:mypassword@<ip>:6379`.

To know more about the permissions of Redis give it a read [here](https://docs.redis.com/latest/rc/security/access-control/data-access-control/configure-acls/#predefined-permissions).

Now, attempt to connect to the Redis server:

```bash
cargo run
  Finished dev [unoptimized + debuginfo] target(s) in 0.10s
    Running `target/debug/tiny_redis`
thread 'main' panicked at src/main.rs:11:9:
Failed to set key: DENIED: Redis is running in protected mode because protected mode is enabled and no password is set for the default user. In this mode connections are only accepted from the loopback interface. If you want to connect from external computers to Redis you may adopt one of the following solutions: 1) Just disable protected mode sending the command 'CONFIG SET protected-mode no' from the loopback interface by connecting to Redis from the same host the server is running, however MAKE SURE Redis is not publicly accessible from internet if you do so. Use CONFIG REWRITE to make this change permanent. 2) Alternatively you can just disable the protected mode by editing the Redis configuration file, and setting the protected mode option to 'no', and then restarting the server. 3) If you started the server manually just for testing, restart it with the '--protected-mode no' option. 4) Set up an authentication password for the default user. NOTE: You only need to do one of the above things in order for the server to start accepting connections from the outside.
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

Well it is still throwing an error. And it is because we still have the default user unprotected. So we need to protect the default user.


Let's protect the default user by running:

```bash
127.0.0.1:6379> ACL SETUSER default on >redis +@all ~*
127.0.0.1:6379> CONFIG REWRITE
```

Now, attempt to connect to the Redis server:

```bash
cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.03s
     Running `target/debug/tiny_redis`
Value: 42
```

Yay, it works. Now we have a secure Redis server running on our VPS. Now we can use it in our application. 

![Yeah](https://media.tenor.com/8zHzYq3eBVwAAAAd/baby-scream-yeah.gif)

