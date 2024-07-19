<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/electrogram-project/electrogram">
    <img src="static/electrogram.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Electrogram</h3>

<p align="center">
    <a href="https://electrogram.deno.dev">View Website</a>
    ·
    <a href="https://github.com/electrogram-project/electrogram/issues">Report Bug</a>
    ·
    <a href="https://github.com/electrogram-project/electrogram/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#credits">Credits</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>

</ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project consists of a website and an integrated telegram bot.

The website is intended to collect links to telegram groups and to serve a small
student blog. It also contains a page to suggest new links and a contact page.

The Telegram bot organizes groups into multiple menus, based on their category.
category. The suggestion and contact pages can also be reached from the telegram
bot bot in the form of a mini-webapp. In addition, designated administrators
have access to reserved commands and can manage the groups' database directly
from the bot's interface.

### Built With

- [🦕 Deno](https://deno.land/)
- [🍋 Fresh](https://fresh.deno.dev/)
- [💨 Twind](https://twind.dev/)
- [🤖 grammY](https://grammy.dev/)
- [🌱 MongoDB](https://grammy.dev/)

### Deployed With

- [☁️ Deno Deploy](https://deno.com/deploy)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps:

### Prerequisites

Install Deno:

- MacOS/Linux

  ```sh
  curl -fsSL https://deno.land/install.sh | sh
  ```

- Windows

  ```sh
  irm https://deno.land/install.ps1 | iex
  ```

Set up environment variables in the .env file:

- Telegram bot token given by Bot Father

  ```sh
  TELEGRAM_BOT_TOKEN=""
  ```

- Website url

  ```sh
  WEBAPP_URL=""
  ```

- MongoDB connection string

  ```sh
  MONGO_URI=""
  ```

- Telegram channels IDs*

  ```sh
  ADMIN_GROUP_ID=""
  PUBLIC_GROUP_ID=""
  ```

_ADMIN_GROUP_ID is the telegram group where the bot sends the logs. All the
admins of this group have access to the bot's admin commands._

_PUBLIC_GROUP_ID is the telegram group where the bot announces the addition of a
new group._

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/electrogram-project/electrogram.git
   ```

2. Run Deno task

   ```sh
   deno task start
   ```

<!-- CONTRIBUTING -->

## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and
create a pull request. You can also simply open an issue with the tag
"enhancement". Don't forget to give the project a star! ⭐️

### Translations

The telegram bot menus can easily be translated into other languages by creating
a new file _.ftl_ file and adding it to the `telegram/locales` folder.

<!-- LICENSE -->

## License

Distributed under the Apache License 2.0. See `LICENSE.txt` for more
information.

<!-- CONTACT -->

## Contact

Electrogram team - <electrogram@pm.me>

Project Link:
[https://github.com/electrogram-project/electrogram](https://github.com/electrogram-project/electrogram)

## Credits

All icons used have been created by [Freepik](https://www.flaticon.com/)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

The repositories that helped this project:

- [grammY examples](https://github.com/grammyjs/examples)
- [Blogster Sleek](https://github.com/flexdinesh/blogster)
- [Best REAME template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[![Made with Fresh](https://fresh.deno.dev/fresh-badge-dark.svg)](https://fresh.deno.dev)
