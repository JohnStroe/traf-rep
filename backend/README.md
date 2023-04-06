##  Backend documentation

Ingest headers should contain:
```angular2html
    "x-api-key": "magic-link"
```
where the **magicLink** is the registered uid from the client database

Ingest body shape:
```json
    {
      "ip_address": "ex: 90.45.123.34",
      "user_agent": "ex: Darwin/Chromium v8",
      "datetime": "access date"
    }
```