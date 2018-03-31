# Change Log

All notable changes to this project will be documented in this file.

## [4.0.3] - 2017-08-20

### Added

*   [Abstracted storage](https://github.com/tribou/react-template/compare/v4.0.2...v4.0.3?diff=unified&name=v4.0.3#diff-97d516edbfdbe5ef31183f2c0c93ba14) into `src/helpers/storage`, so we can easily add a
    `storage.ios` (it keeps the same API as `AsyncStorage`
*   [Added a
    `<RequireAuth>`](https://github.com/tribou/react-template/compare/v4.0.2...v4.0.3?diff=unified&name=v4.0.3#diff-43f7ad15b260e32a3cc0dd871037b798R34)
    component which makes it easy to require auth for an entire page (just by
    adding `<RequireAuth />`) or for an individual element (passing via children
    `<RequireAuth><LogoutButton /></RequireAuth>`) The catch is we _have_ to use
    the `store.auth.token` to detect if we’re logged in or not, so we have to
    move side effects (i.e. redirects) into epics or the view Container (see
    login redirect details below)
*   Added some good test examples for `<RequireAuth>` and `<Modal>`

### Changed

*   Because of the [new storage
    API](https://github.com/tribou/react-template/compare/v4.0.2...v4.0.3?diff=unified&name=v4.0.3#diff-6b578866dcf5f1e9f44077b1770780b7),
    I converted all the API helpers to async (Promises)
*   [Upgraded to Flow
    v0.53.1](https://github.com/tribou/react-template/compare/v4.0.2...v4.0.3?diff=unified&name=v4.0.3#diff-401fb3cc54401cea1ad7cec3b862224e)
    which includes switching to the new `<Props>` notation for React components
    (note the TODO about the `eslint-plugin-react` issue
*   [Simplified the `<Modal>`
    template](https://github.com/tribou/react-template/compare/v4.0.2...v4.0.3?diff=unified&name=v4.0.3#diff-16381ec4c7a5426d0eae3d2dd1eb5d64)
    by embracing the React API. I also added the standard for query param
    modals: `?m=login` instead of `?login=true`/`?login` since the latter was
    leaky. It’s also [easier to add
    modals](https://github.com/tribou/react-template/compare/v4.0.2...v4.0.3?diff=unified&name=v4.0.3#diff-16381ec4c7a5426d0eae3d2dd1eb5d64R27)
    now using a `modals` object definition instead of `if/else` or `switch`
*   [Moved the login
    redirect](https://github.com/tribou/react-template/compare/v4.0.2...v4.0.3?diff=unified&name=v4.0.3#diff-385bdc87af3af936d7f51556f70b2556R36)
    out of the action creator and into the Container. I think this makes the
    most sense from now on since `history` can be passed via props in RR4
    (alternative would be to use `redux-observable` for centralized config if we
    ever need it…)
*   Upgraded to ESLint v4

### Maintenance

*   Dependency upgrades.

[4.0.3]: https://github.com/tribou/eslint-plugin-tribou/compare/v4.0.2...v4.0.3
