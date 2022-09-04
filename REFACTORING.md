# Refactoring Notes

These notes are informal notes to keep track of the decisions I've made and what
lead me to them. I may delete them later, but I think it may be helpful to look
back on so keeping directly in the repo for now.

1. Moved everything plugin related to /src
2. Installed [web-ext](https://github.com/mozilla/web-ext), a node package
   created and maintained by Mozilla specifically to aid in the development of
   browser extensions
3. Set up scripts in `package.json` for starting chrome and firefox (firefox not
   working, but figured I may as well put it in there to try it out)
4. Added update-dependencies script as a nice way to conveniently update npm
   dependencies as they tend to get outdated rather quickly.

Determined need to use some type of utility for allowing importing. Likely will
eventually do something like Babel, but hoping for simplest and least impact to
existing design as possible.

Found a browser extension specific
[guide](https://johnjonesfour.com/2020/05/13/building-browser-extensions-with-webpack/)
for webpack. Going to attempt following this advice as a starting point.

1. Guide suggests structure of background/content/settings to hold the
   respective files. VSC's files aren't named this way, so begin with renaming
   the existing files to match their role in manifest.json
2. Changed file structure and names to loosely fit suggested guidelines, ensured
   everything was working through a fast series of manual tests
3. While restructuring, didn't really care for the proposed folder structure so
   tweaked slightly
4. Did not care for the number of dependencies, think I may be able to reduce
   them so I'm going to consult the official docs of webpack and see if I can
   apply webpack minimally
