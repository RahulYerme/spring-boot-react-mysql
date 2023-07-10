def front
def backend

pipeline{
  environment {
    registry = "rahulyerme1234/react-java-app"
    registry1 = "rahulyerme1234/react-java-app-backend"
    registryCredential = 'dockerhub'
  }
  
   
  agent any
  
   tools { 
        maven 'ApacheMaven3.9.3' 
        
    }
	stages{
    
     stage('Build backend'){
       steps{
         script{
           sh '''#! /bin/bash
                       cd /var/lib/jenkins/workspace/React-Java-app-pipeline/spring-boot-server
                       mvn clean install
		       cd /var/lib/jenkins/workspace/React-Java-app-pipeline/spring-boot-server
		       chown -R jenkins:jenkins target
                       '''
         }
       }
         
    }
    stage('Build frontend'){
       steps{
         script{
           sh '''#! /bin/bash
                       cd /var/lib/jenkins/workspace/React-Java-app-pipeline/react-client
                       npm install
                       '''
         }
       }
         
    }
      stage("Junit Publish Test"){
      steps{
        script{
          junit allowEmptyResults: true, skipPublishingChecks: true, testDataPublishers: [[$class: 'AttachmentPublisher']],
               testResults: '**/target/surefire-reports/TEST-*.xml'
        }
      }
    }
    stage('Local artifact archive') {
      steps {
        script{
        archiveArtifacts artifacts: 'spring-boot-server/target/*.jar', followSymlinks: false
        
      }
    }
    }
    stage('Building frontend image') {
     steps{
	dir('/var/lib/jenkins/workspace/React-Java-app-pipeline/react-client'){
      script {    
        front = docker.build registry + ":$BUILD_NUMBER"
    }
  }
 }
    }
   stage('Building backend image') {
     steps{
	dir('/var/lib/jenkins/workspace/React-Java-app-pipeline/spring-boot-server'){
      script {    
        backend = docker.build registry1 + ":$BUILD_NUMBER"
    }
  }
 }
    }
/*stage('synk docker image') {
     steps{
	
      script { 
	sh '''
           snyk auth e6f1ba75-da14-47db-9368-a74bcaded961 
	   snyk container test $front --json-file-output=docker.json 
           snyk-to-html -i docker.json -o dockerscan .html
	   
        '''
        
    }	
 }
 }*/
		
 
stage('push docker image') {
      steps {
		script {
			withDockerRegistry(credentialsId: 'dockerhub') {
			  front.push("${env.BUILD_NUMBER}")
			 front.push("latest")
			}
		  }
        
      }
    }
   stage('push backend docker image') {
      steps {
		script {
			withDockerRegistry(credentialsId: 'dockerhub') {
			  backend.push("${env.BUILD_NUMBER}")
			 backend.push("latest")
			}
		  }
        
      }
    }
 
    
   stage("Nexus Repository Upload" ){
      steps{
        script{
         nexusArtifactUploader artifacts: [[artifactId: 'spring-boot-data-jpa', classifier: '',
					    file: '/var/lib/jenkins/workspace/React-Java-app-pipeline/spring-boot-server/target/spring-boot-data-jpa-1.0.1-SNAPSHOT.jar',
					    type: 'Jar']], 
		                            credentialsId: 'newnexus', 
		                            groupId: 'com.bezkoder', 
		                            nexusUrl: '172.31.229.127:8085', 
		                            nexusVersion: 'nexus3', 
		                            protocol: 'http', 
		                            repository: 'backend', 
		                            version: '1.0.1-SNAPSHOT'
        }
      }
    }
  }
    
}
