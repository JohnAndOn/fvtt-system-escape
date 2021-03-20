# Escape Game Foundry VTT System

The COVID-19 pandemic affected a lot of aspects of life, significantly impacting business models that require in-person interaction.  One industry that was heavily impacted was the escape room industry, which couldn't very well be locking groups of people into a confined area for a significant amount of time.  Many companies turned to digital alternatives, forging extermely creative solutions to this global crisis.  I hope to contribute to this effort to allow more people the digital tools to run a certain type of online escape room that may feel much like a hosted point-and-click video game.

This game system utilizes Foundry VTT, and for maximum effect should be hosted on the Forge or some other self-hosting option.

## Installation

Add your installation instructions here.

## Development

### Prerequisites

In order to build this system, recent versions of `node` and `npm` are
required. Most likely using `yarn` also works but only `npm` is officially
supported. We recommend using the latest lts version of `node`, which is
`v14.15.5` at the time of writing. If you use `nvm` to manage your `node`
versions, you can simply run

```
nvm install
```

in the project's root directory.

You also need to install the the project's dependencies. To do so, run

```
npm install
```

### Building

You can build the project by running

```
npm run build
```

Alternatively, you can run

```
npm run build:watch
```

to watch for changes and automatically build as necessary.

### Linking the built project to Foundry VTT

In order to provide a fluent development experience, it is recommended to link
the built system to your local Foundry VTT installation's data folder. In
order to do so, first add a file called `foundryconfig.json` to the project root
with the following content:

```
{
  "dataPath": "/absolute/path/to/your/FoundryVTT/Data"
}
```

(if you are using Windows, make sure to use `\` as a path separator instead of
`/`)

Then run

```
npm run link-project
```

On Windows, creating symlinks requires administrator privileges so unfortunately
you need to run the above command in an administrator terminal for it to work.

### Running the tests

You can run the tests with the following command:

```
npm test
```
