Basics
======

All dates are [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted
(with the "T"): ``2013-12-25T23:59:59Z``

Schedules
=========

Create a schedule
-----------------

**POST /api/schedules**

```JSON
{
    "name": "...",
    "description": "...",
    "dates": {
        "<date 1>": 5,
        "<date 2>": 9,
        "<date n>": 1
    }
}
```

Response:

201 Created
Location: http://.../api/schedules/ **ID**

Remove a schedule
-----------------

**DELETE /api/schedules/ID**

Response:

204 No Content


Signing up for dates
--------------------

**POST /api/schedules/ID**

To signup:

```JSON
{
    "user": "...",
    "items": [
        "<date 1>",
        "<date n>"
    ]
}
```

Response:

200 Ok


Changing a schedule
-------------------

**PUT /api/schedules/ID**

Overwrites a schedule entirely. Same payload as POST.

Response:

200 Ok


Events
======

Retreive an event
-----------------

**GET /api/events**

```JSON
{
    "name": "...",
    "date": "...",
    "description": "...",
    "items": {
        "<item name 1>": {
            "description": "small description",
            "pledged": 6,
            "need" : 10
        },
        "<item name 2>": {
            "description": "small description",
            "pledged": 6,
            "need" : 10
            },
        "<item name n>": {
            "description": "small description",
            "pledged": 6,
            "need" : 10
        }
    }
}
```

Create an event
---------------

**POST /api/events**

```JSON
{
    "name": "...",
    "date": "...",
    "description": "...",
    "items": {
        "<item name 1>": 5,
        "<item name 2>": 9,
        "<item name n>": 1
    }
}
```

Response:

201 Created
Location: http://.../api/events/ **ID**


Remove an event
---------------

**DELETE /api/events/ID**

Response:

204 No Content


Signing up for items
--------------------

**POST /api/events/ID**

To signup:

```JSON
{
    "user": "...",
    "items": {
        "<item name 1>": 2,
        "<item name n>": 1
    }
}
```

Response:

200 Ok


Changing an event
-----------------

**PUT /api/events/ID**

Overwrites an event entirely. Same payload as POST.

Response:

200 Ok
