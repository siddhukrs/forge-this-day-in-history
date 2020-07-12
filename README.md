# This Issue is Ancient!

This project contains a Forge app written in Javascript that displays a timeline of what the world has been through since an issue was filed.

See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

- Clone this repository and install the node application by running:
```
npm install
```

- Build and deploy the app by running:
```
forge deploy
```

- Install the app in an Atlassian site by running:
```
forge install
```

- Modify and develop the app by running `forge tunnel` to proxy invocations locally:
```
forge tunnel
```

### Notes
- Use the `forge deploy` command when you want to persist code changes.
- Use the `forge install` command when you want to install the app on a new site.
- Once the app is installed on a site, the site picks up the new app changes you deploy without needing to rerun the install command.

## Support

See [Get help](https://developer.atlassian.com/platform/forge/get-help/) for how to get help.
