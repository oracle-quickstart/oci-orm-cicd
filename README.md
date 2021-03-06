# oci-orm-cicd
## Introduction
This example shows how to use a Jenkinsfile to create and deploy an Oracle Resource Manager stack onto OCI. 

## Usage
In order to use this example, you need to have a Jenkins instance running. 

### Jenkins configuration
This example requires that Jenkins has access to the OCI CLI. This needs to be installed for the user that runs the Jenkins process.
In a default installation, this will be done by the _Jenkins_ user. 

1. `sudo vi /etc/passwd`

2. Change the entry for the Jenkins user from 
`/bin/false` to `/bin/bash`. 

3. `sudo su jenkins`
4. Install and configure the OCI CLI acoording to following documentation: https://docs.cloud.oracle.com/en-us/iaas/Content/API/SDKDocs/cliinstall.htm

:white_check_mark: Once this is done, we should be able to invoke the OCI CLI from within Jenkins. 

5. Repeat steps 1 & 2, but reset the shell for user `jenkins`back to `/bin/false` . This prevents direct shell login using the Jenkins account.  

## Architecture

![Architecture](./images/cicdStack.jpg)

The ORM stack that Jenkins will create is based upon the Terraform script in the **terraform** folder. 
It will create following resources: 

* Virtual Cloud Network (10.1.0.0/16)
* Public Subnet (10.1.20.0/24)
* Internet Gateway
* Route table to attach the Internet Gateway to the public subnet
* Compute instance 
* SSH public/private key pair that can be found in the terraform state file once the resource stack job is finished

