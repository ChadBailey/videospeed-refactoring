# Refactoring Notes

## TODO: Lists

### 1.0 MVP

- [ ] Get `.css`, `.html`, and `.json` files to compile into /dist
- [ ] Test to ensure working exactly as before
- [ ] Add test tooling
- [ ] Add tests to `package.json` via `npm test`
- [ ] Create series of initial tests

### 1.1

- [ ] Tightly couple `package.json` and `manifest.json` such that updates only
      happen in one location ensuring no state conflict.

## Notes

These notes are informal notes to keep track of the decisions I've made and what
lead me to them. I may delete them later, but I think it may be helpful to look
back on so keeping directly in the repo for now.

> As some context before I begin. I started this effort by trying out the
> template found here: <https://github.com/Debdut/browser-extension>. I ended up
> contributing a couple of PRs back to the project. I like a lot about it, but
> don't fully understand how it works. I think you will see that as this goes on
> I will adopt more of the practices used in this template as I understand and
> agree with them. If I find I don't agree with them, or find that they are
> unnecessary I will leave them out.

1. Moved everything plugin related to /src
2. Installed [web-ext](https://github.com/mozilla/web-ext), a node package
   created and maintained by Mozilla specifically to aid in the development of
   browser extensions
3. Set up scripts in `package.json` for starting chrome and firefox (firefox not
   working, but figured I may as well put it in there to try it out)
4. Added update-dependencies script as a nice way to conveniently update npm
   dependencies as they tend to get outdated rather quickly.

## File structure

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

## Parcel

While investigating different packers, discovered Parcel has a pretty nice web
extension
[@parcel/config-webextension](https://parceljs.org/recipes/web-extension/),
which also boasts zero-configuration. I'm going to give it a try and see what
happens.

> [Snowpack](https://www.snowpack.dev/) is notably missing any type of native
> web extension support that I could find (even through plugins). Webpack still
> seems most comprehensive, so I think there's a possibility that's where we
> land, but hoping Parcel may come through as a simpler solution.

1. Installed parcel via
   [these instructions](https://en.parceljs.org/getting_started.html) and npm
   global barfed. Countless deprecated, 22 vulnerabilities, 13 high severity.
   Yikes! Turns out the issue is due to the docs still being "in progress" for
   Parcel v2, but not starting off good for a "zero config" bundler. I am very
   skeptical of zero-config anything, since it usually means it's impossible to
   fix once it breaks.

   Uninstalled `npm -g uninstall parcel-bundler`, 0 vulnerabilities. Installed
   `npm install -g parcel`, much better but still using a deprecated package.

   > npm WARN deprecated stable@0.1.8: Modern JS already guarantees Array#sort()
   > is a stable sort, so this library is deprecated. See the compatibility
   > table on MDN:
   > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#browser_compatibility

   Ran as directed, got cryptic error. I want to like parcel, but not looking
   great

   ```bash
   [12:52 AM] ~/code/videospeed-refactoring (master) $ parcel build src/manifest.json --config @parcel/config-webextension
   | Building content.css...
   thread '<unnamed>' panicked at 'internal error: entered unreachable code', src\selector.rs:478:5
   note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
   [12:53 AM] ~/code/videospeed-refactoring (master) $ RUST_BACKTRACE=1 parcel build src/manifest.json --config @parcel/config-webextension
   / Building content.css...
   thread '<unnamed>' panicked at 'internal error: entered unreachable code', src\selector.rs:478:5
   - Building content.css...
   note: Some details are omitted, run with `RUST_BACKTRACE=full` for a verbose backtrace.
   [12:54 AM] ~/code/videospeed-refactoring (master) $ RUST_BACKTRACE=full parcel build src/manifest.json --config @parcel/config-webextension
   | Building content.css...
   thread '<unnamed>' panicked at 'internal error: entered unreachable code', src\selector.rs:478:5
   stack backtrace:
   0:     0x7ffbe334d032 - napi_register_module_v1
   1:     0x7ffbe30d8d8a - <unknown>
   2:     0x7ffbe3345729 - napi_register_module_v1
   3:     0x7ffbe334ea2b - napi_register_module_v1
   4:     0x7ffbe334f6be - napi_register_module_v1
   5:     0x7ffbe334f26a - napi_register_module_v1
   6:     0x7ffbe334f1f9 - napi_register_module_v1
   7:     0x7ffbe334f1b4 - napi_register_module_v1
   8:     0x7ffbe3353795 - napi_register_module_v1
   9:     0x7ffbe335388c - napi_register_module_v1
   10:     0x7ffbe332ae5d - napi_register_module_v1
   11:     0x7ffbe332b664 - napi_register_module_v1
   12:     0x7ffbe332a355 - napi_register_module_v1
   13:     0x7ffbe3328567 - napi_register_module_v1
   14:     0x7ffbe3327e7a - napi_register_module_v1
   15:     0x7ffbe3327946 - napi_register_module_v1
   16:     0x7ffbe3327093 - napi_register_module_v1
   17:     0x7ffbe32ea4ab - napi_register_module_v1
   18:     0x7ffbe32e7088 - napi_register_module_v1
   19:     0x7ffbe30ca08c - <unknown>
   20:     0x7ffbe30c9105 - <unknown>
   21:     0x7ff6eefcfb20 - node::Stop
   22:     0x7ff6ef9e3bed - v8::internal::Builtins::code
   23:     0x7ff6ef9e37f9 - v8::internal::Builtins::code
   24:     0x7ff6ef9e3abc - v8::internal::Builtins::code
   25:     0x7ff6ef9e3920 - v8::internal::Builtins::code
   26:     0x7ff6efac8801 - v8::internal::SetupIsolateDelegate::SetupHeap
   27:     0x7ff6efa4c114 - v8::internal::SetupIsolateDelegate::SetupHeap
   28:     0x7ff6efa80243 - v8::internal::SetupIsolateDelegate::SetupHeap
   29:     0x7ff6efb19035 - v8::internal::SetupIsolateDelegate::SetupHeap
   30:     0x7ff6efa7194c - v8::internal::SetupIsolateDelegate::SetupHeap
   31:     0x7ff6efa4a61b - v8::internal::SetupIsolateDelegate::SetupHeap
   32:     0x7ff6ef914c5a - v8::internal::Execution::CallWasm
   33:     0x7ff6ef914d7b - v8::internal::Execution::CallWasm
   34:     0x7ff6ef915b2a - v8::internal::Execution::TryCallScript
   35:     0x7ff6ef8ee6da - v8::internal::MicrotaskQueue::RunMicrotasks
   36:     0x7ff6ef8ee47a - v8::internal::MicrotaskQueue::PerformCheckpointInternal
   37:     0x7ff6ef037318 - node::CallbackScope::~CallbackScope
   38:     0x7ff6ef0377a0 - node::CallbackScope::~CallbackScope
   39:     0x7ff6ef02fcdf - v8::internal::compiler::Operator::EffectOutputCount
   40:     0x7ff6eef864e7 - v8::internal::MicrotaskQueue::GetMicrotasksScopeDepth
   41:     0x7ff6eef7948c - v8::base::CPU::has_fpu
   42:     0x7ff6ef06bca7 - uv_timer_stop
   43:     0x7ff6ef06824b - uv_async_send
   44:     0x7ff6ef0679dc - uv_loop_init
   45:     0x7ff6ef067b7a - uv_run
   46:     0x7ff6ef036ba5 - node::SpinEventLoop
   47:     0x7ff6eeeb7060 - v8::internal::interpreter::BytecodeLabel::bind
   48:     0x7ff6eeeb28a8 - v8::internal::interpreter::BytecodeLabel::bind
   49:     0x7ff6ef05824d - uv_poll_stop
   50:     0x7ff6f0016880 - v8::internal::compiler::ToString
   51:     0x7ffc4d1854e0 - BaseThreadInitThunk
   52:     0x7ffc4e3a485b - RtlUserThreadStart
   ```

2. Removed Parcel, think I'll stick with webpack `npm uninstall parcel`

## Webpack

I may have wasted a little time exploring, but at least I've come away with
better understanding. Legitimately trying out webpack now, I've just been
avoiding it since it can be difficult for me to understand how to mentally
translate between using for web apps and the browser extension context.

I found a
[webpack extension](https://github.com/rubenspgcavalcante/webpack-extension-reloader)
that may be helpful, but not going to attempt using it yet.

1. Install webpack `npm install webpack webpack-cli`
2. Used my best-guess minimum config, worked to produce the .js files only after
   some fiddling.
3. Getting warning that mode must be "development" or "production". Temporarily
   set to "production" due to some ambiguous cautionary tales in the generated
   JS saying to not use this in development _grumble_ (note: I do not like this
   design as I feel being forced to set to production when it's not devalues
   calling it production in the first place)
4. Installed build tools to streamline some of the build process
   1. `rimraf` to clean the `dist` dir before building
   2. `mkdirp` to create empty profile directories (in anticipation of creating
      sticky browser profiles)
5. Now need html, css, and .json files to transfer over.
