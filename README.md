<p align="center">
  <a href="https://pr0nview.com"><img src="public/icons/pronview-logo.svg" width="300" alt="pr0nView logo"/></a>
</p>
<p align="center">
  <a href="https://quasar.dev"><img src="public/icons/quasar-logo.svg" width="100" alt="pr0nView logo" style="margin: 0 8px"/></a>
  <a href="https://www.electronjs.org/"><img src="public/icons/electron-logo.png" width="100" alt="pr0nView logo" style="margin: 0 8px"/></a>
</p>
<p align="center">
  The multimedia grid display system based on Quasar and Electron
  <br>
  <a href="https://github.com/pr0nView/pr0nview-releases/issues/new?template=bug.md">Report bug</a>
  ·
  <a href="https://github.com/pr0nView/pr0nview-releases/issues/new?template=feature.md&labels=feature">Request feature</a>
</p>

# Table of contents

- [Description](#description)
  - [Possible use-cases](#possible-use-cases)
- [Supported platforms](#supported-platforms)
- [Supported media](#supported-media)
- [Features in development](#features-in-development)
  - [Automatic updates](#automatic-updates)
  - [Initial Setup](#initial-setup)
  - [Playlists](#playlists)
  - [Tags and Models](#tags-and-models)
  - [Media Library](#media-library)
  - [FFMPEG Integration](#ffmpeg-integration)
  - [Non-HTML video support](#non-html-video-support)
  - [Image Browser with thumbnails](#image-browser-with-thumbnails)
  - [Local Database](#local-database)
- [Roadmap](#roadmap)
  - [Music-enabled Visualisations](#music-enabled-visualisations-vote)
  - [Watched Folders](#watched-folders-vote)
  - [AI integration](#ai-integration-vote)
  - [AI-enhanced Bulk Renaming](#ai-enhanced-bulk-renaming-vote)
  - [Video Conversion](#video-conversion-vote)
  - [Layout Builder](#layout-builder-vote)
  - [Linux Support](#linux-support-vote)
- [Privacy](#privacy)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Creators](#creators)
- [Copyright and license](#copyright-and-license)


# Donations

**pr0nView** is released under the GNU Public License. We rely on donations to keep the project open-source and free from ads. To contribute financially to its development, you can use [PayPal](https://www.paypal.com/donate/?hosted_button_id=B4RCXADZAJ4JN) or [Patreon](patreon.com/pr0nView).
<p align="center">
  <a href="https://www.paypal.com/donate/?hosted_button_id=B4RCXADZAJ4JN"><img src="public/donate.png" width="130" alt="pr0nView logo"/></a>
  <a href="patreon.com/pr0nView"><img src="public/patreon.png" width="130" alt="pr0nView logo"/></a>
</p>

# Description

**pr0nView** is a desktop application for Windows and Mac that allows the user to display multiple locally-stored videos and images at the same time in an intuitive and simple interface. It supports drag-and-drop of files from the filesystem, as well as browsing for images and videos directly from the players. Several possible layouts of video and image grids are already included. Quality of life functionality includes

- Only playing the audio of one video at a time using your mouse or keyboard shortcut
- Adding multiple files to each "player" element that are played sequentially or randomly
- Choose a new video or image from the player's playlist to view next
- Control all video volume with a single slider so you don't have to manually adjust each one (although this is also possible)
- Set up a Panic Button (also known as a Bosskey) shortcut that instantly stops all **pr0nView** content and displays a user-customisable screen.
- A **Focus Mode** that will hide most UI elements for use on large displays

## Possible use-cases
1. Viewing your own local files
2. Multimedia presentations
3. Unattended DJ and entertainer displays

# Supported platforms

Currently **pr0nView** supports Windows and Mac computers (x64 and Apple Silicon). Support for **Linux** is in the [roadmap](#roadmap)

# Supported media

As **pr0nView** runs as a browser using Electron it currently only supports media that are compatible with the HTML standard.

> **Supported video formats:** MP4, FLV, AVI, OGG, WEBM

> **Supported image formats:** JPG, BMP, PNG, WEBM

Additional formats, such as **MKV** and **MOV**, will be added in future.

# Features in development

Active development is taking place on many more functionality additions.

### Automatic Updates

If set up to do so, **pr0nView** can check for updates and alert the user if one is available. Updates will take place in-app, with no need to download a new installer file. All settings and data will be imported into the new version.

### Initial Setup

When launched for the first time, an intuitive wizard will allow the user to set up some defaults, such as file paths, watched folders, password and privacy settings, FFMPEG download, and OpenAI integration. In addition, the user can choose to import their current files into the [Media Library](#media-library).

### Playlists

You will be able to create video and image playlists and manage them in a separate view. These playlists can then easily be loaded into the grid display with two clicks.

### Tags and Models

Each video or image file can be tagged with user-nominated words (for example *WHITE* or **). In addition, you can assign models and other categories to media for later filtering and searching. You'll be able to create automatic playlists based on tags and/or models.

### Media Library

All files imported (or dragged-and-dropped) will be added to a Media Library that can be browsed, with thumbnails and previews for videos, as well as meta information like duration, video codec, audio codec, framerate, and so on.

### FFMPEG Integration

In order to support many more video formats in the player and converter, FFMPEG integration will be developed. Initial setup and tests are complete and the feature will be rolled out soon.

### Non-HTML video support

Work is proceeding on streaming MKV and other non-HTML video formats using FFMPEG and NodeJS Media Server. Formats that cannot be played back natively by HTML will be streamed to the video instance using either FLV or HSL.

### Image Browser with thumbnails

Using a folder tree and thumbnail display, you will be able to browse through the files on your computer. This mimcs the behaviour of software such as IrfanView and ACDSee.

### Local Database

Integration with a local SQLite database is already complete. The database will contain all files, folders, tags, metadata, playlists, settings and other data. Storing these items in the database will allow for super-fast searching and filtering of files.

# Roadmap

The Roadmap contains features that are in the planning phase. You can vote on which feature you would prefer by going to our [website](https://pr0nview.com).

### Music-enabled Visualisations [vote](https://pr0nview.com/feature-vote?vote=visualisations)

Work has been started on creating **threejs**-based psychedelic visualisations that will respond to an audio input. This is particularly aimed at DJs and other entertainers. Visualisations will be displayed alongside other media, or on its own.

### Watched Folders [vote](https://pr0nview.com/feature-vote?vote=watched-folders)

Upon request, **pr0nView** can import new files found in selectable "watched folders". If new files are found, you can be prompted to rename, tag or catalogue them.

### AI integration [vote](https://pr0nview.com/feature-vote?vote=ai-integration)

**pr0nView** has the ability to use OpenAI's API to fetch metadata about a video or image (requires an OpenAI subscription and API key). This is useful when categorising or renaming media.

### AI-enhanced Bulk Renaming [vote](https://pr0nview.com/feature-vote?vote=renaming)

Using OpenAI, **pr0nView** can rename your files and/or move them to a selected folder. Users will be able to nominate a rename strategy (for example **filename-mp4-1080p-ac3-192khz.mp4** or **filename-tag-category-1920x1080.jpg**). **pr0nView** will share filenames and folder names with OpenAI to fill in any "gaps".

### Video Conversion [vote](https://pr0nview.com/feature-vote?vote=video-conversion)

As part of the FFMPEG integration, a standalone video converter (similar to Handbrake) will be developed that will allow the user to convert from one media format to another. This can be useful to make sure the video will play back smoothly with low overhead.

### Layout Builder [vote](https://pr0nview.com/feature-vote?vote=layout-builder)

While 5 layouts come pre-packaged with **pr0nView**, functionality will be developed for users to create their own mixed-media layouts.

### Linux Support [vote](https://pr0nview.com/feature-vote?vote=linux)

If appetite exists, **pr0nView** will be distributed as a Linux app in addition to Windows and Mac.

# Releases

You can find the list of pre-built binaries [here](https://github.com/pr0nView/pr0nview-releases/releases).

> Latest release is [**v0.0.4-beta**](https://github.com/pr0nView/pr0nview-releases/releases/tag/v0.0.4-beta).

# Privacy

The developers of **pr0nView** take your privacy very seriously. The software installation can be protected with a password and can be customised not to access any outside servers or sites. One exception to this rule is to check for updates to the app, which can be managed manually or set according to rules specified by the user. **pr0nView** will **always** ask for permission before accessing the internet. No data is shared between the software and the **pr0nView** server unless explicitly allowed.

# Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://reponame/blob/master/CONTRIBUTING.md) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://reponame/issues/new).

# Creators

**pr0nView** is made with ♥ by [Dominic Lee](https://github.com/dominicLee) of [Radical Media](https://www.radicalmedia.co.za).

## Copyright and license

Code and documentation copyright 2025 the authors.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the [GNU General Public License](https://www.gnu.org/licenses/) for more details.
