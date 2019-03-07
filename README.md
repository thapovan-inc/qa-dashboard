# QA Dashboard

##### Add following entries to your hosts file before lighten up docker containers 
```
127.0.0.1	www.qa-dashboard.com
127.0.0.1	api.qa-dashboard.com
```

##### Run the project 
```
cd qa-dashboard
docker-compose up -d
```


## API to post test results

```
curl -X POST \
     http://api.qa-dashboard.com/v1/results \
     -H 'Content-Type: application/json' \
     -H 'cache-control: no-cache' \
     -H 'x-api-key: 52afed9e-50f4-457a-87c8-b6b109f319ac' \
     -d '{
   	"types": "FEATURE",
   	"env": "DEV",
   	"status": "pass",
   	"description": "testing second post request",
   	"report_url": "http://someurl1",
   	"sprint_name": "SPRINT-1",
   	"ticket_name": "WEB-25"
   }'
```

##### Required
    * API token is required
    * types | env | status | description | report_url are required field

## TYPES Available 
```
1) FEATURE
2) FEATURE
3) REGRESSION
```

## ENV Available 
```
1) DEV
2) QA
3) STAGING
4) PRODUCTION
```

## STATUS Available 
```
1) PASS
2) FAIL
3) ERROR
4) INPROGRESS
```
