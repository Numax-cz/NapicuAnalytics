# NapicuAnalytics
## Informace
* Nutné mít přístup k ip
* 1 záznam na 1 ip (v 0:00 se vymaže se seznamu)
* V 0:00 se mažou ip ze seznamu a zapisují se data do databáze
***
## Instalace
* instalace balíčku 
```
npm i
```

### .env 
* PORT= Port na kterém poběží aplikace
* HOST= DB Host
* USERKOKOT= DB User
* DB= DB 
* PASSWORD= DB Password
* SN1= Session key1
* SN2= Session key2
* USERLOGIN= User pro vstup do panelu 
* USERPASS= Password pro vstup do panelu 


### Nutné vložit tento kód na stránku kterou chcete sledovat
```javascript
const xhttp = new XMLHttpRequest();
xhttp.open("POST", "https://MOJEDOMENA/api/counter", true);
xhttp.send();
```
***
## Doporučená Databáze
```sql
CREATE TABLE `analytics` (
  `id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `date` text CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```
***

## Použité balíčky
* cookie-session@1.4.0
* cron@1.8.2
* dataformat@1.0.0
* dotenv@9.0.0
* ejs@3.1.6
* express@4.17.1
* mysql@2.18.1
* nodemon@2.0.7