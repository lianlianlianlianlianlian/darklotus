---
id: mac-neofetch 
slug: neofetch 
sidebar_position: 2 
title: Neofetch - A Tool for Displaying System Information
description: Neofetch is a tool for displaying system information. 
sidebar_label: Neofetch - A Tool for Displaying System Information
date: 2024-10-27
authors: lian
tags: [mac]
keywords: [mac]

---

`Neofetch` is a tool used to display system information in the terminal. It is usually used to present an overview of the system, including information about the operating system, kernel version, CPU, memory, installation time, etc. Its output is usually accompanied by an ASCII art graphic representing your operating system or other custom graphics. The following is a detailed guide on how to use `Neofetch` on macOS:

### Installing Neofetch

If you haven't installed `Neofetch` yet, you can install it using Homebrew:

```bash
brew install neofetch
```

### Basic Usage

After the installation is complete, you can run the following command in the terminal:

```bash
neofetch
```

This will display the system information along with the ASCII art graphic.

### Customizing Neofetch

`Neofetch` offers various customization options. You can change the output content and style by modifying the configuration file.

#### Configuration File

The configuration file is usually located at `~/.config/neofetch/config.conf`. If this file doesn't exist, you can generate the default configuration file by running the following command:

```bash
neofetch --config none
```

You can open and edit this file using any text editor, for example:

```bash
nano ~/.config/neofetch/config.conf
```

#### Modifying the Output Content

In the configuration file, you can set which information to display or hide. Here are some common settings:

- **Changing the ASCII Art**: You can select different ASCII graphics by modifying the `ascii_distro` variable.
- **Customizing Colors**: You can change the color of the output text by modifying the `color` variable.
- **Displaying or Hiding Information**: You can choose to display or hide certain information such as GPU, Shell, desktop environment, etc.

### Other Command Line Options

`Neofetch` also has some command line options that can be used directly:

- **Displaying Help Information**:
```bash
neofetch --help
```

### Example Output

![neofetch](../img/Neofetch.png)

### Summary

`Neofetch` is a very flexible and easy-to-use tool that can help you quickly view system information and customize the output. By modifying the configuration file and using the command line options, you can adjust the displayed content according to your own needs.