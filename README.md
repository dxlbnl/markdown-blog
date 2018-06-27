# markdown-blog

```bash
yarn
yarn run dev
```

## CI process

```bash
yarn
yarn run build
zip export
upload zip to nginx proxy or put it into dir.
```

## Domain management
? 

domain = static.dxlb.nl (bare should resolve some listing including all deployed branches/prs)
Master -> {name}.{domain}
Branch -> {name}.{branch}.{domain}
PR -> {name}-{pr}.{domain}