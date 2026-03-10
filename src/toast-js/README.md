# Vanilla JavaScript Toast Framework

This folder contains **3 reusable JavaScript components**:

1. `createToastStore.js`
- State container with `subscribe`, `add`, `remove`, and `clear`.

2. `createToastRenderer.js`
- DOM renderer that mounts toasts and supports corner positions.

3. `createToastApi.js`
- High-level API exposing `success`, `error`, `warning`, `info`, `setPosition`, and `clear`.

## Usage

```js
import { createToastApi } from "./toast-js/createToastApi";

const toast = createToastApi({ mountPoint: document.body, position: "top-right" });

toast.success("Saved successfully");
toast.error("Something failed", { duration: 5000 });
toast.warning("Needs attention", { autoDismiss: false });
toast.setPosition("bottom-left");
```

Use the CSS classes from `src/components/toast.css` (or copy them into your non-React project) for styling.
