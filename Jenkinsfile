pipeline {
    agent any
    stages {
        stage('Build') {
            environment {

                stackOcid = "${sh(returnStdout:true,script: '/var/lib/jenkins/bin/oci resource-manager stack list -c ocid1.compartment.oc1..aaaaaaaadykmnzg32nkpqb7qzhckomnecdq2w3dautxq5liwjhzwxnfd2r3a | jq \'.data[] | select(.\"display-name\" == \""+env.JOB_NAME+"\")\' | jq \'.id\'')}"
                compartment = 'ocid1.compartment.oc1..aaaaaaaadykmnzg32nkpqb7qzhckomnecdq2w3dautxq5liwjhzwxnfd2r3a'
                ad = 'uFjs:EU-FRANKFURT-1-AD-1'
                image = 'ocid1.image.oc1.eu-frankfurt-1.aaaaaaaawc63r6yzrrda24bjqg7vzr6ddtj3slaaaiikqu6g7v6mno3gfjeq'
            }
            steps {
                script {
                    echo "stack: ${env.stackOcid}"
                    sh '''
                        cd terraform
                        zip stack.zip infra.tf variables.tf
                      '''
                    if(env.stackOcid == '' || env.stackOcid == null){
                        echo "Stack does not yet exist"
                        sh '/var/lib/jenkins/bin/oci resource-manager stack create -c '+env.compartment+' --config-source terraform/stack.zip --display-name '+env.JOB_NAME+' --variables \'{\"imageOCID\":\"'+env.image+'\",\"compartment_ocid\":\"'+env.compartment+'\",\"localAD\":\"'+env.ad+'\",\"region\":\"'+env.region+'\"}\' | jq \'.data.id\''
                     }
                    else {
                        echo "Stack already exist, so updating"
                        sh '/var/lib/jenkins/bin/oci resource-manager stack update --force --config-source terraform/stack.zip --display-name '+env.JOB_NAME+' --variables \'{\"imageOCID\":\"'+env.image+'\",\"compartment_ocid\":\"'+env.compartment+'\",\"localAD\":\"'+env.ad+'\",\"region\":\"'+env.region+'\"}\' --stack-id '+env.stackOcid
                    }

                }
            }
        }

        stage("Deploy") {
             environment {

                stackOcid = "${sh(returnStdout:true,script: '/var/lib/jenkins/bin/oci resource-manager stack list -c ocid1.compartment.oc1..aaaaaaaadykmnzg32nkpqb7qzhckomnecdq2w3dautxq5liwjhzwxnfd2r3a | jq \'.data[] | select(.\"display-name\" == \""+env.JOB_NAME+"\")\' | jq \'.id\'')}"
            }
            steps {
                script{
                    echo "Deploying stack ${env.stackOcid}"
                    sh '/var/lib/jenkins/bin/oci resource-manager job create --operation apply --apply-job-plan-resolution \'{\"isAutoApproved\": true}\' --stack-id '+env.stackOcid
                }
            }
        }
    }
}
