# Roletapp — API dokumentacija

**sadržaj:**

# Schedule

**ScheduleObj**

```json
{
	"vrijeme": "7:00"
	"akcija": {
		"roleta": 1.0,
		"svjetlo": false,
	}
}
```

[0, 7] = [pon, ned] tj predstavlja broj dana u tjednu

Trebalo bi moći spremiti listu ovakvih rasporeda i onda kada dođe to vrijeme u odabranom danu postaviti uređaje na te vrijednosti.

`active` dali se trenutno primjenjuje ili ne

# Jednostavno paljenje - gašenje [WebSockets]

**odmah po spajanju treba poslati inicijalno stanje**

```json
{
	"event": "inicijalizacija",
	"svjetlo": false,
	"rotelta": 0.5,
	"zakazano": ScheduleObj
}
```

## Svjetlo

### app šalje

```json
{"event": "upali_svjetlo"} 
```

```json
{"event": "ugali_svjetlo"} 
```

### server šalje:

```json
{"event": "svjetlo", "content": true} 
```

- server odgovara postavljenim stanjem
    - true - svjetlo je upaljeno
    - false - svjetlo je ugašeno

## Roleta

### app šalje

```json
{"event": "postavi_roletu", "content": 0.5} 
```

### server šalje

```json
{"event": "roleta", "content": 0.1} 
```

- server odgovara postavljenim stanjem
    - true - rolta podignuta
    - false - roleta spuštena

# Odgođena akcija

### app šalje:

```json
{"event": "zakazi", "akcija": ScheduleObj}
```

### **server šalje:**

```json
{"event": "zakazano", "akcija": ScheduleObj} 
```

- vraća akciju koja je zakazana da se desi u budućnosti
    - e.g. u 7:00 roleta će se podići