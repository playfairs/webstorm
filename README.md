# webstorm

Webhook testing CLI tool.

## Install

```bash
npm install -g
```

## Usage

```bash
webstorm spam <url> [options]
webstorm del <url> [options]
webstorm test <url> [options]
webstorm info <url> [options]
```

## Options

- `--threads <number>` - Concurrent requests (default: 10)
- `--delay <number>` - Delay between requests in ms (default: 1000)
- `--msg <text>` - Custom message payload
- `--json <file>` - Load JSON payload from file
- `--timeout <number>` - Request timeout in ms (default: 30000)

## Examples

```bash
webstorm test https://example.com/webhook
webstorm spam https://example.com/webhook --threads 20 --delay 500
webstorm del https://example.com/webhook --json payload.json
```

## other stuff

theres other commands too, just run webstorm without any extra shit and it'll tell u what to do 

###### ps.

if ur name is london, dont even bother trying to use this, its not in python so ur fuckass aint gon understand it loser