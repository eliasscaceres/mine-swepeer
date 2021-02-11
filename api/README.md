# AWS Serverless Stack - AWS Lambda Functions & API Gateway 

## Description

This stack provisions a set of 20+ AWS Lambda Functions leveraged as a micro-services infrastructure and API Gateway Layer to expose the corresponding RESTful APIs endpoints for the consumers to manipulate and get the corresponding information from the Amazon Neptune Database.
 

## Pre-requisites

- Node (LTS version recommended: https://nodejs.org/en/)
- Serverless Framework CLI tool `npm global add serverless`
- AWS account with credentials (Easy 5 minute guide: https://serverless.com/framework/docs/providers/aws/guide/credentials/)
- Neptune database deployed (To deploy go to [neptune stack](https://github.com/southworks/ontario/tree/master/dev/resource-allocation-graph/neptune) )

## How To

This stack has dependencies so you'll need to run:
```sh
npm install
``` 
or
```sh
npm i
``` 

## Provision/Deprovision AWS Stack with Serverless Framework

1. Deploy 

```sh
sls deploy
```



2. The invocation of the lambdas functions can be done by serverless or with an API Client. 
    - To invoke a lambda function with serverless:

```sh
`sls invoke local -f {function_name} --data '{ "queryStringParameters": { "paramName" : "value" } }'`
``` 

3. Delete the aws stack:

sls remove
```
## Contributing
### Folder and File Names

#### Folder Names

Folder names must comply with kebab case:

* **Alphanumeric**
* **Lowercase**
* **Hyphen ("-") instead of spaces (" ")**

Incorrect examples:

* "API"
* "this is a folder"

Correct examples:

* "api"
* "this-is-a-folder"

#### File Names

File names must comply with the following rules:

* **Alphanumeric**
* **PascalCase if is a class**
* **camelCase if is a function**

Incorrect examples:

* "This Is A File"
* "another file"

Correct examples:

* "ThisIsAFile"
* "anotherFile"

